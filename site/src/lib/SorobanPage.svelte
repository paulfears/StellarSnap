<script>
    import CodeBucket from "./CodeBucket.svelte";
    import { AceEditor } from "svelte-ace";
    import {Button} from 'flowbite-svelte';
    import {snapId} from '../constants';
    import "brace/mode/javascript";
    import "brace/theme/chrome";
    
    async function executeCode(){
        const total_code = (code+bottom_code);
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
  const server = new SorobanClient.Server('https://soroban-testnet.stellar.org:443');

  console.log("getting account")
  const account = await server.getAccount(sourcePublicKey);
  console.log("account is: ")
  console.log(account);

  console.log(SorobanClient);

  const contract = new SorobanClient.Contract(contractAddress)
  console.log(contract)
  _args = Array.from(_args.map(SorobanClient.nativeToScVal));

  let call_operation = contract.call(methodName, ..._args);
  console.log(call_operation)

  let transaction = new SorobanClient.TransactionBuilder(account, { fee: "150", networkPassphrase: SorobanClient.Networks.TESTNET })
    .addOperation(call_operation) // <- funds and creates destinationA
    .setTimeout(30)
    .build();

  console.log(transaction)

    console.log("about to prepair transaction")
    const preparedTransaction = await server.prepareTransaction(transaction, SorobanClient.Networks.TESTNET);
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
  
    const signedTxn = new SorobanClient.TransactionBuilder.fromXDR(signedXDR, "Test SDF Network ; September 2015")
    const transactionResult = await server.sendTransaction(signedTxn);
    console.log(transactionResult.hash);
    async function getTransactionResult(hash, counter){
      let output = await server.getTransaction(hash);
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
    return SorobanClient.scValToNative(result.returnValue);
   
    
}

`
let bottom_code = `
async function main(){
    const result = await callContract("CBR6NOFQEFCBGH63EUGTQ4356MROIBBP6EEITGPMJ23MIDX5RZNFUJPH", "hello", "world");
    alert(result);
}
main();
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
<Button on:click={executeCode}>
    {#if window.loading}
    <Spinner></Spinner>
    {/if}
    Run
</Button>
</div>
<div class='flex'>
    <div style="width:100%;">
        <p>Code function</p>
        <AceEditor   
        width='100%'
        height='350px'
        lang="javascript"
        theme="chrome"
        bind:value={code}
        />
    </div>
    <div style="width:100%;">
        <p>Main Function</p>
        <AceEditor   
        width='100%'
        height='350px'
        lang="javascript"
        theme="chrome"
        bind:value={bottom_code}
        />
    </div>
</div>
