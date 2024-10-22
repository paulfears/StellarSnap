<script>

import Editor from "$lib/components/MetaStellarEditor/MetaStellarEditor.svelte";
import {Heading, P} from 'flowbite-svelte';

let getAddress = `
    let address = callMetaStellar('getAddress');
    address.then(alert);
    
`


let getDataPacket = `
    callMetaStellar('getDataPacket').then((result)=>alert(JSON.stringify(result)));
`
/*
case 'setCurrentAccount':
    params.address
*/
let showAddress = `callMetaStellar('showAddress');`


let createAccount = `callMetaStellar('createAccount', {name: 'new-account-name'});`


let listAccounts =  `callMetaStellar('listAccounts').then((result)=>alert(JSON.stringify(result)));`

let renameAccount = `callMetaStellar('renameAccount', {address: 'address', name: 'new-name'}).then((result)=>alert(JSON.stringify(result)));`


let importAccount = `callMetaStellar('importAccount');`


let fund = `callMetaStellar('fund').then((result)=>alert(JSON.stringify(result)));`

let getFederationName = `callMetaStellar('getWalletName').then((result)=>alert(JSON.stringify(result)));`


let lookUpFedAccountByAddress = `
callMetaStellar('lookUpFedAccountByAddress', 
    {address: 'GB2O6R5JUJGJNXN6MD3TNBL4XJU2PFCK7YTWZJXYOR6OBEE2E46MIYEM'}
)
.then((result)=>alert(JSON.stringify(result)));`

let lookUpFedAccountByName = `callMetaStellar('lookUpFedAccountByName', {url: 'gloosy*metastellar.io'}).then((result)=>alert(JSON.stringify(result)));`

let getBalance = `callMetaStellar('getBalance', {testnet:true}).then(alert);`

let getAssets = `callMetaStellar('getAssets').then((result)=>alert(JSON.stringify(result)));`




let dispPrivateKey = `callMetaStellar('dispPrivateKey');`

// -------------------------------- Methods That Require a funded Account ------------------------------------------
let getAccountInfo = `callMetaStellar('getAccountInfo', {testnet:true}).then((result)=>alert(JSON.stringify(result)));`

let transfer = `callMetaStellar('transfer', {
    to: 'GB2O6R5JUJGJNXN6MD3TNBL4XJU2PFCK7YTWZJXYOR6OBEE2E46MIYEM', 
    amount: '100', 
    testnet:true
    }
)
.then((result)=>alert(JSON.stringify(result)));`

/*
case 'signTransaction':
    params.transaction

case 'signAndSubmitTransaction':
    params.transaction
*/
let createFederationAccount = `callMetaStellar('createFederationAccount').then((result)=>alert(JSON.stringify(result)));`

let openSendXLM = `callMetaStellar('openSendXLM');`;


</script>

<Heading>GetAddress</Heading>
<h2>callMetaStellar('getAddress')</h2>
<Editor code={getAddress}/>


<Heading>getDataPacket</Heading>
<!--
<div>
    <P>Grabs Useful infomation About the users Stellar Wallet</P>
    <P>Returns:</P>
    <div id="datapacketType">
        <p>this is the type returned from the getDataPacket method</p>
        <code>
            <pre>
                {`
                
                interface DataPacket{
                    name:string,
                    currentAddress:string,
                    mainnetAssets?:`} <a>walletAsset[],</a>
                    {`testnetAssets?: `} <a>walletAsset[],</a>
                    {`accounts: Array< {name:string, address:string}  >
                    mainnetXLMBalance: string,
                    testnetXLMBalance: string,
                    fedName: string | null
                }`}
            </pre>
        </code>
    </div>
</div>
-->
<h2>callMetaStellar('getDataPacket')</h2>
<Editor code={getDataPacket}/>

<Heading>showAddress</Heading>
<h2>callMetaStellar('showAddress')</h2>
<Editor code={showAddress}/>


<Heading>createAccount</Heading>
<h2>{`callMetaStellar('createAccount', {'name':'new-account-name'})`}</h2>
<Editor code={createAccount}/>


<Heading>listAccounts</Heading>
<h2>{`callMetaStellar('listAccounts')`}</h2>
<Editor code={listAccounts}/>

<Heading>renameAccount</Heading>
<h2>{`callMetaStellar('renameAccount', {address:'account-address', name:'new-name'})`}</h2>
<Editor code={renameAccount}/>

<Heading>importAccount</Heading>
<h2>{`callMetaStellar('importAccount')`}</h2>
<Editor code={importAccount}/>


<Heading>fund</Heading>
<h2>{`callMetaStellar('fund')`}</h2>
<Editor code={fund}/>


<Heading>getFederationName</Heading>
<h2>{`callMetaStellar('getFederationName')`}</h2>
<Editor code={getFederationName}>Gets the federation name of the current account returns null if there is none</Editor>

<Heading>lookUpFedAccountByAddress</Heading>
<h2>{`callMetaStellar("lookUpFedAccountByAddress", {"address":'metastellarAddress');`}</h2>
<Editor code={lookUpFedAccountByAddress}/>

<Heading>lookUpFedAccountByName</Heading>
<h2>{`callMetaStellar("lookUpFedAccountByName", {"url":'gloosy*metastellar.io');`}</h2>
<Editor code={lookUpFedAccountByName}/>

<Heading>getBalance</Heading>
<h2>{`callMetaStellar('getBalance', {testnet:true})`}</h2>
<Editor code={getBalance}/>

<Heading>getAssets</Heading>
<h2>{`callMetaStellar('getAssets')`}</h2>
<Editor code={getAssets}/>

<Heading>dispPrivateKey</Heading>
<h2>{`callMetaStellar('dispPrivateKey')`}</h2>
<Editor code={dispPrivateKey}/>


<Heading>getAccountInfo</Heading>
<h2>{`callMetaStellar('getAccountInfo', {testnet:true})`}</h2>
<Editor code={getAccountInfo}/>

<Heading>transfer</Heading>
<h2>{`callMetaStellar('transfer', {to:'GB2O6R5JUJGJNXN6MD3TNBL4XJU2PFCK7YTWZJXYOR6OBEE2E46MIYEM', amount:'100', testnet:true})`}</h2>
<Editor code={transfer}/>

<Heading>createFederationAccount</Heading>
<h2>{`callMetaStellar('createFederationAccount')`}</h2>
<Editor code={createFederationAccount}/>

<Heading>openSendXLM</Heading>
<h2>{`callMetaStellar('openSendXLM')`}</h2>
<Editor code={openSendXLM}/>

<style>

h2{
    padding:10px;
    margin-top: 10px;
    font-size: x-large;
    color:aquamarine;
    background-color: black;
}
</style>