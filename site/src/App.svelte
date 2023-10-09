

<script lang="ts">
  import ConnectButton from './lib/connectButton.svelte';
  import FunctionButton from './lib/functionButton.svelte';
  import FunctionContainer from './lib/functionContainer.svelte';
  import {ButtonGroup} from 'flowbite-svelte';
  import {connected, network, address} from './store';
  import {snapId} from './constants';
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, TabItem, Tabs, Toggle} from 'flowbite-svelte';
  import CodeBucket from './lib/CodeBucket.svelte';
  import SorobanPage from './lib/SorobanPage.svelte';
  import { Chasing } from 'svelte-loading-spinners';
  import {fade} from 'svelte/transition'
  import OperationForm from './TransactionBuilder/operationForm.svelte';
  import TransactionMaker from './TransactionBuilder/transactionMaker.svelte';
  import Wallet from './lib/Wallet.svelte';
  let funding = false;
  let testnet = $network === "testnet"? true: false;

  function genreateCode(method, params){
    return `
    window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: '${snapId}',
        request: {
          method: '${method}',
          params: ${JSON.stringify(params)}
        },
      },
    })
    .then((result)=>alert(JSON.stringify(result)))
      
    `
  }
  async function fundWallet(){
    funding = true;
    try{
      console.log("in here");
        const result = await window.ethereum.request({
            method: 'wallet_invokeSnap',
            params: {
            snapId: snapId,
            request: {
                method: "fund",
            },
            },
        });
        console.log(result)
      }
      catch(e){

      }
    funding = false;
    }

    function switchNetwork(){
      console.log("here")
      console.log($network)
      if($network === 'mainnet'){
        console.log("in side network === 'mainnet'")
        network.set('testnet')
        testnet = true;
      }
      else if($network === 'testnet'){
        console.log("in side network === 'testnet'")
        network.set('mainnet');
        testnet = false;
      }
      console.log("network after swap is:");
      console.log($network);
      
    }
    async function signTxn(txnXDR){
      console.log("here in sign transaction");
      const signTransactionResult = await window.ethereum.request({
            method: 'wallet_invokeSnap',
            params: {
            snapId: snapId,
            request: {
                method: 'signAndSubmitTransaction',
                params:{
                  transaction:txnXDR,
                  testnet:testnet
                }
            },
            },
      });
      console.log(signTransactionResult);
    }
</script>

<style>
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width:auto;
    padding: 10px;
    gap: 10px;
    
  }
  #id{
    width:100%;
    height:100%;
  }

</style>

<Navbar rounded>
  <NavBrand href="/">
    <div style="display:flex; flex-direction:column; justify-content:left;">
    <img style="height:40px;" src="https://assets-global.website-files.com/5deac75ecad2173c2ccccbc7/5dec8960504967fd31147f62_Stellar_lockup_black_RGB.svg" alt="" class="stellar-logo">
    <h2 style="font-size:x-large;">on Metamask</h2>
    </div>
  </NavBrand>
  <NavHamburger/>
  <NavUl>
    <NavLi><ConnectButton callback={fundWallet}/></NavLi>
  </NavUl>
</Navbar>

  {#if funding}
  <div class="flex">
    <Chasing color="#6366f1"></Chasing>
    <p style="color:white background-color:black;">Funding Your testnet and Futurenet Accounts. Please Wait.</p>
  </div>
  {/if}
  <br>
  <br>
  {#if $connected}
  <div transition:fade={{ delay: 0, duration: 300 }}>
    <Wallet/>
  <Toggle checked on:change={switchNetwork}>Testnet</Toggle>
  <br/>
  <Tabs defaultClass="flex">
    <TabItem open>
      <span slot="title">Query Stellar</span>
      <div  class="grid-container">
        <FunctionContainer code={genreateCode("getAddress", {testnet})} params={{"testnet":testnet}} method="getAddress">
          <p slot="title">Get Address of Wallet</p>
        </FunctionContainer>
        <FunctionContainer code={genreateCode("getBalance", {testnet})} params={{"testnet":testnet}} method="getBalance">
          <p slot="title">Get Balance of Wallet</p>
        </FunctionContainer>
        <FunctionContainer code={genreateCode("getAccountInfo", {testnet})} params={{"testnet":testnet}} method="getAccountInfo">
          <p slot="title">Get Account Info</p>
        </FunctionContainer>
        <FunctionContainer code={genreateCode("getAssets", {testnet})} params={{"testnet":testnet}} method="getAssets">
          <p slot="title">Get Account Assets</p>
        </FunctionContainer>
    </div>
      
    </TabItem>
    <TabItem >
      <span slot="title">Signing Functions</span>
      <div class="flex">
      <div class="grow">
      <FunctionContainer 
      code={genreateCode("transfer", {to:"GDPZOWVRHQV2SQ3N47CILKNU4NZQOXYDVXGKKJI32TVWIF7V7364G2QM", "amount":"1", testnet})}
      
      params={{"to":"string:GDPZOWVRHQV2SQ3N47CILKNU4NZQOXYDVXGKKJI32TVWIF7V7364G2QM", "amount":"number:0", testnet}} 
      method="transfer">
        <p slot="title">TRANSFER XLM</p>
      </FunctionContainer>
      </div>
      <div class="grow">
      <FunctionContainer method="signTransaction" 
      code={`
async function signTransaction(){
  const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

  
  const sourcePublicKey = await ethereum.request({
      method: 'wallet_invokeSnap',
      params: {snapId:'${snapId}', request:{
        method: 'getAddress',
      }}
  })
  const account = await server.loadAccount(sourcePublicKey);
  const fee = await server.fetchBaseFee();
  console.log("base fee is");
  console.log(fee);
  const receiverPublicKey = 'GAIRISXKPLOWZBMFRPU5XRGUUX3VMA3ZEWKBM5MSNRU3CHV6P4PYZ74D';
  console.log("metamask public key: ");
  console.log(sourcePublicKey);
  console.log("account is");
  console.log(account);
  console.log("building Transaction");


  const transaction = new StellarSdk.TransactionBuilder(account, { fee, networkPassphrase: "Test SDF Network ; September 2015" });
  // Add a payment operation to the transaction
  console.log("transaction builder initilazed");
  await transaction.addOperation(StellarSdk.Operation.payment({
    destination: receiverPublicKey,
    // The term native asset refers to lumens
    asset: StellarSdk.Asset.native(),
    // Specify 350.1234567 lumens. Lumens are divisible to seven digits past
    // the decimal. They are represented in JS Stellar SDK in string format
    // to avoid errors from the use of the JavaScript Number data structure.
    amount: '350.1234567',
  }));
  console.log("operations added")
  // Make this transaction valid for the next 30 seconds only
  await transaction.setTimeout(30);
  console.log("timeout set");
  // Uncomment to add a memo (https://www.stellar.org/developers/learn/concepts/transactions.html)
  // .addMemo(StellarSdk.Memo.text('Hello world!'))
  const endTransaction = await transaction.build();
  const xdrTransaction = endTransaction.toXDR();
  console.log(xdrTransaction);
  const response = await ethereum.request({
    method: 'wallet_invokeSnap',
    params:{snapId:'${snapId}', request:{
      method: 'signTransaction',
      params:{
        transaction: xdrTransaction,
        testnet: ${testnet}
      }
    }}
  });
  return response
}
(async () => alert(await signTransaction()))();
`}
        codeView={true}
        lockView={true}
      params={{testnet}}>
        <p slot="title">Sign Transaction</p>
        <br/>
      </FunctionContainer>
      </div>
      </div>
    </TabItem>
    <TabItem >
      <span slot="title">Soroban</span>
      <SorobanPage/>
    </TabItem>
    <TabItem >
      <span slot="title">Project Info</span>
      This project Utilizes Metamask snaps, This is code that runs inside of metamask secure execution enviroment, but is seemless from a user experence.
    </TabItem>
    <TabItem>
      <span slot="title">Transaction Maker</span>
      <OperationForm/>
      <TransactionMaker callback={signTxn} address={$address} network={$network}/>
    </TabItem>
  </Tabs>
</div>
  {:else}
  
<section transition:fade={{ delay: 0, duration: 300 }} class="bg-no-repeat bg-[url('https://chaindebrief.com/wp-content/uploads/2021/08/Metamask-logo.png')] bg-blend-multiply">
  <div class="py-8 px-10 mx-auto max-w-screen-xl text-left lg:py-16">
      <h1 class="mb-4 px-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Unlock The Power of Stellar with Metamask</h1>
      <p style="text-align:left; padding-right:40%;" class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-10 lg:px-10 dark:text-gray-400">
        Unlock Stellar to 30 Million Metamask Users
      </p>
      <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <ConnectButton/>
          <a href="https://www.youtube.com/watch?v=-VenhahQ5zo" target="_blank" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Learn more
          </a>  
      </div>
  </div>
</section>


  {/if}



