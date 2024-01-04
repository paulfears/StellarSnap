
<script lang="ts">
    import { Card, Hr } from "flowbite-svelte";
    import {Button} from 'flowbite-svelte';
    import { Select, Label } from 'flowbite-svelte';
    import {OperationParams} from './operations';
    import OperationForm from './operationForm.svelte';
    import {TransactionBuilder, Operation, BASE_FEE, Horizon, Networks, Asset} from 'stellar-sdk';
  import AssetSelect from "./AssetSelect.svelte";
    export let network: "mainnet" | "testnet" = "mainnet";
    export let address:string;
    export let callback:Function;
    let options:Array<{name:string, value:string}> = []
    let renderFlipper = false;
    for(let op of Object.keys(OperationParams)){
        options.push({value:op, name:op})
    }
    export let operations:Array<{type:string, params:any}> = [{type:'', params:{}}];
    function addOperation(){
        operations = [...operations, {type:"", params:{}}]
    }
    function deleteFactory(index){
        return function(){
            operations = [...operations.slice(0,index), ...operations.slice(index+1)]
            renderFlipper = !renderFlipper;
        }
    }
    function addFactory(index){
        return function(){
            operations = [...operations.slice(0, index+1), {type:"", params:{}},...operations.slice(index+1)]
        }
    }
    async function createTransaction(){
        console.log(operations)
        const passpharase = network === 'testnet'?Networks.TESTNET : 'Public Global Stellar Network ; September 2015'
        
        const server = new Horizon.Server(network === 'testnet'?'https://horizon-testnet.stellar.org':'https://horizon.stellar.org');
        const account = await server.loadAccount(address);
        const txnBuilder = new TransactionBuilder(account, {fee:BASE_FEE, networkPassphrase: passpharase});
        for(let operation of operations){
            console.log(operation);
            console.log(operation.type);
            console.log(operation.params);
            txnBuilder.addOperation(Operation[operation.type](operation.params))
        }
        console.log(txnBuilder);
        txnBuilder.setTimeout(3600);
        const txn = txnBuilder.build().toXDR()
        console.log(txn);
        callback(txn);
        /*
        const transaction = new TransactionBuilder(
        questAccount, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET
        })
        .addOperation(Operation.changeTrust({
            asset: usdcAsset
        }))
        */
    }
</script>

<div>
    <Card>
    <h2>Transaction</h2>
    {#key network}
    {#each operations as operation, i}
        <Card>
            <div class="flex">
            <Select bind:value={operations[i]["type"]} placeholder="Operation Type" items={options}></Select>
            </div>
            <Hr/>
            {#key operations[i].type}
                <OperationForm network={network} bind:operation={operations[i]} operationType={operations[i].type}/>
            {/key}
            <div style="display:flex; justify-content:left; gap:10px;">
                <Button size="xs" on:click={addFactory(i)}>Add</Button>
                {#if i !== 0}
                    <Button size="xs" on:click={deleteFactory(i)}>remove</Button>
                {/if}
            </div>
        </Card>
    {/each}
    {/key}
    <Button on:click={createTransaction}>Sign and Submit Transaction</Button>
    </Card>
</div>