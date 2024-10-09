import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/Button.js";
const css = {
  code: ".title.svelte-i3civl{font-size:2em}.question.svelte-i3civl{font-size:1.5em}.anwser.svelte-i3civl{font-size:1em;font-style:bold}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang='ts'>import { callMetaStellar } from \\"$lib/callMetaStellar\\";\\nimport { Button } from \\"flowbite-svelte\\";\\nimport { dataPacket } from \\"$lib/wallet-store\\";\\nasync function importWallet() {\\n  await callMetaStellar(\\"importAccount\\", {});\\n}\\nasync function exportKeys() {\\n  await callMetaStellar(\\"exportAccount\\", {});\\n}\\n<\/script>\\r\\n\\r\\n\\r\\n<h1 class=\\"title\\">Frequently Asked Questions</h1>\\r\\n<div style=\\"margin-left:2em;\\">\\r\\n    <br/>\\r\\n    <p class=\\"question\\">Where can I view my Wallet?</p>\\r\\n    <p class=\\"anwser\\">go to <a href=\\"/wallet\\">metastellar.io/wallet</a></p>\\r\\n    <br/>\\r\\n    <hr/>\\r\\n    <br/>\\r\\n    <p class=\\"question\\">How can I import a stellar wallet?</p>\\r\\n    <p class=\\"anwser\\">have your private key ready and click the button below</p>\\r\\n    <Button color=\\"light\\" on:click={importWallet}>import wallet</Button>\\r\\n    <br/>\\r\\n    <br/>\\r\\n    <hr/>\\r\\n    <br/>\\r\\n    <p class=\\"question\\">How can I export my private key from my wallet?</p>\\r\\n    <p class=\\"anwser\\">click the button below</p>\\r\\n    <Button color=\\"light\\" on:click={exportKeys}>export keys</Button>\\r\\n    <br/>\\r\\n    <br/>\\r\\n    <hr/>\\r\\n    <br/>\\r\\n    <p class=\\"question\\">Where are my keys stored</p>\\r\\n    <p class=\\"anwser\\">your keys are stored in the same place as your metamask ethereum keys in encrypted storeage</p>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n    .title{\\r\\n        font-size: 2em;\\r\\n    }\\r\\n    .question{\\r\\n        font-size: 1.5em;\\r\\n    }\\r\\n    .anwser{\\r\\n        font-size: 1em;\\r\\n        font-style: bold;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAuCI,oBAAM,CACF,SAAS,CAAE,GACf,CACA,uBAAS,CACL,SAAS,CAAE,KACf,CACA,qBAAO,CACH,SAAS,CAAE,GAAG,CACd,UAAU,CAAE,IAChB"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<h1 class="title svelte-i3civl" data-svelte-h="svelte-anohd5">Frequently Asked Questions</h1> <div style="margin-left:2em;"><br> <p class="question svelte-i3civl" data-svelte-h="svelte-6aavqe">Where can I view my Wallet?</p> <p class="anwser svelte-i3civl" data-svelte-h="svelte-155w1e5">go to <a href="/wallet">metastellar.io/wallet</a></p> <br> <hr> <br> <p class="question svelte-i3civl" data-svelte-h="svelte-1lq2jit">How can I import a stellar wallet?</p> <p class="anwser svelte-i3civl" data-svelte-h="svelte-1o2qb22">have your private key ready and click the button below</p> ${validate_component(Button, "Button").$$render($$result, { color: "light" }, {}, {
    default: () => {
      return `import wallet`;
    }
  })} <br> <br> <hr> <br> <p class="question svelte-i3civl" data-svelte-h="svelte-tjqib8">How can I export my private key from my wallet?</p> <p class="anwser svelte-i3civl" data-svelte-h="svelte-k1s2nv">click the button below</p> ${validate_component(Button, "Button").$$render($$result, { color: "light" }, {}, {
    default: () => {
      return `export keys`;
    }
  })} <br> <br> <hr> <br> <p class="question svelte-i3civl" data-svelte-h="svelte-ghl8yn">Where are my keys stored</p> <p class="anwser svelte-i3civl" data-svelte-h="svelte-1dbx8kq">your keys are stored in the same place as your metamask ethereum keys in encrypted storeage</p> </div>`;
});
export {
  Page as default
};
