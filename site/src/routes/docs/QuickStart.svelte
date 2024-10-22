<script>
	import { dataPacket, isTestnet} from '$lib/wallet-store';
	
	
    import Editor from '$lib/components/MetaStellarEditor/MetaStellarEditor.svelte';
    import TypescriptContainer from "$lib/components/TypescriptContainer/TypescriptContainer.svelte";
    
    import {P, Heading,} from 'flowbite-svelte';
    
    let MetaStellar_String = //This is the callMetaStellar function that should also be prepended to any executed code
    `

async function callMetaStellar(method, params){
    if (typeof window !== 'undefined' && typeof window.ethereum !== undefined) {
        //You Can Delete this section after offical launch
        const isFlask = ( 
        await window.ethereum?.request({ method: "web3_clientVersion" })
        )?.includes("flask"); 
        if(!isFlask){
        alert("install Metamask Flask")
        }
        // ------------------------------------------------
        try{
            if(method === 'connect'){
            //This will also install stellar if the user has metamask
                return await window.ethereum.request({
                method: 'wallet_requestSnaps',
                params: {
                    ['npm:stellar-snap']: {}
                },
                });
            }
            const rpcPacket = {
                method: 'wallet_invokeSnap',
                params:{
                    snapId:'npm:stellar-snap',
                    request: {'method':method, params:params}
                }
            }
            return await window.ethereum.request(rpcPacket);
        }
        catch(e){
            alert(e.message);
        }
    }
}

    `

    const callMetastellarDesc = `
    The call Metastellar function is the easiest way to start using stellar on metamask.
    simply copy this function into a utils file, then pass the desired operation and parameters.

    `
    //code for connecting metamask
    const ConnectEditorString = `
    let connected = callMetaStellar('connect'); //returns  promise<boolean>
    
    //or use async await
    connected.then(
        (result)=>alert(JSON.stringify(result))
    );
    `

    //code for getting address
    const getAddressString = `
    async function getAddress(){
        let address = await callMetaStellar('getAddress'); //returns  promise<String> - currentAddress
        alert(address);
        return address;
    }
    getAddress();
    `

    //code for getDataPacket
    const getDataPacketString = `
    async function getDataPacket(){
        let dataPacket = await callMetaStellar('getDataPacket'); //returns  promise<DataPacket>
        alert(JSON.stringify(dataPacket));
        return address;
    }
    getDataPacket();
    `

    const signTxnString = `
        
        
        async function prepareTestnetWallet(){
            await callMetaStellar('connect'); //connect to metamask
            await callMetaStellar('fund'); //fund the testnet wallet
            return await callMetaStellar('getAddress'); //return the address of the current account
        }
        async function signTransactionTestnet(address){
            const passpharase = StellarSdk.Networks.TESTNET // StellarSdk.Networks.Public for mainnet

            const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org'); //https://horizon.stellar.org for mainnet
            const account = await server.loadAccount(address);
            const txnBuilder = new StellarSdk.TransactionBuilder(account, {fee:StellarSdk.BASE_FEE, networkPassphrase: passpharase});
        
            txnBuilder.addOperation(
                StellarSdk.Operation.manageData({"name":"hello","value":"world"})
            )
            txnBuilder.setTimeout(3600);
            const txnXDR = txnBuilder.build().toXDR()


            const signedTxn = await callMetaStellar('signTransaction', {testnet:true, transaction:txnXDR});
            
            
            alert(JSON.stringify(signedTxn));
            return signedTxn;
        }
        prepareTestnetWallet().then(signTransactionTestnet);
    `;

    const signAndSubmitTransactionString = `
        
        
        async function prepareTestnetWallet(){
            await callMetaStellar('connect'); //connect to metamask
            await callMetaStellar('fund'); //fund the testnet wallet
            return await callMetaStellar('getAddress'); //return the address of the current account
        }
        async function signTransactionTestnet(address){
            const passpharase = StellarSdk.Networks.TESTNET // StellarSdk.Networks.Public for mainnet

            const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org'); //https://horizon.stellar.org for mainnet
            const account = await server.loadAccount(address);
            const txnBuilder = new StellarSdk.TransactionBuilder(account, {fee:StellarSdk.BASE_FEE, networkPassphrase: passpharase});
        
            txnBuilder.addOperation(
                StellarSdk.Operation.manageData({"name":"hello","value":"world"})
            )
            txnBuilder.setTimeout(3600);
            const txnXDR = txnBuilder.build().toXDR()


            const signedTxn = await callMetaStellar('signAndSubmitTransaction', {testnet:true, transaction:txnXDR});
            
            
            alert(JSON.stringify(signedTxn));
            return signedTxn;
        }
        prepareTestnetWallet().then(signTransactionTestnet);
    `;
    
</script>




<br/>
<Heading >Step1: Copy the callMetaStellarFunction</Heading>
<TypescriptContainer code={MetaStellar_String} desc={callMetastellarDesc}/>
<br/>
<br/>
<div class="uk-container justify-center" >
    <div>
    The callMetaStellar Function is a one stop soultion to accessing a users stellar-metamask wallet.
    Simply run <b>callMetaStellar('connect')</b> to connect and install stellar onto a users Metamask!
    From there you can interact with the stellar wallet by calling <code>{`callMetaStellar('functionName-as-string', {"params":"in-key-value format"});`}</code>
    We beleave the best thing to do is to copy the callMetaStellar Function into a utils folder on your application. 
    </div>
</div>
<br/>
<br/>
<!--Connect Editor-->
<Editor  code={ConnectEditorString}  >
    <Heading>Connecting Stellar + Metamask + Your App</Heading>
    <h2>callMetaStellar('connect')</h2>
    <br/>
    The Wallet must be connected before any other methods can be called. The wallet will auto-install if it is not already!
</Editor>
<br/>
<br/>
<!--getAddress Editor-->
<Editor  code={getAddressString} >
    <Heading>Getting the Address</Heading>
    <h2>callMetaStellar('getAddress')</h2>
    <br/>
    The getAddress method returns the address of the currentAccount. The wallet supports multiple accounts, but only one can be connected at a time. this gets the current one.
</Editor>
<br/>
<br/>
<!--getDataPacket Editor-->
<Editor  code={getDataPacketString}>
    <Heading>Getting a dataPacket</Heading>
    <h2>callMetaStellar('getDataPacket')</h2>
    <br/>
    Most of the time it is useful to get an overview of a users wallet state. To do this simply call the getDataPacket function. This returns the current Address along with the mainnet and testnet balance a list of assets for the current address and the wallet name and federation address if one exists.
</Editor>
<br/>
<br/>
<!--SignTransaction Editor-->
<Editor  code={signTxnString}>
    
    <Heading>Signing a Transaction</Heading>
    <h2>{`callMetaStellar('signTransaction', {transaction: xdr-as-string , testnet: true })`}</h2>
    <br/>
    Most of the time it is useful to get an overview of a users wallet state. To do this simply call the getDataPacket function. This returns the current Address along with the mainnet and testnet balance a list of assets for the current address and the wallet name and federation address if one exists.
</Editor>

<Editor  code={signAndSubmitTransactionString}>
    
    <Heading>Signing and Submiting Transaction</Heading>
    <h2>{`callMetaStellar('signAndSubmitTransaction', {transaction: xdr-as-string , testnet: true })`}</h2>
    <br/>
    Most of the time it is useful to get an overview of a users wallet state. To do this simply call the getDataPacket function. This returns the current Address along with the mainnet and testnet balance a list of assets for the current address and the wallet name and federation address if one exists.
</Editor>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Sixtyfour+Convergence&display=swap');
    h1 {
  font-family: "Sixtyfour Convergence", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings:
    "BLED" 0,
    "SCAN" 0,
    "XELA" 0,
    "YELA" 0;
}

h2{
    padding:10px;
    margin-top: 10px;
    font-size: x-large;
    color:aquamarine;
    background-color: black;
}


</style>