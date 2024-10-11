<script lang='ts'>
	import { sdkString } from './jsStringEsc';
    import {JSEditor} from 'svelte-js-editor';


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

    export let code = ``;
    export let prependCode = ``+sdkString+MetaStellar_String;
    export let width = '100%';
    export let height = '100%';
    export let logCallBack = (args:any)=>{args};
    
    {
        const log = console.log.bind(console)
        console.log = (...args) => {
            log(...args);
            logCallBack(args);
        }
    }
    function exec(){
        window.onerror = (e) => {alert(e)}
        let ToBeRun = prependCode+code
        try{
            eval(ToBeRun);
        }
        catch(e){
            alert(e);
            console.error(e);
        }
        
        
    }

    
    $:code
</script>
<slot></slot>
<JSEditor {code} {prependCode} {width} {height} {logCallBack} />

<br/>
<br/>

