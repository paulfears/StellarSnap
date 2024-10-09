<script lang='ts'>
	import { sdkString } from './jsStringEsc';
	import { Card } from '@metastellar/ui-library';
	import Editor from '../Editor/Editor.svelte';
    import {Button, P} from 'flowbite-svelte';
    
    export let code = ``;
    export let prependCode = ``+sdkString;
    export let title = ''
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


<div class="uk-container justify-center">
    <Card  shadow>
        <P size="2xl">{title}</P>
        <slot></slot>
        <Editor width={width} height={height} bind:value={code}>
        </Editor>
        <br/>
        <Button on:click={exec} color="light">Run</Button>
    </Card>
    
</div>
