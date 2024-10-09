<script lang="ts">

  import { onMount } from 'svelte';
  import {Chasing} from 'svelte-loading-spinners'

  import { Tabs, TabItem } from 'flowbite-svelte'
  import {Card, TokenPoster} from '@metastellar/ui-library';
  import {TransactionBuilder, Operation, BASE_FEE, Horizon, Asset, Claimant} from 'stellar-sdk';
  

  
  import {dataPacket} from '$lib/wallet-store';
  import {updateWalletData} from '$lib/utils';

  import {stellar_rpc_endpoint, passpharase} from '$lib/constants'
	import {Toast as toast, Alert, assetType} from "$lib/utils"
  import { Button } from 'flowbite-svelte';
  import { getTokenList, signTxn } from '$lib/services/token';
  let isProcessing:boolean = false;
  let assets:any; let view:string = 'list';
  let destinationAddr:string = '';
  let sendAmount:string = '0';

  let tokenIssuer:string = '';
  let tokenCode:string = '';

  let claimBalanceID:string = '';

  let selectedTokenCode:string = '';
  let selectedTokenIssuer:string = '';
  let isSubmitEnabled:boolean = false;

  const gotTodetail = (data:any) => {
    view= 'detail';
    console.log(data);
    selectedTokenCode= data.assetInfo.asset_code;
    selectedTokenIssuer= data.assetInfo.asset_issuer;
  }

  const claimeTransaction = async() => {
    const server = new Horizon.Server(stellar_rpc_endpoint);
    const account = await server.loadAccount($dataPacket.currentAddress);
    const txnBuilder = new TransactionBuilder(account, {fee:BASE_FEE, networkPassphrase: passpharase});

    const assets = new Asset(selectedTokenCode, selectedTokenIssuer);
    
    const claimants = [
      new Claimant(
        destinationAddr,
      )
    ];
    
    const operationParam = {
      amount: sendAmount.toString(),
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
    } finally {
      isProcessing = false;
    }
  }

  const sendTransaction = async () => {
    isProcessing= true;
    const server = new Horizon.Server(stellar_rpc_endpoint);
    const account = await server.loadAccount($dataPacket.currentAddress);
    const txnBuilder = new TransactionBuilder(account, {fee:BASE_FEE, networkPassphrase: passpharase});
    
    const assets = new Asset(selectedTokenCode, selectedTokenIssuer);
    const operationParam = {
      amount: sendAmount.toString(),
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
            }
          }
        }
        return;
      }
      toast({type:'success', desc:'success claim.'});
      await refreshData();
      getData();
      view = 'list';

    } catch (e:any) {
      toast({type:'error', desc: e.message});
      console.log('error', e);
    } finally{
      isProcessing = false;
    }
  }

  const claimClaimableBalanceTransaction= async() => {
    isProcessing = true;
    const server = new Horizon.Server(stellar_rpc_endpoint);
    const account = await server.loadAccount($dataPacket.currentAddress);
    const txnBuilder = new TransactionBuilder(account, {fee:BASE_FEE, networkPassphrase: passpharase});
    
    const operationParam = {
      balanceId: claimBalanceID
    }    

    try {
      txnBuilder.addOperation(Operation.claimClaimableBalance(operationParam));
      txnBuilder.setTimeout(3600);
      const txn = txnBuilder.build().toXDR();
      const signRes = await signTxn(txn);

      console.log('sign res', signRes);
      if (signRes.status == 400) {
        const resultCode = signRes.extras.result_codes;
        if (resultCode.operations) {
          for (let err of resultCode.operations){
            toast({type:'error', desc: err});
          }
        }
        return;
      }

      toast({type:'success', desc:'success received.'});
      await refreshData();
      getData();
    } catch (e:any) {
      toast({type:'error', desc: e.message});
      console.log('error', e);
    }
    finally{
      isProcessing = false;
    }
  }

  const changeTrustTransaction = async () => {
    isProcessing=true;
    const server = new Horizon.Server(stellar_rpc_endpoint);
    const account = await server.loadAccount($dataPacket.currentAddress);
    const txnBuilder = new TransactionBuilder(account, {fee:BASE_FEE, networkPassphrase: passpharase});
    const assets = new Asset(tokenCode, tokenIssuer);

    txnBuilder.addOperation(Operation.changeTrust({asset:assets}));
    txnBuilder.setTimeout(3600);
    
    const txn = txnBuilder.build().toXDR();

    try {
      await signTxn(txn);
      
      await refreshData();
      getData();
    } catch (e:any) {
      console.log('error', e);
    } finally{
      isProcessing = false;
    }

  }
 const refreshData = async () => {
    await updateWalletData();
  }

  const getData = async () => {
    assets = await getTokenList();
  }


  const sendValidation = () =>{
    isSubmitEnabled = destinationAddr.trim() != "" && sendAmount.toString().trim() != '0';
    console.log('issubmitenabled', isSubmitEnabled);
  }

  const addAssetValidation = () => {
    isSubmitEnabled = tokenCode.trim() != "" && tokenIssuer.toString().trim() != '0';
  }

  onMount(async ()=>{
    getData();
  })
</script>
<Card class="py-7 px-5 " shadow>
  <div class=" flex justify-between">
    <h3 class="mb-4 text-center font-bold text-2xl"> Token </h3>
  </div>
  <Tabs>
    <TabItem open title="List">
    {#if view === 'list'}
      <div class="grid">
        {#if assets?.length>0}
          {#each assets  as asset}
            {#if assetType(asset) == 'token'}  
            <TokenPoster
              baseURL = {stellar_rpc_endpoint}
              assetAccount={{code: asset.asset_code, issuer: asset.asset_issuer}}   
              getTokenAssetInfo={gotTodetail}
              class="my-2"
              shadow
              balance={asset.balance}
            />
            {/if}
          {/each}
        {:else}
          <div class="py-2 text-center">No token yet</div>
        {/if}
      </div>
    {:else if view == 'detail'}
      <div>
        <div class="flex justify-between">
          <h3 class="mb-4 text-center font-bold text-2xl"> Send Token </h3>
          <div>
            <Button on:click={()=>{
              view='list'
            }} color="green">back</Button>
          </div>
        </div>
        
        <div class="flex flex-col gap-3">
        <div>
          <input type="text" bind:value={destinationAddr} on:input={sendValidation} placeholder='Destination' class="w-full p-2 h-[48px] border border-slate-200 rounded-lg"/>
        </div>
        <div>
          <input type="number" bind:value={sendAmount} on:input={sendValidation} placeholder='amount' class="w-full p-2 h-[48px] border border-slate-200 rounded-lg"/>
        </div>
        <div>
        {#if isSubmitEnabled}
          <Button type="button" on:click={sendTransaction} size="sm" color="blue" disabled={isProcessing}>
           {#if isProcessing}
                <span class="mr-3"><Chasing size="15" color="white" unit="px" /></span>
                {/if}send</Button>
        {:else}
          <Button type="button" color="blue"  disabled>
              Send
          </Button>
        {/if}
        </div>
        </div>
      </div>
    {/if}
  </TabItem>
  <TabItem title="Add assets">
    <div class="flex flex-col gap-5">
      <div>
        <input type="text" bind:value={tokenCode} on:input={addAssetValidation}  placeholder='code' class="w-full p-2 h-[48px] border border-slate-200 rounded-lg"/>
      </div>
      <div>
        <input type="text" bind:value={tokenIssuer}  on:input={addAssetValidation} placeholder='issuer' class="w-full p-2 h-[48px] border border-slate-200 rounded-lg"/>
      </div>
      <div>
        {#if isSubmitEnabled}
        <Button on:click={changeTrustTransaction} color="blue" size="sm" disabled={isProcessing}>
           {#if isProcessing}
                <span class="mr-3"><Chasing size="15" color="white" unit="px" /></span>
                {/if}
                Confirm</Button>
        {:else}
          <Button type="button" color="blue"   disabled>
              Confirm
          </Button>
        {/if}
      </div>
    </div>
  </TabItem>
  <!-- <TabItem title="Receive">
     <div class="flex flex-col gap-5">
      <div>
        <input type="text" bind:value={claimBalanceID}  placeholder='Claimable Balance ID' class="w-full p-2 h-[48px] border border-slate-200 rounded-lg"/>
      </div>
      <div>
        <Button on:click={claimClaimableBalanceTransaction} color="blue"  disabled={isProcessing}> {#if isProcessing}
                <span class="mr-3"><Chasing size="15" color="white" unit="px" /></span>
                {/if}Receive</Button>
      </div>
    </div>
  </TabItem> -->
  </Tabs>
</Card>