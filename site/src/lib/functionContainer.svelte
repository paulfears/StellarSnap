<script lang="ts">
    import {snapId} from '../constants'
    import {Button, Card, Label, Spinner, Input} from 'flowbite-svelte'
    import { AccordionItem, Accordion } from 'flowbite-svelte';
    import {Chasing} from 'svelte-loading-spinners'
  import CodeBucket from './CodeBucket.svelte';
    export let method:string;
    export let params = {};
    export let output_style: string | object = "";
    export let card_style: string | object = "";
    export let button_style: string | object = "";
    export let code = "";
    export let codeView = false;
    export let lockView = false;
    let loading = false;
    let opened = false;
    const styleString = function(style:string|object):string{
        if(typeof style !== 'string'){
            return Object.entries(style).map(([k, v]) => `${k}:${v}`).join(';')
        }
        return style;
    };

    function toggleCode(){
        codeView = !codeView;
    }

    let newParams = Object.keys(params).reduce((obj, key:string)=>{
        if(!(typeof params[key] === "string")){
            console.log("in here")
            obj[key] = params[key];
            return obj;
        }
        if(params[key].startsWith("string")){
            console.log("value is");
            console.log(params[key]);
            if(params[key].includes(':')){
                let splitKey = params[key].split(':');
                obj[key] = splitKey[1];
                return obj;
            }
            else{
                obj[key] = '';
                return obj;
            }
        }
        else if(params[key].startsWith('number')){
            if(params[key].includes(':')){
                let splitKey = params[key].split(':');
                obj[key] = splitKey[1];
                return obj;
            }
            else{
                obj[key] = '';
                return obj;
            }
        }
        else{
            obj[key] = params[key];
            return obj;
        }
    }, {});
    console.log(newParams);
    output_style = styleString(output_style);
    card_style = styleString(card_style);
    button_style = styleString(button_style);
    let results:any = "";
    async function callSnap(){
        loading = true;
        try{
        results = JSON.stringify(await window.ethereum.request({
            method: 'wallet_invokeSnap',
            params: {
            snapId: snapId,
            request: {
                method: method,
                params:newParams
            },
            },
        }));
        }
        catch(e){
            loading = false
            results = e as unknown;
        }
        opened = true;
        loading = false;
    }
</script>
<style>
    p{
        word-break:break-all
    }
</style>
<Card size='lg'>
    <div style="position:relative;">
    <slot name="title"/>
    {#if !lockView}
    <span style="position:absolute; top:0; right:0;">
        <Button size='xs' on:click={toggleCode}>Code</Button>
    </span>
    {/if}
    </div>
    
    {#if !codeView}
    {#each Object.entries(params) as [key, value]}
        {#if typeof value === "string" && value.startsWith("string")}
            <p>{key}</p>
            <Input style="width:100%;" bind:value={newParams[key]}/>
        {/if}
        {#if typeof value === "string" && value.startsWith("number")}
            <p>{key}</p>
            <Input style="width:100%;" bind:value={newParams[key]}/>
        {/if}
        {#if typeof value === "string" && value.startsWith("boolean")}
            <p>{key}</p>
            <Input style="width:100%;" bind:value={newParams[key]}/>
        {/if}
        <br/>
    {/each}
    <span class="flex justify-center">
        <Button class="w-fit" disabled={loading} size="sm" style={button_style} on:click={callSnap}>
            {#if loading}
            <Chasing size="15" color="white" unit="px"/>
            {/if}
            {method} 
        </Button>
    </span>
    <br>
    <slot/>
    <br>
    <Accordion>
    <AccordionItem bind:open={opened}>
        <span slot="header">Call Result</span>
        <p style={output_style}>{results}</p>
    </AccordionItem>
    </Accordion>
    {:else}
    <br/>
    <CodeBucket code={code}/>
    {/if}
</Card>