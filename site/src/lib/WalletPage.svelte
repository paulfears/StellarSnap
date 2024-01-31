<script lang="ts">
    import FunctionContainer from "./functionContainer.svelte";
    import {snapId} from '../constants';
    import {testnet} from '../store';
  import FunctionButton from "./functionButton.svelte";
    function genreateCode(method:string, params:any){
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
</script>

<FunctionContainer method="listAccounts" code={genreateCode("listAccounts", {})} params={{}}>
    <p slot="title">list the wallet Accounts</p>
</FunctionContainer>
<FunctionContainer method="setCurrentAccount" code={genreateCode("setCurrentAccount", {"address":"ADDRESS"})} params={{"address":"string"}}>
    <p slot="title">set The currentAccount</p>
</FunctionContainer>
<FunctionContainer method="getCurrentAccount" code={genreateCode("getCurrentAccount", {})}>
    <p slot="title">get the current Account</p>
</FunctionContainer>
<FunctionContainer method="importAccount" code={genreateCode("getCurrentAccount", {})}>
    <p slot="title">import An Account</p>
</FunctionContainer>
<FunctionContainer method="createAccount" code={genreateCode("getCurrentAccount", {})} params={{"name":"string"}}>
    <p slot="title">Create A new Account</p>
</FunctionContainer>
<FunctionContainer method="renameAccount" code={genreateCode("getCurrentAccount", {})} params={{"address":"string","name":"string"}}>
    <p slot="title">rename an Account</p>
</FunctionContainer>
<FunctionContainer method="dispPrivateKey" code={genreateCode("dispPrivateKey", {})}>
    <p slot="title">import An Account</p>
</FunctionContainer>
<FunctionButton method="clearState">Clear All Accounts</FunctionButton>