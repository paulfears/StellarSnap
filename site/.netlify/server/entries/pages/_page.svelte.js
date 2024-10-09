import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { C as Card } from "../../chunks/index.svelte_svelte_type_style_lang2.js";
import "@stellar/stellar-sdk";
import "../../chunks/ArrowUp.svelte_svelte_type_style_lang.js";
/* empty css                                               */
const Greeting = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
const css = {
  code: "a.svelte-sjagqx{text-decoration:none;color:black}@keyframes svelte-sjagqx-float{0%{box-shadow:0 5px 15px 0px rgba(0,0,0,0.6);transform:translatey(0px) scale(1)}50%{box-shadow:0 25px 15px 0px rgba(0,0,0,0.2);transform:translatey(-5px) scale(1.01)}100%{box-shadow:0 5px 15px 0px rgba(0,0,0,0.6);transform:translatey(0px) scale(1)}}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang='ts'>import { Card, NftPoster, YoutubePoster } from \\"@metastellar/ui-library\\";\\nimport Greeting from \\"../components/greeting.svelte\\";\\nimport OfficeImg from \\"$lib/images/wallet.webp\\";\\nimport { onMount } from \\"svelte\\";\\nimport ChatBox from \\"./components/Chat/index.svelte\\";\\nimport video1 from \\"$lib/video/metastellar.mp4\\";\\nimport girlImg from \\"$lib/images/girl.jpg\\";\\nimport { env } from \\"$lib/env\\";\\nimport { stellar_rpc_mainnet_endpoint } from \\"$lib/constants\\";\\nconst mouse_movement_record_send_url = env.VITE_MOUSE_MOVEMENT_DATA_SEND_URL;\\nlet titles = {\\n  wallet: \\"Wallet\\",\\n  news: \\"News\\",\\n  docs: \\"Documentation\\",\\n  chat: \\"Chat\\"\\n};\\nlet screen = \\"lg\\";\\nlet screens = {\\n  lg: 1200,\\n  md: 992,\\n  sm: 768,\\n  xs: 576\\n};\\nfunction handleResize() {\\n  if (window.innerWidth > screens.md) {\\n    screen = \\"lg\\";\\n    titles.docs = \\"Documentation\\";\\n  }\\n  if (window.innerWidth < screens.lg) {\\n    screen = \\"md\\";\\n    titles.docs = \\"Docs\\";\\n  }\\n  if (window.innerWidth < screens.md) {\\n    screen = \\"sm\\";\\n  }\\n  if (window.innerWidth < screens.sm) {\\n    screen = \\"xs\\";\\n  }\\n}\\nonMount(() => {\\n  handleResize();\\n});\\nconst assetInfo = {\\n  code: \\"FBO2\\",\\n  issuer: \\"GBSUYFOI5SWH7MWA43MQGXH3CP6DMBU3AKAU7ZGTEN7EKCNSVQWJUXOL\\"\\n};\\n<\/script>\\r\\n<svelte:window on:resize={handleResize} />\\r\\n<Greeting />\\r\\n\\r\\n<div id=\\"midContainer\\"  class=\\"uk-container justify-center\\">\\r\\n    <br/>\\r\\n    <div style=\\"max-width: 50rem\\" class=\\"flex flex-wrap gap-4 justify-center\\">\\r\\n        <a href=\\"/wallet\\">\\r\\n        <div>\\r\\n            <Card class=\\"py-7 px-5 w-80 h-80\\" shadow>\\r\\n                <p>Wallet</p>\\r\\n                <svg xmlns=\\"http://www.w3.org/2000/svg\\" height=\\"48px\\" viewBox=\\"0 -960 960 960\\" width=\\"48px\\" fill=\\"#434343\\"><path d=\\"M240-160q-66 0-113-47T80-320v-320q0-66 47-113t113-47h480q66 0 113 47t47 113v320q0 66-47 113t-113 47H240Zm0-470h480q29 0 54.5 9t45.5 26v-45q0-42-29-71t-71-29H240q-42 0-71 29t-29 71v45q20-17 45.5-26t54.5-9Zm-97 136 477 115q7 2 14.5.5T647-385l160-134q-13-23-36-37t-51-14H240q-35 0-62 21.5T143-494Z\\"/></svg>\\r\\n            </Card>\\r\\n        </div>\\r\\n        </a>\\r\\n        <a href=\\"/docs\\">\\r\\n        <div>\\r\\n            <Card class=\\"py-7 px-5 w-80 h-80\\" shadow>\\r\\n                <p>Docs</p>\\r\\n                <svg xmlns=\\"http://www.w3.org/2000/svg\\" height=\\"48px\\" viewBox=\\"0 -960 960 960\\" width=\\"48px\\" fill=\\"#434343\\"><path d=\\"M319-250h322v-60H319v60Zm0-170h322v-60H319v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z\\"/></svg>\\r\\n            </Card>\\r\\n        </div>\\r\\n        </a>\\r\\n        <a href=\\"/application\\">\\r\\n            <div>\\r\\n                <Card class=\\"py-7 px-5 w-80 h-80\\" shadow>\\r\\n                    <p>Application</p>\\r\\n                    <svg xmlns=\\"http://www.w3.org/2000/svg\\" height=\\"48px\\" viewBox=\\"0 -960 960 960\\" width=\\"48px\\" fill=\\"#434343\\"><path d=\\"M180-120q-24.75 0-42.37-17.63Q120-155.25 120-180v-600q0-24.75 17.63-42.38Q155.25-840 180-840h205q5-35 32-57.5t63-22.5q36 0 63 22.5t32 57.5h205q24.75 0 42.38 17.62Q840-804.75 840-780v600q0 24.75-17.62 42.37Q804.75-120 780-120H180Zm0-60h600v-600H180v600Zm100-100h273v-60H280v60Zm0-170h400v-60H280v60Zm0-170h400v-60H280v60Zm200-177q14 0 24.5-10.5T515-832q0-14-10.5-24.5T480-867q-14 0-24.5 10.5T445-832q0 14 10.5 24.5T480-797ZM180-180v-600 600Z\\"/></svg>\\r\\n                </Card>\\r\\n            </div>\\r\\n        </a>\\r\\n        <a href=\\"/transactionBuilder\\">\\r\\n            <div>\\r\\n                <Card class=\\"py-7 px-5 w-80 h-80\\" shadow>\\r\\n                    <p>Stellar Lab 2.0</p>\\r\\n                </Card>\\r\\n            </div>\\r\\n        </a>\\r\\n    </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n    a {\\r\\n        text-decoration: none;\\r\\n        color:black;\\r\\n\\r\\n    }\\r\\n\\r\\n\\t.uk-flex{\\r\\n\\t\\tgap: 10px;\\r\\n    }\\r\\n    .uk-card{\\r\\n        cursor: pointer;\\r\\n    }\\r\\n    /* .uk-card:hover{\\r\\n        animation: both 3s float infinite;\\r\\n    } */\\r\\n\\r\\n    @keyframes float {\\r\\n\\t0% {\\r\\n\\t\\tbox-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);\\r\\n\\t\\ttransform: translatey(0px) scale(1);\\r\\n\\t}\\r\\n\\t50% {\\r\\n\\t\\tbox-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);\\r\\n\\t\\ttransform: translatey(-5px) scale(1.01);\\r\\n\\r\\n\\t}\\r\\n\\t100% {\\r\\n\\t\\tbox-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);\\r\\n\\t\\ttransform: translatey(0px) scale(1);\\r\\n\\t}\\r\\n}\\r\\n\\r\\n    .uk-container:has(.ms-frame:hover) .ms-frame:not(:hover) {\\r\\n        filter: blur(5px);\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAwFI,eAAE,CACE,eAAe,CAAE,IAAI,CACrB,MAAM,KAEV,CAYA,WAAW,mBAAM,CACpB,EAAG,CACF,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC1C,SAAS,CAAE,WAAW,GAAG,CAAC,CAAC,MAAM,CAAC,CACnC,CACA,GAAI,CACH,UAAU,CAAE,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC3C,SAAS,CAAE,WAAW,IAAI,CAAC,CAAC,MAAM,IAAI,CAEvC,CACA,IAAK,CACJ,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC1C,SAAS,CAAE,WAAW,GAAG,CAAC,CAAC,MAAM,CAAC,CACnC,CACD"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return ` ${validate_component(Greeting, "Greeting").$$render($$result, {}, {}, {})} <div id="midContainer" class="uk-container justify-center"><br> <div style="max-width: 50rem" class="flex flex-wrap gap-4 justify-center"><a href="/wallet" class="svelte-sjagqx"><div>${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "py-7 px-5 w-80 h-80",
      shadow: true
    },
    {},
    {
      default: () => {
        return `<p data-svelte-h="svelte-ygbwev">Wallet</p> <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#434343"><path d="M240-160q-66 0-113-47T80-320v-320q0-66 47-113t113-47h480q66 0 113 47t47 113v320q0 66-47 113t-113 47H240Zm0-470h480q29 0 54.5 9t45.5 26v-45q0-42-29-71t-71-29H240q-42 0-71 29t-29 71v45q20-17 45.5-26t54.5-9Zm-97 136 477 115q7 2 14.5.5T647-385l160-134q-13-23-36-37t-51-14H240q-35 0-62 21.5T143-494Z"></path></svg>`;
      }
    }
  )}</div></a> <a href="/docs" class="svelte-sjagqx"><div>${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "py-7 px-5 w-80 h-80",
      shadow: true
    },
    {},
    {
      default: () => {
        return `<p data-svelte-h="svelte-1yz368x">Docs</p> <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#434343"><path d="M319-250h322v-60H319v60Zm0-170h322v-60H319v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"></path></svg>`;
      }
    }
  )}</div></a> <a href="/application" class="svelte-sjagqx"><div>${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "py-7 px-5 w-80 h-80",
      shadow: true
    },
    {},
    {
      default: () => {
        return `<p data-svelte-h="svelte-vmbltq">Application</p> <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#434343"><path d="M180-120q-24.75 0-42.37-17.63Q120-155.25 120-180v-600q0-24.75 17.63-42.38Q155.25-840 180-840h205q5-35 32-57.5t63-22.5q36 0 63 22.5t32 57.5h205q24.75 0 42.38 17.62Q840-804.75 840-780v600q0 24.75-17.62 42.37Q804.75-120 780-120H180Zm0-60h600v-600H180v600Zm100-100h273v-60H280v60Zm0-170h400v-60H280v60Zm0-170h400v-60H280v60Zm200-177q14 0 24.5-10.5T515-832q0-14-10.5-24.5T480-867q-14 0-24.5 10.5T445-832q0 14 10.5 24.5T480-797ZM180-180v-600 600Z"></path></svg>`;
      }
    }
  )}</div></a> <a href="/transactionBuilder" class="svelte-sjagqx"><div>${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "py-7 px-5 w-80 h-80",
      shadow: true
    },
    {},
    {
      default: () => {
        return `<p data-svelte-h="svelte-17qw8vy">Stellar Lab 2.0</p>`;
      }
    }
  )}</div></a></div> </div>`;
});
export {
  Page as default
};
