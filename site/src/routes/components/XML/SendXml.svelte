<script lang="ts">
	import { isTestnet } from '$lib/wallet-store';

	import { updateWalletData } from '$lib/utils';

  import { Label, Button  } from 'flowbite-svelte';
  import * as StellarSdk from '@stellar/stellar-sdk';
  import {Chasing} from 'svelte-loading-spinners'

  import {Card} from '@metastellar/ui-library';
  import { callMetaStellar } from '$lib/callMetaStellar';


  let processing:boolean = false;

  let sendToAddress:string = "";
  let sendAmount = "0.1";
  let isSubmitEnabled:boolean = false;
  async function sendXML(){
    processing = true;
    console.log(sendToAddress)
    console.log(sendAmount);
    await callMetaStellar('transfer', {testnet:$isTestnet, to:sendToAddress, amount:sendAmount.toString()})
    processing = false;
  }

   
</script>
<Card class="py-7 px-5 "  shadow>
  <h3 class="mb-4 font-bold text-2xl">Send XLM</h3>
  <div class="p-5 bg-gray-50 flex flex-col gap-5">
      <div>
        <input type="text" class="w-full p-3 h-[48px] border border-slate-200 rounded-lg" placeholder="Destination" bind:value={sendToAddress}>
      </div>
      <div>
          <input type="number" class="w-full p-3 h-[48px] border border-slate-200 rounded-lg" bind:value={sendAmount} placeholder="Amount">
      </div>
    <div >
        <Button class="py-3 text-center w-full bg-blue-700 rounded-lg capitalize text-white hover:bg-blue-800" on:click={sendXML} disabled={processing}>
            Send
        </Button>
    </div>
  </div>
</Card>