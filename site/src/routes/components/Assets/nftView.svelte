
<script lang="ts">
	
  import {onMount } from 'svelte';
  import {TransactionBuilder, Operation, BASE_FEE, Horizon, Asset, Claimant} from 'stellar-sdk';
  import * as StellarSdk from '@stellar/stellar-sdk';
  import {Chasing} from 'svelte-loading-spinners';
  import { Tabs, TabItem } from 'flowbite-svelte'
  import {Card, NftPoster} from '@metastellar/ui-library';
  import {dataPacket, isTestnet} from '$lib/wallet-store';
  import {callMetaStellar} from '$lib/callMetaStellar';
  import type {DataPacket} from '$lib/wallet-store';
  import {stellar_rpc_endpoint, passpharase} from '$lib/constants'
  import { Alert, assetType, Toast as toast } from '$lib/utils';
  import { Button } from 'flowbite-svelte';
  import { signTxn } from '$lib/services';
  import { getNFTList } from '$lib/services/nft';
  import {funding, uploadNFTFile, resigterNFT, generateNFTOnStellar} from '$lib/services/nft'
  import {stellar_explorer_url} from '$lib/constants'

  let view:string = 'list';
  let assets:any;
  let selectedNFTCode:string = '';
  let selectedNFTIssuer:string = '';
  let destinationAddr:string = '';
  let isProcessing:boolean=false;

  let files: any | null;
  let itemCode:string = "";
  let itemName:string = "";
  let nftIssuer: string = "";
  let itemDesc:string = "";
  let isMinting:boolean;

  let issuerKeypair:StellarSdk.Keypair;


  const goToDetail = (data:any) => {
    view = 'detail'
    selectedNFTCode = data.assetInfo.asset_code
    selectedNFTIssuer = data.assetInfo.asset_issuer;
  }

  const claimeTransaction = async() => {
    isProcessing = true;
    const server = new Horizon.Server(stellar_rpc_endpoint);
    const account = await server.loadAccount($dataPacket.currentAddress);
    const txnBuilder = new TransactionBuilder(account, {fee:BASE_FEE, networkPassphrase: passpharase});

    const assets = new Asset(selectedNFTCode, selectedNFTIssuer);
    
    const claimants = [
      new Claimant(
        destinationAddr,
      )
    ];
    
    const operationParam = {
      amount: "0.0000001",
      asset:assets,
      claimants:claimants
    }    

    try {
      txnBuilder.addOperation(Operation.createClaimableBalance(operationParam));
      txnBuilder.setTimeout(3600);
      const txn = txnBuilder.build().toXDR();
      const signRes = await signTxn(txn);

      if (signRes.status == 400) {
        const resultCode = signRes.extras.result_codes;
        if (resultCode.operations) {
          for (let err of resultCode.operations){
            toast({type:'error', desc: err});
          }
        }
        return;
      }
      
      await refreshData();
      getData();

    } catch (e:any) {
      toast({type:'error', desc: e.message});
      console.log('error', e);
    }
    finally {
      isProcessing = false;
      destinationAddr = "";
    }
  }
  
 const refreshData = async () => {
    $dataPacket = await callMetaStellar('getDataPacket', {testnet: $isTestnet})
  }
  const sendTransaction = async () => {
    isProcessing=true;
    const server = new Horizon.Server(stellar_rpc_endpoint);
    const account = await server.loadAccount($dataPacket.currentAddress);
    const txnBuilder = new TransactionBuilder(account, {fee:BASE_FEE, networkPassphrase: passpharase});
    
    const assets = new Asset(selectedNFTCode, selectedNFTIssuer);
    const operationParam = {
      amount:"0.0000001",
      destination: destinationAddr,
      asset:assets
    }
    try {
      txnBuilder.addOperation(Operation.payment(operationParam));
      txnBuilder.setTimeout(3600);
      const txn = txnBuilder.build().toXDR();
      const signRes = await signTxn(txn);
      if (signRes.status == 400) {
        const resultCode = signRes.extras.result_codes;
        if (resultCode.operations) {
          for (let err of resultCode.operations){
            toast({type:'error', desc: err});
            if (err = 'op_no_trust'){
              Alert({
                type:'error', 
                desc:'Destination does not have this asset, do you want to create a claimable balance instead (this requires 1 XLM locked until is claimed)?',
                successText:'success',
                errText:'error',
                callback:claimeTransaction
              })
            } else {
              await refreshData();
              getData();
              destinationAddr = "";
            }
          }
        }
        return;
      }
      toast({type:'success', desc:'success claim.'});

    } catch (e:any) {
      toast({type:'error', desc: e.message});
      console.log('error', e);
    } finally {
      isProcessing = false;
    }
  }

  async function mintNFT() {
    isMinting=true;
    
    issuerKeypair = StellarSdk.Keypair.random();
    handleNFTIssuerChange(issuerKeypair.publicKey().toString());

    try {
      let result = await funding(issuerKeypair.publicKey());
      if(!result.ok) {
        console.log("funding error", result.error);
        return;
      }
      const uploadRes = await uploadNFTFile({files, itemName});
      if(!uploadRes.ok) {
        console.log("upload failed", uploadRes.error);
        toast({type:'error', desc:`minting error: ${uploadRes.error}`});
        return;
      }
      result = await resigterNFT({code:itemCode, issuer:issuerKeypair.publicKey(), name:itemName, desc:itemDesc, imageURL:uploadRes.data});
      if(!result.ok) {
        console.log("register nft failed", result.error);
        toast({type:'error', desc:`register nft failed: ${result.error}`});
        return;
      }
      const nftResult = await generateNFTOnStellar({code:itemCode, issuerKeypair:issuerKeypair});
      if(nftResult.ok) {
        console.log("transaction hash", stellar_explorer_url + nftResult.data);
        toast({type:'info', desc:`transaction hash: ${stellar_explorer_url+nftResult.data}`});
        
        await refreshData();
        getData();
      } else {
        console.log("transaction failed", nftResult.error);
        toast({type:'error', desc:`transaction failed: ${nftResult.error}`});
      }
    } catch (e:any) {
      console.log('error', e);  
      toast({type:'error', desc:`transaction failed: ${e}`});
    }
    finally {
      isMinting = false;
      itemCode = "" 
      itemCode = ''
      itemName = ''
      itemDesc = '';
      files = null;
      isSubmitEnabled = false;
    }
      
  }
  $: if (files) {
		console.log(files);
	}

  function handleNFTIssuerChange(issuerKeyStr: string) {
    nftIssuer = issuerKeyStr;
  }

  let isSubmitEnabled:boolean = false;
  const validateForm = () => {
    console.log('files validation', files);
    isSubmitEnabled = itemCode.trim() != "" && itemCode.trim().length < 12 && itemName.trim() != "" && itemDesc.trim() != "" && files != null;
    console.log('isSubmitEnabled', isSubmitEnabled);
  }

  const sendValidation = () => {
    isSubmitEnabled = destinationAddr.trim() != '';
  }
  const getData = async() =>{
    assets = await getNFTList();
  }
  onMount(async ()=>{
    getData();
  })

</script>
<Card class="py-7 px-5 " shadow>
  <h3 class="mb-4 font-bold text-2xl"> NFT  </h3>
  <Tabs>
    <TabItem open title="List">
      {#if view == 'list'}
      <div>
        <div class={`${assets?.length > 0 && ('grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-2 ')}`}>
          {#if assets?.length > 0}
            {#each assets  as asset}
              {#if assetType(asset) == 'nft'}  
              <div class="my-2 ">
                <NftPoster
                  baseURL={stellar_rpc_endpoint}
                  hoverTransform
                  assetAccount={{code:asset.asset_code, issuer:asset.asset_issuer}}

                  imgClass="h-[200px]"
                  getNFTAssetInfo={goToDetail}
                />
                </div>
              {/if}
            {/each}
          {:else}
            <p class="py-2 text-center w-full">
              No NFTs yet
            </p>
          {/if}
        </div>
      </div>
      {:else}
        <div class="">
          <div>
        <div class="flex justify-between">
          <h3 class="mb-4 text-center font-bold text-2xl"> NFT Send </h3>
          <div>
          </div>
        </div>
        <div class="flex flex-col gap-3">
        <div>
          <input type="text" bind:value={destinationAddr} on:input={sendValidation} placeholder='Destination' class="w-full p-2 h-[48px] border border-slate-200 rounded-lg"/>
        </div>
        <div>
        {#if isSubmitEnabled}
          <Button type="button" on:click={sendTransaction} size="sm" color="blue" disabled={isProcessing}>
            {#if isProcessing}
              <span class="mr-3"><Chasing size="15" color="white" unit="px" /></span>
            {/if}Send</Button>
        {:else}
          <Button type="button" color="blue" disabled>Send</Button>
        {/if}
        <Button on:click={()=>{
            view='list'
          }} color="none">
          back</Button>
        </div>
        </div>
      </div>
        </div>
      {/if}
    </TabItem>
    <!--
    <TabItem  title="Mint">
      <div class="flex flex-col gap-4">
        <div>
          <input type="text" bind:value={itemCode} on:input={validateForm} placeholder='NFT Code' class="w-full p-2 h-[48px] border border-slate-200 rounded-lg">
        </div>
        <div>
          <input type="text" bind:value={nftIssuer} on:input={validateForm}  placeholder='NFT Issuer' disabled class="w-full p-2 h-[48px] border border-slate-200 rounded-lg"/>
        </div>
        <div>
          <input type="text" bind:value={itemName} on:input={validateForm}  placeholder='NFT Name' class="w-full p-2 h-[48px] border border-slate-200 rounded-lg"/>
        </div>
        <div>
          <textarea bind:value={itemDesc} placeholder='NFT Description' class="w-full p-2 border border-slate-200 rounded-lg"/>
        </div>
        <div>
          <label for="avatar">picture:</label>
          <input accept="image/png, image/jpeg" bind:files id="avatar" name="avatar" type="file" on:change={validateForm}/>
        </div>
        {#if isSubmitEnabled}
          <Button on:click={()=>{mintNFT()}} disabled={isMinting}  color="blue" class="py-3">
            {#if isMinting}
            <span class="mr-3"><Chasing size="15" color="white" unit="px" /></span>
            {/if}
            Mint
          </Button>
        {:else}
          <Button disabled  color="blue" class="py-3">Mint</Button>
        {/if}
      </div>
    </TabItem>
    -->
  </Tabs>
  
</Card>