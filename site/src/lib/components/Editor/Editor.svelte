<script lang='ts'>
    import { onMount } from 'svelte';
    import { EditorView, basicSetup } from 'codemirror';
    import {EditorState} from "@codemirror/state";
    import { javascript } from '@codemirror/lang-javascript';
    
    

    export let value = "";
    export let typescript = false;
    export let height = "400px";
    export let width = "50rem";
    

    let mounted = false;
    let editor:EditorView;
    let editorComponent:HTMLElement;

    const updateExtension = EditorView.updateListener.of((update) => {
        if (update.docChanged) {
            value = update.state.doc.toString();
            
        }
    });
    
    let state = EditorState.create({
        doc:value,
        extensions: [basicSetup, javascript({typescript}), updateExtension]
    })


    onMount(() => {
      editor = new EditorView({
        state,
        parent: editorComponent,
        
      });

      mounted = true;
    });
    
    $: value&&(()=>{
        if(mounted){
            let selection = editor.state.selection;
            let event = editor.state.update({
              changes: { from: 0, to: editor.state.doc.toString().length, insert: value},
              selection
            }); 
            editor.dispatch(event)
        }
    })();
    

  </script>
  
  <div class={"root-wrapper-codemirror"} bind:this={editorComponent} style="height:{height}; width: {width}; border: 1px solid #ccc;"></div>

  <style>
    .root-wrapper-codemirror {
    
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    }

    .root-wrapper-codemirror .cm-editor{
        width: 0;
        flex-grow: 1;    
        overflow-x: scroll; 
    }
  </style>