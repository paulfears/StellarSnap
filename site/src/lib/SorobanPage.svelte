<script>
    import CodeBucket from "./CodeBucket.svelte";
    import { AceEditor } from "svelte-ace";
    import {Button} from 'flowbite-svelte';
    import {snapId} from '../constants';
    import {testnet} from '../store'
    import "brace/mode/javascript";
    import "brace/theme/chrome";
    async function executeCode(){
        const total_code = (code+bottom_code);
        await eval(total_code)
    }
    async function executeCodeMainnet(){
        const total_code = (code_mainnet+bottom_code_mainnet);
        await eval(total_code)
    }
    let code = `
async function callContract(address, method, args) {
      const contractAddress = arguments[0];
      const methodName = arguments[1];
      let _args = Array.from(arguments).slice(2)
      console.log("here in callContract");
  const sourcePublicKey = await ethereum.request({
          method: 'wallet_invokeSnap',
          params: {snapId:'${snapId}', request:{
            method: 'getAddress',
          }}
      })
  console.log("get address result");
  console.log(sourcePublicKey);
  console.log("stellar sdk is");
  console.log(StellarSdk);
  const SorobanServer = new StellarSdk.SorobanRpc.Server('https://soroban-testnet.stellar.org:443');
  const HorizonServer = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org/');
  console.log("getting account")
  const account = await HorizonServer.loadAccount(sourcePublicKey);
  console.log("account is: ")
  console.log(account);

  console.log(StellarSdk);

  const contract = new StellarSdk.Contract(contractAddress)
  console.log(contract)
  _args = Array.from(_args.map(StellarSdk.nativeToScVal));

  let call_operation = contract.call(methodName, ..._args);
  console.log(call_operation)

  let transaction = new StellarSdk.TransactionBuilder(account, { fee: "150", networkPassphrase: StellarSdk.Networks.TESTNET })
    .addOperation(call_operation) // <- funds and creates destinationA
    .setTimeout(30)
    .build();

  console.log(transaction)

    console.log("about to prepair transaction")
    const preparedTransaction = await SorobanServer.prepareTransaction(transaction);
    console.log("prepairedTxn: ");
    console.log(preparedTransaction);
    const tx_XDR = preparedTransaction.toXDR();
    console.log("tx_XDR is: ");
    console.log(tx_XDR);
    const signedXDR = await ethereum.request(
      {method: 'wallet_invokeSnap',
          params: {
            snapId:'${snapId}', 
            request:{
              method: 'signTransaction',
              params:{
                transaction: tx_XDR,
                testnet: true
              }
            }
          }
      }
    )
  console.log("signed xdr is: ");
  console.log(signedXDR);
  
    const signedTxn = new StellarSdk.TransactionBuilder.fromXDR(signedXDR, "Test SDF Network ; September 2015")
    const transactionResult = await HorizonServer.submitTransaction(signedTxn);
    console.log(transactionResult);
    async function getTransactionResult(hash, counter){
      let output = await SorobanServer.getTransaction(hash);
      console.log("output is");
      console.log(output);
      if(output.status === 'SUCCESS'){
          console.log(output);
          return output;
      }
      if(output.status === 'FAILURE'){
        return output;
      }
      if(counter < 10){
        return await new Promise(
          (resolve, reject)=>{
            setTimeout(
              async (hash, counter, resolve) => {
                return resolve(
                  await getTransactionResult(hash, counter))}, 300, hash, counter+1, resolve
                )
            }
        );
      }
    }
    const result = await getTransactionResult(transactionResult.hash, 0);
    console.log("final result is");
    console.log(result);
    return StellarSdk.scValToNative(result.returnValue);
   
    
}

`
let bottom_code = `
async function main(){
    const result = await callContract("CCSQUO6HDFIQ2CBRUQLFYQNFILWB4VDJXVUW4YSXEJDNVUYJVKIGPJZW", "hello", "world");
    alert(result);
}
main();
`
let bottom_code_mainnet = `
async function main(){
    const result = await callContract("CA63ZBPOCWBLTB2AUNLXERQSN6DQ2E3NSFE26DTXHBCJ4QYYL3V6MN4P", "hello", "world");
    alert(result);
}
main();
`
let code_mainnet = `
async function callContract(address, method, args) {
      const contractAddress = arguments[0];
      const methodName = arguments[1];
      let _args = Array.from(arguments).slice(2)
      console.log("here in callContract");
  const sourcePublicKey = await ethereum.request({
          method: 'wallet_invokeSnap',
          params: {snapId:'${snapId}', request:{
            method: 'getAddress',
          }}
      })
  console.log("get address result");
  console.log(sourcePublicKey);
  console.log("stellar sdk is");
  console.log(StellarSdk);
  const SorobanServer = new StellarSdk.SorobanRpc.Server('https://autumn-proportionate-breeze.stellar-mainnet.quiknode.pro/92ffe86ef03da649d43803d22581b7c0c9ae0100/');
  const HorizonServer = new StellarSdk.Horizon.Server('https://horizon.stellar.org/');
  console.log("getting account")
  const account = await SorobanServer.getAccount(sourcePublicKey);
  console.log("account is: ")
  console.log(account);

  console.log(StellarSdk);
  console.log(StellarSdk.Networks.PUBLIC)

  const contract = new StellarSdk.Contract(contractAddress)
  console.log(contract)
  _args = Array.from(_args.map(StellarSdk.nativeToScVal));

  let call_operation = contract.call(methodName, ..._args);
  console.log(call_operation)

  let transaction = new StellarSdk.TransactionBuilder(account, { fee: StellarSdk.BASEFEE, networkPassphrase: StellarSdk.Networks.PUBLIC })
    .addOperation(call_operation) // <- funds and creates destinationA
    .setTimeout(30)
    .build()
    .toXDR();

  console.log(transaction.toXDR())

    console.log("about to prepair transaction")
    const preparedTransaction = await SorobanServer.prepareTransaction(transaction);
    console.log("prepairedTxn: ");
    console.log(preparedTransaction);
    const tx_XDR = preparedTransaction.toXDR();
    console.log("tx_XDR is: ");
    console.log(tx_XDR);
    const signedXDR = await ethereum.request(
      {method: 'wallet_invokeSnap',
          params: {
            snapId:'${snapId}', 
            request:{
              method: 'signTransaction',
              params:{
                transaction: tx_XDR,
                testnet: false
              }
            }
          }
      }
    )
  console.log("signed xdr is: ");
  console.log(signedXDR);
  
    const signedTxn = new StellarSdk.TransactionBuilder.fromXDR(signedXDR, "Test SDF Network ; September 2015")
    const transactionResult = await HorizonServer.submitTransaction(signedTxn);
    console.log(transactionResult);
    async function getTransactionResult(hash, counter){
      let output = await SorobanServer.getTransaction(hash);
      console.log("output is");
      console.log(output);
      if(output.status === 'SUCCESS'){
          console.log(output);
          return output;
      }
      if(output.status === 'FAILURE'){
        return output;
      }
      if(counter < 10){
        return await new Promise(
          (resolve, reject)=>{
            setTimeout(
              async (hash, counter, resolve) => {
                return resolve(
                  await getTransactionResult(hash, counter))}, 300, hash, counter+1, resolve
                )
            }
        );
      }
    }
    const result = await getTransactionResult(transactionResult.hash, 0);
    console.log("final result is");
    console.log(result);
    return StellarSdk.scValToNative(result.returnValue);
   
    
}

`
</script>
<b style="text-align:left;">Stellar on Metamask also supports Soroban</b>
<hr/>
<p style="text-align:left;">these functions can only be called on futurenet. Below is code to call the hello world contract from the 
    soroban documentation. Simply press 'run' to see the results. If it isn't working it could be that futurenet
    has been cleared and you would have to redeploy the helloworld contract, and swap out the address.
</p>
<br/>
<div class="flex">
  {#if $testnet}
<Button on:click={executeCode}>
    {#if window.loading}
    <Spinner></Spinner>
    {/if}
    Run
</Button>
{:else}
<Button on:click={executeCodeMainnet}>
  {#if window.loading}
  <Spinner></Spinner>
  {/if}
  Run
</Button>
{/if}
</div>
<div class='flex'>
    <div style="width:100%;">
        <p>Code function</p>
        {#if $testnet}
        <AceEditor   
        width='100%'
        height='350px'
        lang="javascript"
        theme="chrome"
        bind:value={code}
        />
        {:else}
        <AceEditor   
        width='100%'
        height='350px'
        lang="javascript"
        theme="chrome"
        bind:value={code_mainnet}
        />
        {/if}
    </div>
    <div style="width:100%;">
        <p>Main Function</p>
        {#if $testnet}
        <AceEditor   
        width='100%'
        height='350px'
        lang="javascript"
        theme="chrome"
        bind:value={bottom_code}
        />
        {:else}
        <AceEditor   
        width='100%'
        height='350px'
        lang="javascript"
        theme="chrome"
        bind:value={bottom_code_mainnet}
        />
        {/if}
    </div>
</div>
