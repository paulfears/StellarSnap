<script>
    import { AceEditor } from "svelte-ace";
    import {Button} from 'flowbite-svelte'
  import "brace/mode/javascript";
  import "brace/theme/chrome";
  export let code = "";
  function executeCode(){
    eval(code);
  }
</script>


<AceEditor   
width='100%'
height='250px'
lang="javascript"
theme="chrome"
bind:value={code}
/>
<Button on:click={executeCode}>run</Button>