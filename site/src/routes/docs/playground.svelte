<script>
    import Editor from "$lib/components/MetaStellarEditor/MetaStellarEditor.svelte";
    
   

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



    <Editor code={starterCode}/>
    <p>console - <i>errors involving stellarSDK are in browser dev tools!</i></p>
    <div style="padding:5px; border-radius:10px; background-color:#f2f2f2; white-space: pre-line">
        <p>{injected}</p>
    </div>