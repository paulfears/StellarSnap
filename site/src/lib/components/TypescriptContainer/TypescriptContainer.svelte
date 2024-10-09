<script lang='ts'>
    import { Card } from '@metastellar/ui-library';
    import { Toast } from '$lib/utils/index.ts';
    import {Button, P} from 'flowbite-svelte'
    import copy from "copy-to-clipboard";
    import Editor from '../Editor/Editor.svelte';


    export let code: string;
    export let keywords: string[] = [];

    export let title: string = "";
    export let desc: string = "";
    export let toastText: string = "Code Copied";





    function copyCode(){
        copy(code);
        Toast({type:"success", desc:"code copied"});
    }
</script>
<br/>
<div class="uk-container justify-center">
<Card class="code-outer" shadow>
    <P size="2xl">{title}</P>
    <div class="code" >
        <Editor width={"100%"} height={"40rem"} readOnly={true} bind:value={code} typescript={true}/>
    </div>
    <br/>
    <div style="display:flex;">
    
    <Button on:click={copyCode} color="light">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
    </Button>
    <div style="margin-left:5px;">{@html desc}</div>
    </div>
</Card>
</div>
<style>
    .code{
        border:0.5px solid black; 
        padding:10px; 
        border-radius: 5px; 
        
    }
    .code-outer{
        padding: 10px;
        border-radius: 5px;
        
        border: 0.5px solid black;
    }
</style>

