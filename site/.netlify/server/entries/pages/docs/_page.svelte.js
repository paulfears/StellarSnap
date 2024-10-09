import { c as create_ssr_component, v as validate_component, g as escape, b as subscribe } from "../../../chunks/ssr.js";
import { i as isTestnet, d as dataPacket } from "../../../chunks/wallet-store.js";
import { E as Editor, J as JSEditor } from "../../../chunks/JSEditor.js";
import { C as Card } from "../../../chunks/index.svelte_svelte_type_style_lang2.js";
import "@stellar/stellar-sdk";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "sweetalert2";
import { B as Button } from "../../../chunks/Button.js";
import { P } from "../../../chunks/P.js";
import "copy-to-clipboard";
const css = {
  code: ".code.svelte-nwgdyd{border:0.5px solid black;padding:10px;border-radius:5px}",
  map: `{"version":3,"file":"TypescriptContainer.svelte","sources":["TypescriptContainer.svelte"],"sourcesContent":["<script lang='ts'>import { Card } from \\"@metastellar/ui-library\\";\\nimport { Toast } from \\"$lib/utils/index.ts\\";\\nimport { Button, P } from \\"flowbite-svelte\\";\\nimport copy from \\"copy-to-clipboard\\";\\nimport Editor from \\"../Editor/Editor.svelte\\";\\nexport let code;\\nexport let keywords = [];\\nexport let title = \\"\\";\\nexport let desc = \\"\\";\\nexport let toastText = \\"Code Copied\\";\\nfunction copyCode() {\\n  copy(code);\\n  Toast({ type: \\"success\\", desc: \\"code copied\\" });\\n}\\n<\/script>\\r\\n<br/>\\r\\n<div class=\\"uk-container justify-center\\">\\r\\n<Card class=\\"code-outer\\" shadow>\\r\\n    <P size=\\"2xl\\">{title}</P>\\r\\n    <div class=\\"code\\" >\\r\\n        <Editor width={\\"100%\\"} height={\\"40rem\\"} readOnly={true} bind:value={code} typescript={true}/>\\r\\n    </div>\\r\\n    <br/>\\r\\n    <div style=\\"display:flex;\\">\\r\\n    \\r\\n    <Button on:click={copyCode} color=\\"light\\">\\r\\n        <svg xmlns=\\"http://www.w3.org/2000/svg\\" height=\\"24px\\" viewBox=\\"0 -960 960 960\\" width=\\"24px\\" fill=\\"#5f6368\\"><path d=\\"M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z\\"/></svg>\\r\\n    </Button>\\r\\n    <div style=\\"margin-left:5px;\\">{@html desc}</div>\\r\\n    </div>\\r\\n</Card>\\r\\n</div>\\r\\n<style>\\r\\n    .code{\\r\\n        border:0.5px solid black; \\r\\n        padding:10px; \\r\\n        border-radius: 5px; \\r\\n        \\r\\n    }\\r\\n    .code-outer{\\r\\n        padding: 10px;\\r\\n        border-radius: 5px;\\r\\n        \\r\\n        border: 0.5px solid black;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n"],"names":[],"mappings":"AAiCI,mBAAK,CACD,OAAO,KAAK,CAAC,KAAK,CAAC,KAAK,CACxB,QAAQ,IAAI,CACZ,aAAa,CAAE,GAEnB"}`
};
const TypescriptContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { code } = $$props;
  let { keywords = [] } = $$props;
  let { title = "" } = $$props;
  let { desc = "" } = $$props;
  let { toastText = "Code Copied" } = $$props;
  if ($$props.code === void 0 && $$bindings.code && code !== void 0)
    $$bindings.code(code);
  if ($$props.keywords === void 0 && $$bindings.keywords && keywords !== void 0)
    $$bindings.keywords(keywords);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.desc === void 0 && $$bindings.desc && desc !== void 0)
    $$bindings.desc(desc);
  if ($$props.toastText === void 0 && $$bindings.toastText && toastText !== void 0)
    $$bindings.toastText(toastText);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<br> <div class="uk-container justify-center">${validate_component(Card, "Card").$$render($$result, { class: "code-outer", shadow: true }, {}, {
      default: () => {
        return `${validate_component(P, "P").$$render($$result, { size: "2xl" }, {}, {
          default: () => {
            return `${escape(title)}`;
          }
        })} <div class="code svelte-nwgdyd">${validate_component(Editor, "Editor").$$render(
          $$result,
          {
            width: "100%",
            height: "40rem",
            readOnly: true,
            typescript: true,
            value: code
          },
          {
            value: ($$value) => {
              code = $$value;
              $$settled = false;
            }
          },
          {}
        )}</div> <br> <div style="display:flex;">${validate_component(Button, "Button").$$render($$result, { color: "light" }, {}, {
          default: () => {
            return `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"></path></svg>`;
          }
        })} <div style="margin-left:5px;"><!-- HTML_TAG_START -->${desc}<!-- HTML_TAG_END --></div></div>`;
      }
    })} </div>`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isTestnet, $$unsubscribe_isTestnet;
  let $dataPacket, $$unsubscribe_dataPacket;
  $$unsubscribe_isTestnet = subscribe(isTestnet, (value) => $isTestnet = value);
  $$unsubscribe_dataPacket = subscribe(dataPacket, (value) => $dataPacket = value);
  let MetaStellar_String = `

async function callMetaStellar(method, params){
    if (typeof window !== 'undefined' && typeof window.ethereum !== undefined) {
        //You Can Delete this section after offical launch
        const isFlask = ( 
        await window.ethereum?.request({ method: "web3_clientVersion" })
        )?.includes("flask"); 
        if(!isFlask){
        alert("install Metamask Flask")
        }
        // ------------------------------------------------
        try{
            if(method === 'connect'){
            //This will also install stellar if the user has metamask
                return await window.ethereum.request({
                method: 'wallet_requestSnaps',
                params: {
                    ['npm:stellar-snap']: {}
                },
                });
            }
            const rpcPacket = {
                method: 'wallet_invokeSnap',
                params:{
                    snapId:'npm:stellar-snap',
                    request: {'method':method, params:params}
                }
            }
            return await window.ethereum.request(rpcPacket);
        }
        catch(e){
            alert(e.message);
        }
    }
}

    `;
  const callMetastellarDesc = `
    The call Metastellar function is the easiest way to start using stellar on metamask.
    simply copy this function into a utils file, then pass the desired operation and parameters.

    `;
  const ConnectEditorString = `
    let connected = callMetaStellar('connect'); //returns  promise<boolean>
    
    //or use async await
    connected.then(
        (result)=>alert(JSON.stringify(result))
    );
    `;
  const getAddressString = `
    async function getAddress(){
        let address = await callMetaStellar('getAddress'); //returns  promise<String> - currentAddress
        alert(address);
        return address;
    }
    getAddress();
    `;
  const getDataPacketString = `
    async function getDataPacket(){
        let dataPacket = await callMetaStellar('getDataPacket'); //returns  promise<DataPacket>
        alert(JSON.stringify(dataPacket));
        return address;
    }
    getDataPacket();
    `;
  const signTxnString = `
    
        const network = "${$isTestnet ? "testnet" : "mainnet"}";
        const address = "${$dataPacket.currentAddress}";
        async function signTransaction(network, address){
            const passpharase = network === 'testnet'? StellarSdk.Networks.TESTNET : 'Public Global Stellar Network ; September 2015'

            const server = new StellarSdk.Horizon.Server(network === 'testnet'?'https://horizon-testnet.stellar.org':'https://horizon.stellar.org');
            const account = await server.loadAccount(address);
            const txnBuilder = new StellarSdk.TransactionBuilder(account, {fee:StellarSdk.BASE_FEE, networkPassphrase: passpharase});
        
            txnBuilder.addOperation(
                StellarSdk.Operation.manageData({"name":"hello","value":"world"})
            )
            txnBuilder.setTimeout(3600);
            const txnXDR = txnBuilder.build().toXDR()
            const signedTxn = await callMetaStellar('signTransaction', {testnet:${$isTestnet}, transaction:txnXDR});
            alert(JSON.stringify(signedTxn));
            return signedTxn;
        }
        signTransaction(network, address);
    `;
  $$unsubscribe_isTestnet();
  $$unsubscribe_dataPacket();
  return `<div class="uk-container justify-center">${validate_component(Card, "Card").$$render($$result, { shadow: true }, {}, {
    default: () => {
      return `${validate_component(P, "P").$$render($$result, { size: "4xl" }, {}, {
        default: () => {
          return `QuickStart`;
        }
      })}`;
    }
  })}</div> ${validate_component(TypescriptContainer, "TypescriptContainer").$$render(
    $$result,
    {
      code: MetaStellar_String,
      title: "Step1: Copy the callMetaStellarFunction",
      desc: callMetastellarDesc
    },
    {},
    {}
  )} <br> <br>  ${validate_component(JSEditor, "JSEditor").$$render(
    $$result,
    {
      prependCode: MetaStellar_String,
      code: ConnectEditorString,
      title: "Connect - must be run before any other functions!"
    },
    {},
    {
      default: () => {
        return `The Wallet must be connected before any other methods can be called. The wallet will auto-install if it is not already!`;
      }
    }
  )} <br> <br>  ${validate_component(JSEditor, "JsEditor").$$render(
    $$result,
    {
      prependCode: MetaStellar_String,
      code: getAddressString,
      title: "getAddress"
    },
    {},
    {
      default: () => {
        return `The getAddress method returns the address of the currentAccount. The wallet supports multiple accounts, but only one can be connected at a time. this gets the current one.`;
      }
    }
  )} <br> <br>  ${validate_component(JSEditor, "JsEditor").$$render(
    $$result,
    {
      prependCode: MetaStellar_String,
      code: getDataPacketString,
      title: "getDataPacket"
    },
    {},
    {
      default: () => {
        return `Most of the time it is useful to get an overview of a users wallet state. To do this simply call the getDataPacket function. This returns the current Address along with the mainnet and testnet balance a list of assets for the current address and the wallet name and federation address if one exists.`;
      }
    }
  )} <br> <br>  ${validate_component(JSEditor, "JsEditor").$$render(
    $$result,
    {
      prependCode: MetaStellar_String,
      code: signTxnString,
      title: "SignTransaction"
    },
    {},
    {
      default: () => {
        return `Most of the time it is useful to get an overview of a users wallet state. To do this simply call the getDataPacket function. This returns the current Address along with the mainnet and testnet balance a list of assets for the current address and the wallet name and federation address if one exists.`;
      }
    }
  )}`;
});
export {
  Page as default
};
