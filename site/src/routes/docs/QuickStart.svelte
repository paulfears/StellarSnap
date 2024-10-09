<script>
	import { dataPacket, isTestnet} from '$lib/wallet-store';
	
	import JsEditor from '$lib/components/JSEditor/JSEditor.svelte';
    import JSEditor from '$lib/components/JSEditor/JSEditor.svelte';
    import TypescriptContainer from "$lib/components/TypescriptContainer/TypescriptContainer.svelte";
    import {Card} from '@metastellar/ui-library';
    import {P} from 'flowbite-svelte';
    
    
    let MetaStellar_String = 
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
    
        const network = "${$isTestnet?'testnet':'mainnet'}";
        const address = "${($dataPacket)?$dataPacket.currentAddress:"wallet-address"}";
        async function signTransaction(network, address){
            const passpharase = network === 'testnet'? StellarSdk.Networks.TESTNET : 'Public Global Stellar Network ; September 2015'

            const server = new StellarSdk.Horizon.Server(network === 'testnet'?'https://horizon-testnet.stellar.org':'https://horizon.stellar.org');
            const account = await server.loadAccount(address);
            const txnBuilder = new StellarSdk.TransactionBuilder(account, {fee:StellarSdk.BASE_FEE, networkPassphrase: passpharase});
        
            txnBuilder.addOperation(
                StellarSdk.Operation.manageData({"name":"hello","value":"world"})
            )
            txnBuilder.setTimeout(3600);
            const txnXDR = txnBuilder.build().toXDR()


            const signedTxn = await callMetaStellar('signTransaction', {testnet:${$isTestnet}, transaction:txnXDR});
            
            
            alert(JSON.stringify(signedTxn));
            return signedTxn;
        }
        signTransaction(network, address);
    `;

    
</script>


<Card shadow>
    <P size="2xl">QuickStart</P>
</Card>

<TypescriptContainer code={MetaStellar_String} title="Step1: Copy the callMetaStellarFunction" desc={callMetastellarDesc}/>
<br/>
<br/>
<Card class="uk-container justify-center" shadow>
    <div>
    The callMetaStellar Function is a one stop soultion to accessing a users stellar-metamask wallet.
    Simply run <b>callMetaStellar('connect')</b> to connect and install stellar onto a users Metamask!
    From there you can interact with the stellar wallet by calling <code>{`callMetaStellar('functionName-as-string', {"params":"in-key-value format"});`}</code>
    We beleave the best thing to do is to copy the callMetaStellar Function into a utils folder on your application. 
    </div>
</Card>
<br/>
<br/>
<!--Connect Editor-->
<JSEditor prependCode={MetaStellar_String} code={ConnectEditorString}  title="Connect - must be run before any other functions!">
    The Wallet must be connected before any other methods can be called. The wallet will auto-install if it is not already!
</JSEditor>
<br/>
<br/>
<!--getAddress Editor-->
<JsEditor prependCode={MetaStellar_String} code={getAddressString} title="getAddress">
    The getAddress method returns the address of the currentAccount. The wallet supports multiple accounts, but only one can be connected at a time. this gets the current one.
</JsEditor>
<br/>
<br/>
<!--getDataPacket Editor-->
<JsEditor prependCode={MetaStellar_String} code={getDataPacketString} title="getDataPacket">
    Most of the time it is useful to get an overview of a users wallet state. To do this simply call the getDataPacket function. This returns the current Address along with the mainnet and testnet balance a list of assets for the current address and the wallet name and federation address if one exists.
</JsEditor>
<br/>
<br/>
<!--SignTransaction Editor-->
<JsEditor prependCode={MetaStellar_String} code={signTxnString} title="SignTransaction">
    Most of the time it is useful to get an overview of a users wallet state. To do this simply call the getDataPacket function. This returns the current Address along with the mainnet and testnet balance a list of assets for the current address and the wallet name and federation address if one exists.
</JsEditor>

