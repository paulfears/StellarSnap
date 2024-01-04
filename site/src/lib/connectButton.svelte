<script lang="ts">
    import {snapId} from '../constants'
    import {Button} from 'flowbite-svelte'
    import {connected, address} from '../store'
    import {Modal} from 'flowbite-svelte'
    export let callback = async ()=>{}
    let flaskNotDetected:boolean;
    async function isFlask(){
        if(!window.ethereum){
            return false;
        }
        return (await window.ethereum.request({ method: 'web3_clientVersion' }))?.includes('flask');
    }
    async function connectSnap(){
        flaskNotDetected = !(await isFlask())
        if(flaskNotDetected){
            return null
        }
        try {
            const result = await window.ethereum.request({
                method: 'wallet_requestSnaps',
                params: {
                [snapId]: {},
                },
            });

            console.log(result);

        } catch (error) {
            console.log(error);
            throw error;
        }
        await callback()
        connected.set(true);

        
        const metamask_address = await window.ethereum.request({
            method: 'wallet_invokeSnap',
            params: {
            snapId: snapId,
            request: {
                method: 'getAddress',
            },
            },
        });
        address.set(metamask_address);
        
    }
</script>

<Button on:click={connectSnap}>Connect</Button>
<Modal title="Flask Not Detected" bind:open={flaskNotDetected} autoclose>
    <p style="font-size:x-large;">This Demo Requires Metamask Flask</p>
    <hr/>
    <p>Though it will be on standard metamask before too long</p>
    <p>Install flask here: <a href="https://metamask.io/flask/">https://metamask.io/flask/</a></p>
</Modal>