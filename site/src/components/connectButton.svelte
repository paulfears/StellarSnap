<script lang="ts">
	import { callMetaStellar } from '$lib/callMetaStellar';

    
    import ConnectImg from '$lib/images/Connect.gif';
    import { fade, scale } from 'svelte/transition';
    
    import {Modal} from 'flowbite-svelte'
    import {Button} from 'flowbite-svelte';


    import {connected, dataPacket, isTestnet} from '$lib/wallet-store';
    
    
    

    let isPressed = false;

    function pressButton() {
        isPressed = true;
        setTimeout(() => {
            isPressed = false;
        }, 200);
    }

    let flaskNotDetected:boolean;
    
    
    async function connectSnap(){
        $connected = await callMetaStellar('connect', {});
        $dataPacket = await callMetaStellar('getDataPacket', {testnet:($isTestnet)});
    }


   
    
</script>
{#if !($connected)}
<Button color="light" on:click={connectSnap} src={ConnectImg}>Connect</Button>
<Modal title="Flask Not Detected" bind:open={flaskNotDetected} autoclose>
    <p style="font-size:x-large;">This Demo Requires Metamask Flask</p>
    <hr/>
    <p>Though it will be on standard metamask before too long</p>
    <p>Install flask here: <a href="https://metamask.io/flask/">https://metamask.io/flask/</a></p>
</Modal>
{/if}
<style>
    img{
        cursor: pointer;
        max-width: 150px; 
    }
    img:hover{
        transform: scale(1.1);
    }
    .buttonPressing {
        animation: 0.25s linear 0s  button-press;
    }
    img:active{       
    box-shadow: 0 5px #666;
    transform: translateY(4px);
    }
    @keyframes button-press {
     0% { transform: scale(1); }
     25%{ transform: scale(0.7); }
     90% { transform: scale(1.5); }
     100% { transform: scale(1); }
    }
</style>