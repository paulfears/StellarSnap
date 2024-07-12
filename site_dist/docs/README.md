# Metastellar FAQ
Please See if your question is anwsered by the FAQ



<div style="width:50%; height:0; padding-bottom:100%; position:relative;"><div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/XZyZJCtQHo7dPGWjG2" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/netflix-duncan-trussell-midnight-gospel-the-XZyZJCtQHo7dPGWjG2">via GIPHY</a></p>
</div>


# MetaStellar Wallet

[github](https://github.com/paulfears/StellarSnap) [discord](https://discord.gg/ETQk4UcYyc)

Metastellar wallet is a Stellar wallet for Metamask. This allows you to interact with the stellar blockchain and hold XLM with Metamask.
Metastellar can hold your XLM, stellar, and stellar assets, as well as interact with stellar web3 applications. At the current time, <b>we do not recommend using metastellar as your primary stellar wallet</b>, but my team and I are constantly working to improve the wallet. If you are having a problem, with the wallet please contact

 <b>support@metastellar.io</b>

and we will work to get it resolved. This is open-source software and is provided as-is. We are not responsible for anything loss of funds that results from the use or misuse of this software.

------------------------------------------- 

## Install

to install the Stellar-Snap

1. Make sure you have the latest version of the <b>Metamask Browser extension</b>, it can be installed [here](https://metamask.io/download/)
2. After metamask is installed

<button id="installButton">Install MetaStellar</button>

<br>
<div class="appearOnConnected">
<p>You can test you're installation with</p>
<br>
<button id="viewAddress">Test Install</button>
</div>

<div class="spacer"></div>


<script>
    console.log("script live");
let metastellarButton = document.getElementById("installButton");
metastellarButton.addEventListener('click', async ()=>await connectSnap());

let viewAddress = document.getElementById('viewAddress');
viewAddress.addEventListener('click', async ()=>await displayAddress());

function setConnected(connected){
    let display = connected? 'block' : 'none'
    let elements = document.getElementsByClassName('appearOnConnected');
    for(let i = 0; i<elements.length; i++){
        elements[i].style.display = display
    }
}

setConnected(false);

async function connectSnap(){
    try{
        console.log("here")
        const connected = await ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
            ['npm:stellar-snap']: {}
        },
        });
        console.log(connected)
        setConnected(true)
        return true;
    }catch(e){
        if (e.toString() === "ReferenceError: ethereum is not defined"){
            alert("Install Metamask")
        }
        alert(e);
        setConnected(false);
        return false;
    }
}


async function displayAddress(){
    try{
    const request = {
        method: 'wallet_invokeSnap',
        params: {snapId:`npm:stellar-snap`, 
            request:{
                method: `${'showAddress'}`
            }
            }
        }
    let address = await ethereum.request(request);
    }
    catch(e){
        alert(e);
    }
}

</script>