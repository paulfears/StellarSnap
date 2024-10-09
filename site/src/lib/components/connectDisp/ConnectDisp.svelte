<script lang="ts">
	import {Button, P} from 'flowbite-svelte';
	import { Card } from '@metastellar/ui-library';
	import { dataPacket, isTestnet, connected} from '$lib/wallet-store';
    import type {DataPacket} from '$lib/wallet-store';
	import {callMetaStellar} from '$lib/callMetaStellar';
    

    async function connect(){
        if(!$connected){
            $connected = await callMetaStellar('connect', {});
            if(!$connected){
                alert("failed to connect");
                throw Error("failed to connect with metamask stellar snap");
                return false; //whatever I don't trust spec
            }
            $dataPacket = await callMetaStellar('getDataPacket', {testnet:$isTestnet});
        }
    }

</script>

<div style="margin:4rem;" class="uk-container justify-center">
    <Card shadow>
        <P size='4xl'>Connect Metamask</P>
        <div>
            <Button color={'light'}  on:click={connect}>Connect</Button>
        </div>
    </Card>
</div>