<script lang='ts'>
import SignInteraction from '../components/Signature/SignInteraction.svelte';
import ConnectButtonCreepy from '../../components/connectButtonCreepy.svelte';
import {Card} from '@metastellar/ui-library';
import { scale } from 'svelte/transition';
import { quintOut } from 'svelte/easing';

import { cubicOut } from 'svelte/easing';


let connectLoader:HTMLElement;
let interactiveSignerSpan;
function scalePop(node:HTMLElement, {delay=0, duration=400}){
    
    return {
		delay,
		duration,
		css: (t) => `transform:scale(${t})`
	};
}

function blink(node:HTMLElement, {delay=0, duration=400}){
    
    return {
		delay,
		duration,
		css: (t) => `opacity:${t}%;`
	};
}

let signVisable = false;
let connectVisable = true;

let swapConnect = function(){
    
    console.log(connectLoader);
    connectLoader.style.zIndex = 'auto';
    connectLoader.style.transition = 'transform, 1.1s'
    connectLoader.style.transitionDelay = '0.4s';
    connectLoader.style.transform = 'scale(1.3)';
    setTimeout(()=>{
        signVisable = true;
        connectVisable = false;
    }, 1500);
}

function blinkOut(){
    
    interactiveSignerSpan.style.transition = 'all, 1s';
    interactiveSignerSpan.style.filter = 'brightness(0.1)';
    interactiveSignerSpan.style.transitionDelay = '0.2s';
    interactiveSignerSpan.style.transform = 'scaleY(0)';
    setTimeout(()=>{
        signVisable = false;
    }, 1500);
}

function blinkIn(){
    
}

function SignatureCallback(sig:Point[][]){
    console.log(sig);
    //signVisable = false;
    blinkOut();
}
</script>


<div style="text-align:left; width:100%;">
    <h1 style="font-size:xx-large; text-align:left;">Hello world</h1>
</div>

{#if signVisable}
<div style="display:flex; flex-direction:column;" out:scale={{duration:500}} bind:this={interactiveSignerSpan}>
    <SignInteraction SignatureCallback={SignatureCallback}/>
</div>
{/if}
{#if connectVisable}

    <span bind:this={connectLoader} style="display:flex; justify-content:center; width:100%;">
        <button on:click={swapConnect}>

            <ConnectButtonCreepy />

        </button>
    </span>

{/if}
