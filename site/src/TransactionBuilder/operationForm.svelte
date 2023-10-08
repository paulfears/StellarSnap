<script lang='ts'>
    import { writable } from 'svelte/store';
    import { Asset } from 'stellar-sdk';
    import {OperationParams} from './operations';
    import AssetSelect from './AssetSelect.svelte';
    import {Input, Label} from "flowbite-svelte"
    
  
    export let operationType:string = '';
    export let network:'mainnet' | 'testnet' = 'mainnet';
    console.log("operation type: ");
    console.log(operationType)
    export let operation:{type:string, params:{[key: string]:any}} = {type:operationType, params:{}};

    let operationParams = OperationParams[operationType];
    
    const possibleValues = [
        'number', //done
        'number:offerId',
        'optional:offerId',
        'string', //done
        'string:address',
        'optional:string:address', 
        'string:accountId',
        'string:balanceId',
        'asset', //done
        'array:asset',
        'enum:0|1|2', //done
        'price',
        'string:liquidityPoolId',
        'string:assetCode',
        'claimant',
        'array:claimant',
        'signer',
        'trustLineFlags',
        ]
  </script>
    
    <div class="container" style="text-align:left;">
    {#each Object.entries(operationParams.params) as [field, value] (field)}
      
        <Label for="first_name" class="mb-2">{field}{#if value.startsWith('optional:')} *optional{/if}</Label>
        {#if value.startsWith('optional:')}
            {#if value.startsWith('optional:string')}
                <Input type="text" placeholder={field} bind:value={operation.params[field]}/>
            {/if}
            {#if value.startsWith('optional:offerId')}
                <Input type="number" placeholder={field} bind:value={operation.params[field]}/>
            {/if}
        {/if}
        {#if value.startsWith('string:')} 
            <Input type="text" bind:value={operation.params[field]} placeholder={field} />
        {:else if value === 'string'}
            <Input type="text" bind:value={operation.params[field]} placeholder={field} />
        {:else if value === 'number'}
            <Input type="number" bind:value={operation.params[field]} placeholder={field}/>
        {:else if value === 'asset'}
            <AssetSelect network={network} bind:selectedAsset={operation.params[field]}/>
        {:else if value === 'enum:0|1|2'}
            <select bind:value={operation.params[field]}>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
            </select>
        {:else if value === 'price'}
            <Input type="number" bind:value={operation.params[field]} placeholder={field}/>
        {/if}
        <br/>
    {/each}
</div>
