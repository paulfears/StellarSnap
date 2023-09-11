<script lang="ts">
    import {snapId} from '../constants'
    import {Button} from 'flowbite-svelte'
    export let method:string;
    export let params = {};

    async function callSnap(){
        const result = await window.ethereum.request({
            method: 'wallet_invokeSnap',
            params: {
            snapId: snapId,
            request: {
                method: method,
                params:params
            },
            },
        });
    }
</script>
<Button on:click={callSnap}><slot/></Button>