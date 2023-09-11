<script lang="ts">
  import ConnectButton from './lib/connectButton.svelte';
  import FunctionButton from './lib/functionButton.svelte';
  import {connected} from './store';
  
</script>


  <ConnectButton>Connect</ConnectButton>
  <br>
  <br>
  <div>
    {#if $connected}
      <FunctionButton method="hello" params={{}}>Hello</FunctionButton>
    {/if}
  </div>



