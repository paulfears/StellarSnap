<script lang="ts">
	
	import ConnectDisp from '$lib/components/connectDisp/ConnectDisp.svelte';
    import {Card} from '@metastellar/ui-library';
    import {Chasing} from 'svelte-loading-spinners'
    import copy from "copy-to-clipboard";
    
    import {connected, dataPacket, isTestnet} from '$lib/wallet-store';
    import type {DataPacket} from '$lib/wallet-store';
    import {onMount} from 'svelte';
    import {FileCopyAltOutline} from 'flowbite-svelte-icons';
    
    import { env } from "$lib/env";
	import {Toast as toast} from "$lib/utils"
    import NftView from '../components/Assets/nftView.svelte';
    import SendXML from '../components/XML/SendXml.svelte';
    import Token from '../components/Assets/token.svelte';
    import AirDrop from '../components/Assets/airDrop.svelte';
    import {formatWalletAddValue, formatWalletAddress} from '$lib/utils/string'
    import { callMetaStellar } from '$lib/callMetaStellar';
    import WalletHeader from './WalletHeader.svelte';

    export let currentView = "sendXLM";

//   let xlmBalance:number = 0;
    // async function getWalletBallance() {
    //     let wallet = MetaStellarWallet.loadFromState($walletData);
    //     let balance = await wallet.getBalance();
    //     console.log("balance", balance);
    //     let data = wallet.exportState();
    //     walletData.set(data);
    //     xlmBalance = balance;
    //     return balance;
    // }
    
    const setView = (view:string) => {
        currentView = view;
        console.log('view ', currentView);
    }
    
    const onCopy = (text:string) => {
        // if (!$connected) {alert('plz connect to wallet'); return}
        copy(text);
        toast({type:'info', desc:'Copied!'});
    }

    //Fund the testnet Account if not Funded
    onMount(()=>{
        if($dataPacket.testnetXLMBalance === "0"){
            
            callMetaStellar('fund', {testnet:true}).then(
                ()=>{
                    callMetaStellar('getDataPacket', {}).then((dp:DataPacket)=>{$dataPacket = dp});
                }
            );
        }
    });
</script>
{#if $connected}
<div>
    <div id="midContainer"  class="uk-container">
        <WalletHeader/>
        <div class="grid md:grid-cols-4 sm:grid-cols-2 mt-2 gap-3">
            
            <button on:click={()=>{setView('sendXLM')}} >
                <Card class="py-4 lg:px-12 min-h-[80px] justify-center" shadow>
                    <span>Send XLM</span>
                </Card>
            </button>
            
            <button on:click={()=>{setView('viewNFT')}}>
                <Card class="py-4 lg:px-12 min-h-[80px] justify-center" shadow >
                    NFT
                </Card>
              </button>
            <!--
            <button on:click={()=>{setView('token')}}>
                <Card class="py-4 lg:px-12  min-h-[80px] justify-center"  shadow>
                    Token
                </Card>
            </button>
            <button on:click={()=>{setView('airDrop')}}>
                <Card class="py-4 lg:px-12  min-h-[80px] justify-center" shadow >
                    AirDrop
                </Card>
            </button>
            -->
        </div>
        
        <div class="mt-2">
            {#if currentView == 'sendXLM'}
                <SendXML/>
            {:else if currentView == 'viewNFT'}
                <NftView/>
            {:else if currentView == 'token'}
                <!--<Token/>-->
            {:else if currentView == 'airDrop'}
                <!--<AirDrop />-->
            {/if}
        </div>
        
    </div>
</div>
{/if}

{#if !$connected}
    <ConnectDisp/>
{/if}

<style>
    button.active {
		/* box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
		transform: translatey(-5px) scale(1.01); */
        color:#1d4ed8;
    }
</style>