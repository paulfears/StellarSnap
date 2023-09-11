<script lang="ts">
    import {snapId} from '../constants'
    import {Button} from 'flowbite-svelte'
    import {connected} from '../store'

    async function connectSnap(){
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
        connected.set(true);
    }
</script>

<Button on:click={connectSnap}>Connect</Button>