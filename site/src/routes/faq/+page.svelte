<script lang='ts'>
	import { callMetaStellar } from '$lib/callMetaStellar';
	
    //import {Card, NftPoster, Jumbotron} from '@metastellar/ui-library';
    import {Button} from 'flowbite-svelte';
    import {dataPacket} from '$lib/wallet-store';
    
    
    

    async function importWallet(){
        await callMetaStellar('importAccount', {});
    }
    async function exportKeys(){
        await callMetaStellar('exportAccount', {})
    }
</script>


<h1 class="title">Frequently Asked Questions</h1>
<div style="margin-left:2em;">
    <br/>
    <p class="question">Where can I view my Wallet?</p>
    <p class="anwser">go to <a href="/wallet">metastellar.io/wallet</a></p>
    <br/>
    <hr/>
    <br/>
    <p class="question">How can I import a stellar wallet?</p>
    <p class="anwser">have your private key ready and click the button below</p>
    <Button color="light" on:click={importWallet}>import wallet</Button>
    <br/>
    <br/>
    <hr/>
    <br/>
    <p class="question">How can I export my private key from my wallet?</p>
    <p class="anwser">click the button below</p>
    <Button color="light" on:click={exportKeys}>export keys</Button>
    <br/>
    <br/>
    <hr/>
    <br/>
    <p class="question">Where are my keys stored</p>
    <p class="anwser">your keys are stored in the same place as your metamask ethereum keys in encrypted storeage</p>
</div>

<style>
    .title{
        font-size: 2em;
    }
    .question{
        font-size: 1.5em;
    }
    .anwser{
        font-size: 1em;
        font-style: bold;
    }
</style>