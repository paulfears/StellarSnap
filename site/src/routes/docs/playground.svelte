<script>
    import JsEditor from "$lib/components/JSEditor/JSEditor.svelte";
    
    const prependedCode = `

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

`;

const starterCode = `
async function main(){
    await callMetaStellar('connect');
    callMetaStellar('showAddress');
    console.log(StellarSdk.Networks.TESTNET);
}
main();
`;

let injected = ""
{
  const log = console.log.bind(console)
  console.log = (...args) => {
    log(...args)
    injected += String(args[0])+"\n"
  }
}




</script>



    <JsEditor prependCode={prependedCode} code={starterCode}/>
    <br/>
    <br/>
    <p>console - <i>errors involving stellarSDK are in browser dev tools!</i></p>
    <div style="padding:5px; border-radius:10px; background-color:#f2f2f2; white-space: pre-line">
        <p>{injected}</p>
    </div>