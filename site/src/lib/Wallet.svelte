<script>
    import {address} from '../store'
    import {Card, Button} from 'flowbite-svelte'
    import {snapId} from '../constants'
    
    async function fund(){
        const fundResult = await window.ethereum.request({
            method: 'wallet_invokeSnap',
            params: {
            snapId: snapId,
            request: {
                method: 'fund',
            },
            },
        });
    }
</script>

<div class="w-fit flex-col justify-start p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <h2>Metamask Account</h2>
    {$address}
    <br>
    <Button on:click={fund}>Fund Wallet</Button>
</div>
<br/>