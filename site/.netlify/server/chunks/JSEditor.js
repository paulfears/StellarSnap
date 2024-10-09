import { c as create_ssr_component, g as escape, t as null_to_empty, a as add_attribute, v as validate_component } from "./ssr.js";
import { C as Card } from "./index.svelte_svelte_type_style_lang2.js";
import "@stellar/stellar-sdk";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { B as Button } from "./Button.js";
import { P } from "./P.js";
const css = {
  code: ".root-wrapper-codemirror.svelte-1mrmdlp{display:flex;flex-direction:row;overflow-x:scroll}",
  map: `{"version":3,"file":"Editor.svelte","sources":["Editor.svelte"],"sourcesContent":["<script lang='ts'>import { onMount } from \\"svelte\\";\\nimport { EditorView, basicSetup } from \\"codemirror\\";\\nimport { EditorState } from \\"@codemirror/state\\";\\nimport { javascript } from \\"@codemirror/lang-javascript\\";\\nexport let value = \\"\\";\\nexport let typescript = false;\\nexport let height = \\"400px\\";\\nexport let width = \\"50rem\\";\\nlet mounted = false;\\nlet editor;\\nlet editorComponent;\\nconst updateExtension = EditorView.updateListener.of((update) => {\\n  if (update.docChanged) {\\n    value = update.state.doc.toString();\\n  }\\n});\\nlet state = EditorState.create({\\n  doc: value,\\n  extensions: [basicSetup, javascript({ typescript }), updateExtension]\\n});\\nonMount(() => {\\n  editor = new EditorView({\\n    state,\\n    parent: editorComponent\\n  });\\n  mounted = true;\\n});\\n$:\\n  value && (() => {\\n    if (mounted) {\\n      console.log(editor.state);\\n      let selection = editor.state.selection;\\n      let event = editor.state.update({\\n        changes: { from: 0, to: editor.state.doc.toString().length, insert: value },\\n        selection\\n      });\\n      editor.dispatch(event);\\n    }\\n  })();\\n<\/script>\\r\\n  \\r\\n  <div class={\\"root-wrapper-codemirror\\"} bind:this={editorComponent} style=\\"height:{height}; width: {width}; border: 1px solid #ccc;\\"></div>\\r\\n\\r\\n  <style>\\r\\n    .root-wrapper-codemirror {\\r\\n    \\r\\n    display: flex;\\r\\n    flex-direction: row;\\r\\n    overflow-x: scroll;\\r\\n    }\\r\\n\\r\\n    .root-wrapper-codemirror .cm-editor{\\r\\n        width: 0;\\r\\n        flex-grow: 1;    \\r\\n        overflow-x: scroll; \\r\\n    }\\r\\n  </style>"],"names":[],"mappings":"AA4CI,uCAAyB,CAEzB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,UAAU,CAAE,MACZ"}`
};
const Editor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = "" } = $$props;
  let { typescript = false } = $$props;
  let { height = "400px" } = $$props;
  let { width = "50rem" } = $$props;
  let editorComponent;
  const updateExtension = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      value = update.state.doc.toString();
    }
  });
  EditorState.create({
    doc: value,
    extensions: [basicSetup, javascript({ typescript }), updateExtension]
  });
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.typescript === void 0 && $$bindings.typescript && typescript !== void 0)
    $$bindings.typescript(typescript);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  $$result.css.add(css);
  return `<div class="${escape(null_to_empty("root-wrapper-codemirror"), true) + " svelte-1mrmdlp"}" style="${"height:" + escape(height, true) + "; width: " + escape(width, true) + "; border: 1px solid #ccc;"}"${add_attribute("this", editorComponent, 0)}></div>`;
});
const JSEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { code = `` } = $$props;
  let { prependCode = `` } = $$props;
  let { title = "" } = $$props;
  let { width = "100%" } = $$props;
  let { height = "100%" } = $$props;
  if ($$props.code === void 0 && $$bindings.code && code !== void 0)
    $$bindings.code(code);
  if ($$props.prependCode === void 0 && $$bindings.prependCode && prependCode !== void 0)
    $$bindings.prependCode(prependCode);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="uk-container justify-center">${validate_component(Card, "Card").$$render($$result, { shadow: true }, {}, {
      default: () => {
        return `${validate_component(P, "P").$$render($$result, { size: "2xl" }, {}, {
          default: () => {
            return `${escape(title)}`;
          }
        })} ${slots.default ? slots.default({}) : ``} ${validate_component(Editor, "Editor").$$render(
          $$result,
          { width, height, value: code },
          {
            value: ($$value) => {
              code = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })} ${validate_component(Button, "Button").$$render($$result, { color: "light" }, {}, {
      default: () => {
        return `Run`;
      }
    })}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Editor as E,
  JSEditor as J
};
