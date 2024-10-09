
<script lang="ts">
	
    import { Card, Hr } from "flowbite-svelte";
    import {Button, P} from 'flowbite-svelte';
    import { Select, Label } from 'flowbite-svelte';
    import {OperationParams} from './operations';
    import OperationForm from './operationForm.svelte';
    
    import {TransactionBuilder, Operation, BASE_FEE, Horizon, Networks, Asset} from 'stellar-sdk';
    
    //Props
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
    function deleteFactory(index:number){
        return function(){
            operations = [...operations.slice(0,index), ...operations.slice(index+1)]
            renderFlipper = !renderFlipper;
        }
    }
    function addFactory(index:number){
        return function(){
            operations = [...operations.slice(0, index+1), {type:"", params:{}},...operations.slice(index+1)]
        }
    }
    async function createTransaction(){
        try{
            console.log(operations)
            const passpharase = network === 'testnet'?Networks.TESTNET : 'Public Global Stellar Network ; September 2015'
            console.log("address is");
            console.log(address);
            const server = new Horizon.Server(network === 'testnet'?'https://horizon-testnet.stellar.org':'https://horizon.stellar.org');
            console.log("server is: ");
            console.log(server);
            const account = await server.loadAccount(address);
            console.log("account is");
            console.log(account);
            const txnBuilder = new TransactionBuilder(account, {fee:BASE_FEE, networkPassphrase: passpharase});
            for(let operation of operations){
                console.log(operation);
                console.log(operation.type);
                console.log(operation.params);
                txnBuilder.addOperation(Operation[operation.type](operation.params))
            }
            
            callback(txnBuilder, operations);
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
        catch(e){
            alert(e);
        }
    }
</script>

<div class="uk-container justify-center">
    <Card>
    <P size="2xl">operations</P>
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
                <Button color={"light"} size="xs" on:click={addFactory(i)}>Insert additional Operation</Button>
                {#if i !== 0}
                    <Button color={"light"} size="xs" on:click={deleteFactory(i)}>remove</Button>
                {/if}
            </div>
        </Card>
    {/each}
    {/key}
    <br/>
    <Button color={"light"} on:click={createTransaction}>Generate</Button>
    </Card>
</div>

<style>
    
</style>