<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider } from 'flowbite-svelte';
    export let loading = false;
    import {snapId} from './constants';
    import ConnectButton from './lib/connectButton.svelte';
    async function fundWallet(){
        loading = true;
        try{
            console.log("in here");
                const result = await window.ethereum.request({
                    method: 'wallet_invokeSnap',
                    params: {
                    snapId: snapId,
                    request: {
                        method: "fund",
                    },
                    },
                });
                console.log(result)
        }
        catch(e){

        }
        loading = false;
    }
</script>
  

    <Navbar rounded>
        <NavBrand href="/">
          <div style="display:flex; flex-direction:column; justify-content:left;">
          <img style="height:40px;" src="https://assets-global.website-files.com/5deac75ecad2173c2ccccbc7/5dec8960504967fd31147f62_Stellar_lockup_black_RGB.svg" alt="" class="stellar-logo">
          <h2 style="font-size:x-large;">on Metamask</h2>
          </div>
        </NavBrand>
        <NavHamburger/>
        <NavUl>
            <NavLi active={true}>Demo</NavLi>
            <NavLi>Docs</NavLi>
            <NavLi>FAQ</NavLi>
            <NavLi>Wallet</NavLi>
          </NavUl>
        <NavUl>
          <NavLi><ConnectButton callback={fundWallet}/></NavLi>
        </NavUl>
    </Navbar>
