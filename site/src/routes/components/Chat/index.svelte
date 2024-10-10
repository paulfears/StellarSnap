

<script lang='ts'>
	import { connected } from '$lib/wallet-store';
    
    import { sineIn } from 'svelte/easing';
    let hidden1 = true;
    let transitionParams = {
        x: -320,
        duration: 200,
        easing: sineIn
    };

    import LOGO from './images/metastellar.png';
    import RING from './images/ring.png'
    import RINGFOREGROUND from './images/ring_foreground.png'
    import { fly, fade} from 'svelte/transition';
    import { onMount } from 'svelte';
    import { cubicOut } from 'svelte/easing';
    import InternalWallet from './InternalWallet.svelte';
    import ConnectButton from '$lib/components/connectButton.svelte';

	let visible = true;
    export let chatLoading = true;
    let chatHead:any;
    onMount(() => {
        console.log(chatHead);
        chatHead = document.createElement('div');
    });
    let chatOpen = false;

    function syncRotations(){
        let elements = Array.from(document.getElementsByClassName('spinning')  as HTMLCollectionOf<HTMLElement>);
        for(let i = 0; i<elements.length; i++){
            const el = elements[i];
            el.style.animation = 'none';
            el.offsetHeight; /* trigger reflow */
            el.style.animation = null;
            
        }
    }

    function handleHoverIn(){
        let chatHeadImage = document.getElementById('chatHead');
        let ringImage = document.getElementById('chatRing');
        let ringForeground = document.getElementById('chatRingForeground');

       
        if(ringForeground){
            ringForeground.style.transitionDuration = "0.45s";
            ringForeground.style.opacity = '0';
        }
        if(chatHeadImage){
            chatHeadImage.style.scale = "1.1";
        }
        if(ringImage){
            ringImage.style.transitionDuration = "0.45s";
            ringImage.style.scale = "1.2"
            ringImage.style.opacity = "0.6"
        }

    }

    function handleHoverOut(){
        let chatHeadImage = document.getElementById('chatHead');
        let ringImage = document.getElementById('chatRing');
        let ringForeground = document.getElementById('chatRingForeground');
        if(ringForeground && !chatOpen){
            ringForeground.style.opacity = '0.6';
        }
        if(chatHeadImage){
            chatHeadImage.style.scale = "1.0";
        }
        if(ringImage){
            ringImage.style.scale = "1.0";
            ringImage.style.animation = 'none';
        }
        syncRotations();
    }

    function toggleChat(){
        chatOpen = !chatOpen;
        let chatHeadBubble = document.getElementById('chatHeadBubble');
        let chatLOGO = document.getElementById('chatLOGO')
        let chatRingForeground = document.getElementById('chatRingForeground');
        let chatRing = document.getElementById('chatRing')
        if(chatOpen){
            chatLOGO.style.transitionDuration = "0.45s";
            chatHeadBubble.style.right = "250px";
            setTimeout(() => {
                chatHeadBubble.style.transform = "Scale(0.6)";
                chatLOGO.style.padding = "5px";
                chatHeadBubble.style.right = "260px";
                chatRingForeground.style.display = 'none';
                
                chatHeadBubble.style.transitionDuration = "0.2s";
                
                chatHeadBubble.style.bottom = "88vh";
            }, 400);
            
        }
        else{
            chatHeadBubble.style.transitionDuration = "0.2s";
            chatHeadBubble.style.right = "2em";

            setTimeout(() => {
                chatHeadBubble.style.transform = "Scale(1)";
                chatLOGO.style.width = "75px";
                chatLOGO.style.height = "75px";
                chatLOGO.style.transitionDuration = "0.45s";
                chatLOGO.style.padding = "10px";
                chatHeadBubble.style.bottom = "2em";  
                chatRingForeground.style.display = 'inherit';
                chatRingForeground.style.transform = "rotate(30deg)";
                chatRing.style.transform = "rotate(30deg)";
                syncRotations();
            }, 400);
            
        }
        
    }


</script>


<div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true; bg-close: false;">
    <div class="uk-offcanvas-bar">
        {#if !$connected}
        <div style="margin-top:4rem;">
            <ConnectButton/>
        </div>
        {:else}
        <InternalWallet/>
        {/if}
    </div>
</div>




<a id="chatHeadBubble" class='chatHeadContainer' href="#" uk-toggle="target: #offcanvas-flip" type="button" on:click={toggleChat}>
    <div role="dialog" on:mouseenter={handleHoverIn} on:mouseleave={handleHoverOut} id="chatLOGO">
        
        {#if !chatLoading}
            <img id="chatRing" src={RING} alt="RingLOGO"/>
        {:else}
            <img id="chatRing" class="spinning" src={RING} alt="RingLOGO"/>
        {/if}
            <img id="chatHead" src = {LOGO} alt="metastellar logo"/>
        {#if !chatLoading}
            <img id="chatRingForeground" src={RINGFOREGROUND} alt="RingLOGO"/>
        {:else}
            <img id="chatRingForeground" class="spinning" src={RINGFOREGROUND} alt="RingLOGO"/>
        {/if}
    </div>
</a>







<style>
    .chatHeadContainer{
        position: fixed;
        z-index: 999999;
        bottom: 2em;
        right: 2em;
        -webkit-transition:all 0.4s ease;
        -moz-transition:all 0.4s ease;
            -ms-transition:all 0.4s ease;
            -o-transition:all 0.4s ease;
                transition:all 0.4s ease;

    }
    #chatLOGO{
        position: relative;
        width: 100px;
        height: 100px;
        filter: drop-shadow(1px 11px 11px #333333);
        animation-name: chatHeadAnimation;
        animation-duration: 5s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
    }
    #chatRing{
        position:absolute;
        border-radius: 100%;
        right: 25%;
        bottom: 25%;
        width: 70px;
        height: 70px;
        cursor: pointer;
        transform: rotate(30deg);
        filter: drop-shadow(1px 11px 11px #333333);
    }
    #chatRingForeground{
        position:absolute;
        border-radius: 100%;
        transform: rotate(30deg);
        right: 25%;
        bottom: 25%;
        width: 70px;
        height: 70px;
        cursor: pointer;
        opacity: 0.6;

    }

    #offcanvas-flip{
        position: fixed;
    }

    .spinning{
        animation-name: spinning;
        animation-duration: 5s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }
    #chatHead{
        position:absolute;
        right:25%;
        bottom: 25%;
        border-radius: 100%;
        
        width:75px;
        height: 75px;
        cursor: pointer;

    }
    #chatHead:hover{
        transform: scale(1.1);
        animation:none;
    }
    .right{
        width:100%;
        display: flex;
        justify-content: flex-end;
    }
    
    .uk-offcanvas-bar{
        z-index: 99999;
        width: 350px;
        left: -350px;
        background-color: white;
        border-radius: 1em;
        color:black;
        position: fixed;
    }

    h3{
        color:black;
    }

    hr{
        color:black;
    }

    .uk-offcanvas-close:hover{
        color:#222;
        transform: scale(1.1);
    }
   
    .chatTitle{
        text-align: center;
        transform:translateY(-50%);
    }

    @keyframes spinning {
        0%{
            transform: rotate(0deg) scale(1);
        }
        50%{
            transform: rotate(180deg) scale(1.1);
            
        }
        100%{
            transform: rotate(360deg) scale(1);
        }
    }

    @keyframes bellyBreath{
        0%{
            transform: scale(1);
        }
        50%{
            transform: scale(1.5);
        }
        100%{
            transform: scale(1);
        }
    }
    
    @keyframes chatHeadAnimation {
        0% { 
            transform: translateY(0) scale(1.00); 
            filter: drop-shadow(1px 6px 11px #333333);
        }
        25%{ 
            transform: translateY(-2px) scale(0.97); 
            filter: drop-shadow(0px 8px 11px #333333);
        
        }
        75% { 
            transform: translateY(6px) scale(1.03); 
            filter: drop-shadow(0px 4px 16px #333333);
        }
        100% { 
            transform: translateY(0) scale(1.00); 
            filter: drop-shadow(1px 6px 11px #333333);
        }
    }

</style>