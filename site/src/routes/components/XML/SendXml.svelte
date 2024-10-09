<script lang="ts">
	import { updateWalletData } from '$lib/utils';

  import { Label, Button  } from 'flowbite-svelte';
  import * as StellarSdk from '@stellar/stellar-sdk';
  import {Chasing} from 'svelte-loading-spinners'
   
  import {stellar_rpc_endpoint} from '$lib/constants'

  import {Card} from '@metastellar/ui-library';
  import { env } from "$lib/env";
  import {dataPacket} from '$lib/wallet-store';
  import type {DataPacket} from '$lib/wallet-store'; 


  // const stellar_rpc_endpoint = env.VITE_STELLAR_RPC_ENDPOINT;
  const network_passphrase = env.VITE_NETWORK_PASSPHRASE;

  let processing:boolean = false;

  let sendToAddress:string = "";
  let sendAmount:number;
  let isSubmitEnabled:boolean = false;

  async function signTransaction() {
      if (sendToAddress == "") {
          alert('please input address to send');
          return;
      }
      
      if (sendAmount.toString() == "0") {
          alert('please input amount to send');
          return;
      }
      processing = true;
      const server = new StellarSdk.Horizon.Server(stellar_rpc_endpoint);
      const sourcePublicKey = await ethereum.request({
          method: 'wallet_invokeSnap',
          params: {snapId:'npm:stellar-snap', request:{
          method: 'getAddress',
          }}
      });


      const account = await server.loadAccount(sourcePublicKey);
      const fee = String(await server.fetchBaseFee());

      console.log("base fee is");
      console.log(fee);
      const receiverPublicKey = sendToAddress;
      console.log("metamask public key: ");
      console.log(sourcePublicKey);
      console.log("account is");
      console.log(account);
      console.log("building Transaction");
      const transaction = new StellarSdk.TransactionBuilder(account, { fee , networkPassphrase: network_passphrase });

      // Add a payment operation to the transaction
      console.log("transaction builder initilazed");
      try {
          await transaction.addOperation(StellarSdk.Operation.payment({
              destination: receiverPublicKey,
              asset: StellarSdk.Asset.native(),
              amount: sendAmount.toString()
          }));
          console.log("operations added")
      } catch (e:any) {
          alert('error:'+e.message);
          return false;
      }
      
      // Make this transaction valid for the next 30 seconds only
      try {
          await transaction.setTimeout(30);
      } catch (e:any) {
          alert('error:'+e.message);
          return false;
      }
      console.log("timeout set");
      const endTransaction = await transaction.build();
      const xdrTransaction = endTransaction.toXDR();
      console.log(xdrTransaction);
      let response = null;
      try {
          response = await ethereum.request({
              method: 'wallet_invokeSnap',
              params:{snapId:'npm:stellar-snap', request:{
                  method: 'signAndSubmitTransaction',
                  params:{
                  transaction: xdrTransaction,
                  testnet: true
                  }
              }}
          });
        //   getWalletBallance();
        // const ballance = await MetaStellarWallet.loadFromState();
      } catch (e:any) {
          alert('error:'+e.message);
          return false;
      }

      return true;
  }
  async function sendXNL() {
      try {
        await signTransaction();
        await updateWalletData();
        initData();
      } catch(e:any) {
        console.log('send xml error', e);
      } finally {

        processing = false;
      }
  }


  const initData = () => {
    sendToAddress = "";
    sendAmount = 0;
  }

   const validateForm = () => {
    isSubmitEnabled = sendToAddress.trim() != "" && sendAmount.toString().trim() != "" && sendAmount.toString().trim() !== "0"
    console.log('isSubmitEnabled', isSubmitEnabled);
  }

</script>
<Card class="py-7 px-5 "  shadow>
  <h3 class="mb-4 font-bold text-2xl">Send XLM</h3>
  <div class="p-5 bg-gray-50 flex flex-col gap-5">
      <div>
        <input type="text" class="w-full p-3 h-[48px] border border-slate-200 rounded-lg" placeholder="Destination" bind:value={sendToAddress} on:input={validateForm}>
      </div>
      <div>
          <input type="number" class="w-full p-3 h-[48px] border border-slate-200 rounded-lg" bind:value={sendAmount} placeholder="Amount" on:input={validateForm}>
      </div>
    <div >
      {#if isSubmitEnabled}
      <Button class="py-3 text-center w-full bg-blue-700 rounded-lg capitalize text-white hover:bg-blue-800" on:click={sendXNL} disabled={processing}>
        <div class="text-center">
          {#if processing}
          <div class="inline-block">
            <Chasing size="15" color="white" unit="px" />
          </div>
          {/if}
          Send
        </div>
      </Button>
      {:else}
        <Button class="py-3 text-center w-full bg-blue-700 rounded-lg capitalize text-white hover:bg-blue-800" on:click={sendXNL} disabled>
            Send
        </Button>
      {/if}
    </div>
  </div>
</Card>