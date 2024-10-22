<script lang='ts'>
    import TransactionMaker from "$lib/components/TransactionBuilder/transactionMaker.svelte";
    import {connected} from "$lib/wallet-store";
    import ConnectDisp from "$lib/components/connectDisp/ConnectDisp.svelte";
    import {dataPacket, isTestnet} from "$lib/wallet-store";
    import {P, Tabs, TabItem} from 'flowbite-svelte';
  
    import {Button} from 'flowbite-svelte';
    import {callMetaStellar} from '$lib/callMetaStellar';
    import JsEditor from "$lib/components/MetaStellarEditor/MetaStellarEditor.svelte";
    import {OperationParams} from './operations';

    let transactionCode = "";
    let transactionXDR = "No Transaction compiled";
    let transactionResult = "No Transaction Submited";

        
    const MetaStellar_String = 
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

    interface paramsTypes{
        [key:string]:string
    }

    async function signAndSubmitXDR(){
        let result = await callMetaStellar('signAndSubmitTransaction', {transaction:transactionXDR, testnet:$isTestnet});
        transactionResult = JSON.stringify(result);
    }
    async function transaction_callback(txn:any, operations:Array<any>){
        transactionCode = String(txn);
        
        let codeString = ``;
        
        codeString+=`
        const network = \`\${'testnet'}\`
        const address = \`\${'${$dataPacket.currentAddress}'}\`

        async function CreateTransaction(network, address){
            
            const passpharase = network === 'testnet'? StellarSdk.Networks.TESTNET : StellarSdk.Networks.PUBLIC

            const server = new StellarSdk.Horizon.Server(network === 'testnet'?'https://horizon-testnet.stellar.org':'https://horizon.stellar.org');
            const account = await server.loadAccount(address);
            const txnBuilder = new StellarSdk.TransactionBuilder(account, {fee:StellarSdk.BASE_FEE, networkPassphrase: passpharase});
        `
        let i = 0;
        for(const operation of operations){
            console.log(operation);
            let paramsTypes:paramsTypes = OperationParams[operation.type].params;
            console.log("param types is:");
            console.log(paramsTypes);
            let argString = '{'
            for(let key in operation.params){
                i+=1;
                if(paramsTypes[key] === 'asset'){
                    const varName = operation.params[key].code+"_Asset"+i; //i adds a unique id for assets that share the same code name;
                    codeString += `\n\t\t\tlet ${varName} = new StellarSdk.Asset('${operation.params[key]['code']}', '${operation.params[key]['issuer']}');\n`
                    operation.params[key] = varName;
                    argString+=`'${key}':${varName},`
                }
                else{
                    argString+=`'${key}':'${operation.params[key]}',`
                }
            }
            argString += '}';
            codeString += `
            txnBuilder.addOperation(
                
                StellarSdk.Operation.${operation.type}(${argString})

            )`
        }
        codeString+=`
            txnBuilder.setTimeout(3600);
            return txnBuilder.build().toXDR()
            
        }
        CreateTransaction(network, address)
        .then(
            async (txnXDR) => {
                await callMetaStellar('connect');
                alert( 
                    JSON.stringify(
                        await callMetaStellar('signAndSubmitTransaction', 
                            {testnet:${$isTestnet}, transaction:txnXDR}
                        )
                    )
                );
            }
        )

        
        `
        transactionCode = codeString;
        transactionXDR = txn.setTimeout(3600).build().toXDR();
    }

</script>

{#if !$connected}
    <ConnectDisp/>
{:else}

    <P size='4xl' class="uk-container justify-center">TXN Test Kitchen</P>
    <br/>
    <div class='flex flex-wrap'>
        <div style="margin-left: 2rem; margin-top:2rem; width:30rem; min-width:30rem;">
            <TransactionMaker network={$isTestnet?'testnet':'mainnet'} address={$dataPacket.currentAddress} callback={transaction_callback}/>
        </div>
        <div style="margin-left:2rem; margin-right:2rem; margin-top:2rem; border-left: 1px solid; padding-left: 2rem;">
            <Tabs tabStyle="underline">
                <TabItem title="Javascript-SDK Code" open>
                    <JsEditor width={'40rem'}  bind:code={transactionCode} prependCode={MetaStellar_String}/>
                </TabItem>
                <TabItem title="Transaction XDR">
                    Transaction XDR
                    <div style="width:40rem; word-wrap:break-word">
                        {transactionXDR}
                    </div>
                    <Button on:click={signAndSubmitXDR} color="light">Sign And Submit</Button>
                    <p>Transaction result</p>
                    <div style="width:40rem; height:10rem; word-wrap:break-word">
                        {transactionResult}
                    </div>
                </TabItem>
            </Tabs>
        </div>
    </div>

{/if}
