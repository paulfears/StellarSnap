<script lang="ts">
    import type { DataPacket } from '$lib/wallet-store.ts';
    import { Tabs, TabItem, Button, Popover, Spinner} from 'flowbite-svelte';
    import { Checkbox, Badge } from 'flowbite-svelte';
    import { callMetaStellar } from '$lib/callMetaStellar';
    import { isTestnet, dataPacket, connected } from '$lib/wallet-store';
    import {Card} from '@metastellar/ui-library';
    import { Chasing } from 'svelte-loading-spinners';
    let data:DataPacket = $dataPacket;
    let length = $dataPacket.currentAddress.length;
    let shortenedAddr = ($dataPacket.currentAddress).substring(0,4)+"..."+($dataPacket.currentAddress).substring(length-4,length)
    $: shortenedAddr = ($dataPacket.currentAddress).substring(0,4)+"..."+($dataPacket.currentAddress).substring(length-4,length)
</script>
<br/>
<div style="display:flex; flex-direction:row-reverse;">
<Checkbox bind:checked={$isTestnet}>testnet</Checkbox>
</div>
<Card>
    {#if ($dataPacket).currentAddress === "null"}
        <Chasing/>
    {:else}
    <div class="flex gap-x-1">
        <p>{$dataPacket.name}  </p>
        {#if $isTestnet}
            <Badge rounded color="green">Testnet</Badge>
        {/if}
        {#if !$isTestnet}
            <Badge rounded color="yellow">Mainnet</Badge>
        {/if}
    </div>
    <p>{$dataPacket.fedName === null? "": $dataPacket.fedName}</p>
    
    <div class="copyContainer">
        
        <p id="addr">{shortenedAddr}</p>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
        <Popover triggeredBy="#addr" placement="bottom-start">
            {$dataPacket.currentAddress}
        </Popover>
    </div>
    <p></p>
    {/if}
</Card>

<style>
    .copyContainer{
        word-break: break-all;
        width:275px;
        display: flex;
        padding:0.5rem;
        border-radius: 25px;
        background-color: #faf8f8;
    }
</style>