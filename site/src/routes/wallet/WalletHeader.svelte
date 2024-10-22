<script lang="ts">
	import copy from 'copy-to-clipboard';
    import { Toast } from '$lib/utils/index';
	//import { getAirDropData, claimClaimableBalance } from './../../lib/services/index.ts';
	import { Card } from '@metastellar/ui-library';
	import { callMetaStellar } from '$lib/callMetaStellar';
    import {dataPacket, isTestnet} from '$lib/wallet-store';
    import {Horizon} from '@stellar/stellar-sdk';
    
    import {P, Button, Indicator, Tooltip} from "flowbite-svelte";
    import {onMount} from 'svelte';
    import createStellarIdenticon from "./stellarIcons";
    
    let iconSRC = `https://id.lobstr.co/${$dataPacket.currentAddress}.png`;
    function getClaimableBalances(){
       /* Horizon.Server()
            .claimant(accountId)
            .call()
            .then(function (balances) {
                console.log(balances);
            })
            .catch(function (err) {
                console.error(err);
            });
        */ //stretch goal
    }
    function showAddress(){

        callMetaStellar('showAddress', {});
    }
    function flipNetwork(){
        if($isTestnet){
            $isTestnet = false;
        }
        else{
            $isTestnet = true;
        }
        
    }
    function getIdenticon(address:string){
        let iconCanvas = createStellarIdenticon(address);
        return iconCanvas.toDataURL();
    }

    function openSendXLM(){
        callMetaStellar('openSendXLM', {testnet:$isTestnet});
    }

    function quickCopy(text:string){
        copy(text);
        Toast({type:'success', desc:"Address copied"});
    }
    onMount(()=>{
        iconSRC = getIdenticon($dataPacket.currentAddress);
        callMetaStellar('fund', {})
    });
    let balance = $isTestnet? ($dataPacket).testnetXLMBalance : ($dataPacket).mainnetXLMBalance;
    $: balance = $isTestnet? ($dataPacket).testnetXLMBalance : ($dataPacket).mainnetXLMBalance;
    $: iconSRC = getIdenticon($dataPacket.currentAddress);
    
</script>
<br/>
<br/>
<Card shadow>
    <div>
        <div style="display:flex; flex-direction:row; justify-content:space-between;">
            <div style="display:flex; flex-gap:3;">
                <div style="padding:10px;">
                    <img style="padding:5px;" on:click={()=>quickCopy($dataPacket.currentAddress)} alt={"addressIcon"} width="35" height="35" src={iconSRC}/>
                </div>
                <Tooltip>icon provided by lobstr.co</Tooltip>
                <div style="display:flex; flex-direction:column;">
                    <P size="2xl" style="margin:0px;">{$dataPacket.name}</P>
                    {#if $dataPacket.fedName} <P size="sm">{$dataPacket.fedName}</P>{/if}
                </div>
            </div>
            <Button on:click={flipNetwork} color="light" class="relative" size="sm" style="height:40px;">
                {$isTestnet?"testnet":"mainnet"}
                <span class="sr-only">Network Indicator</span>
                {#if $isTestnet}
                <Indicator color="green" border size="lg" placement="top-right" class="text-xs font-bold"></Indicator>
                {/if}
                {#if !$isTestnet}
                <Indicator color="orange" border size="lg" placement="top-right" class="text-xs font-bold"></Indicator>
                {/if}
            </Button>
        </div>
        <div style="display:flex">
            <P>{$dataPacket.currentAddress}</P>
            <Button color='light' size={'sm'} on:click={()=>{quickCopy($dataPacket.currentAddress)}}><svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#5f6368"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg></Button>
        </div>
        <Button on:click={showAddress} color="light">recieve</Button>
        <Button on:click={openSendXLM} color="light">send</Button>
        <p>{balance} XLM</p>
    </div>
</Card>