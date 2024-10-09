import { c as create_ssr_component, h as compute_rest_props, p as getContext, i as spread, j as escape_attribute_value, k as escape_object, a as add_attribute, g as escape, b as subscribe, v as validate_component, u as set_store_value } from "../../../chunks/ssr.js";
import { T as Tabs, a as TabItem, C as ConnectDisp } from "../../../chunks/ConnectDisp.js";
import { C as Card } from "../../../chunks/index.svelte_svelte_type_style_lang2.js";
import "@stellar/stellar-sdk";
import "../../../chunks/ArrowUp.svelte_svelte_type_style_lang.js";
import "copy-to-clipboard";
import { d as dataPacket, i as isTestnet, c as connected } from "../../../chunks/wallet-store.js";
import { twMerge } from "tailwind-merge";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "sweetalert2";
import "stellar-sdk";
import { B as Button } from "../../../chunks/Button.js";
import "metastellar-sdk";
async function callMetaStellar(method, params) {
  if (typeof window !== "undefined" && typeof window.ethereum !== void 0) {
    const isFlask = (await window.ethereum?.request({ method: "web3_clientVersion" }))?.includes("flask");
    if (!isFlask) {
      alert("install Metamask Flask");
    }
    if (method === "connect") {
      return await window.ethereum.request({
        method: "wallet_requestSnaps",
        params: {
          ["npm:stellar-snap"]: {}
        }
      });
    }
    const rpcPacket = {
      method: "wallet_invokeSnap",
      params: {
        snapId: "npm:stellar-snap",
        request: { "method": method, params }
      }
    };
    return await window.ethereum.request(rpcPacket);
  }
}
const FileCopyAltOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "withEvents", "title", "strokeWidth", "desc", "ariaLabel"]);
  const ctx = getContext("iconCtx") ?? {};
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };
  let { size = ctx.size || "md" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { color = ctx.color || "currentColor" } = $$props;
  let { withEvents = ctx.withEvents || false } = $$props;
  let { title = {} } = $$props;
  let { strokeWidth = ctx.strokeWidth || "2" } = $$props;
  let { desc = {} } = $$props;
  let ariaDescribedby = `${title.id || ""} ${desc.id || ""}`;
  let hasDescription = false;
  let { ariaLabel = "file copy alt outline" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.withEvents === void 0 && $$bindings.withEvents && withEvents !== void 0)
    $$bindings.withEvents(withEvents);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.desc === void 0 && $$bindings.desc && desc !== void 0)
    $$bindings.desc(desc);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  {
    if (title.id || desc.id) {
      hasDescription = true;
    } else {
      hasDescription = false;
    }
  }
  return `${withEvents ? `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { color: escape_attribute_value(color) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size ?? "md"], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
      },
      { viewBox: "0 0 24 24" }
    ],
    {}
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M14 4v3a1 1 0 0 1-1 1h-3m4 10v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2m11-3v10a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7.87a1 1 0 0 1 .24-.65l2.46-2.87a1 1 0 0 1 .76-.35H18a1 1 0 0 1 1 1Z"></path></svg>` : `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { color: escape_attribute_value(color) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size ?? "md"], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
      },
      { viewBox: "0 0 24 24" }
    ],
    {}
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M14 4v3a1 1 0 0 1-1 1h-3m4 10v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2m11-3v10a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7.87a1 1 0 0 1 .24-.65l2.46-2.87a1 1 0 0 1 .76-.35H18a1 1 0 0 1 1 1Z"></path></svg>`} `;
});
const NftView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_dataPacket;
  let $$unsubscribe_isTestnet;
  $$unsubscribe_dataPacket = subscribe(dataPacket, (value) => value);
  $$unsubscribe_isTestnet = subscribe(isTestnet, (value) => value);
  let assets;
  let itemCode = "";
  let itemName = "";
  let nftIssuer = "";
  $$unsubscribe_dataPacket();
  $$unsubscribe_isTestnet();
  return `${validate_component(Card, "Card").$$render($$result, { class: "py-7 px-5 ", shadow: true }, {}, {
    default: () => {
      return `<h3 class="mb-4 font-bold text-2xl" data-svelte-h="svelte-1vqvk5k">NFT</h3> ${validate_component(Tabs, "Tabs").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(TabItem, "TabItem").$$render($$result, { open: true, title: "List" }, {}, {
            default: () => {
              return `${`<div><div${add_attribute("class", `${assets?.length > 0}`, 0)}>${`<p class="py-2 text-center w-full" data-svelte-h="svelte-1snb0aj">No NFTs yet</p>`}</div></div>`}`;
            }
          })} ${validate_component(TabItem, "TabItem").$$render($$result, { title: "Mint" }, {}, {
            default: () => {
              return `<div class="flex flex-col gap-4"><div><input type="text" placeholder="NFT Code" class="w-full p-2 h-[48px] border border-slate-200 rounded-lg"${add_attribute("value", itemCode, 0)}></div> <div><input type="text" placeholder="NFT Issuer" disabled class="w-full p-2 h-[48px] border border-slate-200 rounded-lg"${add_attribute("value", nftIssuer, 0)}></div> <div><input type="text" placeholder="NFT Name" class="w-full p-2 h-[48px] border border-slate-200 rounded-lg"${add_attribute("value", itemName, 0)}></div> <div><textarea placeholder="NFT Description" class="w-full p-2 border border-slate-200 rounded-lg">${escape("")}</textarea></div> <div><label for="avatar" data-svelte-h="svelte-ch4t1r">picture:</label> <input accept="image/png, image/jpeg" id="avatar" name="avatar" type="file"></div> ${`${validate_component(Button, "Button").$$render(
                $$result,
                {
                  disabled: true,
                  color: "blue",
                  class: "py-3"
                },
                {},
                {
                  default: () => {
                    return `Mint`;
                  }
                }
              )}`}</div>`;
            }
          })}`;
        }
      })}`;
    }
  })}`;
});
const SendXml = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let sendToAddress = "";
  let sendAmount;
  return `${validate_component(Card, "Card").$$render($$result, { class: "py-7 px-5 ", shadow: true }, {}, {
    default: () => {
      return `<h3 class="mb-4 font-bold text-2xl" data-svelte-h="svelte-vgyknt">Send XLM</h3> <div class="p-5 bg-gray-50 flex flex-col gap-5"><div><input type="text" class="w-full p-3 h-[48px] border border-slate-200 rounded-lg" placeholder="Destination"${add_attribute("value", sendToAddress, 0)}></div> <div><input type="number" class="w-full p-3 h-[48px] border border-slate-200 rounded-lg" placeholder="Amount"${add_attribute("value", sendAmount, 0)}></div> <div>${`${validate_component(Button, "Button").$$render(
        $$result,
        {
          class: "py-3 text-center w-full bg-blue-700 rounded-lg capitalize text-white hover:bg-blue-800",
          disabled: true
        },
        {},
        {
          default: () => {
            return `Send`;
          }
        }
      )}`}</div></div>`;
    }
  })}`;
});
const Token = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_dataPacket;
  $$unsubscribe_dataPacket = subscribe(dataPacket, (value) => value);
  let tokenIssuer = "";
  let tokenCode = "";
  $$unsubscribe_dataPacket();
  return `${validate_component(Card, "Card").$$render($$result, { class: "py-7 px-5 ", shadow: true }, {}, {
    default: () => {
      return `<div class="flex justify-between" data-svelte-h="svelte-d3tkzk"><h3 class="mb-4 text-center font-bold text-2xl">Token</h3></div> ${validate_component(Tabs, "Tabs").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(TabItem, "TabItem").$$render($$result, { open: true, title: "List" }, {}, {
            default: () => {
              return `${`<div class="grid">${`<div class="py-2 text-center" data-svelte-h="svelte-n3ks1g">No token yet</div>`}</div>`}`;
            }
          })} ${validate_component(TabItem, "TabItem").$$render($$result, { title: "Add assets" }, {}, {
            default: () => {
              return `<div class="flex flex-col gap-5"><div><input type="text" placeholder="code" class="w-full p-2 h-[48px] border border-slate-200 rounded-lg"${add_attribute("value", tokenCode, 0)}></div> <div><input type="text" placeholder="issuer" class="w-full p-2 h-[48px] border border-slate-200 rounded-lg"${add_attribute("value", tokenIssuer, 0)}></div> <div>${`${validate_component(Button, "Button").$$render(
                $$result,
                {
                  type: "button",
                  color: "blue",
                  disabled: true
                },
                {},
                {
                  default: () => {
                    return `Confirm`;
                  }
                }
              )}`}</div></div>`;
            }
          })} `;
        }
      })}`;
    }
  })}`;
});
const AirDrop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Card, "Card").$$render($$result, { class: "py-4", shadow: true }, {}, {
    default: () => {
      return `<h3 class="mb-4 font-bold text-2xl" data-svelte-h="svelte-dn27mt">AirDrop</h3> <div>${`<p class="py-4 text-center bg-gray-50" data-svelte-h="svelte-195eeor">No Airdrop yet</p>`}</div>`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $dataPacket, $$unsubscribe_dataPacket;
  let $connected, $$unsubscribe_connected;
  let $isTestnet, $$unsubscribe_isTestnet;
  $$unsubscribe_dataPacket = subscribe(dataPacket, (value) => $dataPacket = value);
  $$unsubscribe_connected = subscribe(connected, (value) => $connected = value);
  $$unsubscribe_isTestnet = subscribe(isTestnet, (value) => $isTestnet = value);
  let { currentView = "sendXLM" } = $$props;
  if ($dataPacket.testnetXLMBalance === "0") {
    callMetaStellar("fund", { testnet: true }).then(() => {
      callMetaStellar("getDataPacket", {}).then((dp) => {
        set_store_value(dataPacket, $dataPacket = dp, $dataPacket);
      });
    });
  }
  if ($$props.currentView === void 0 && $$bindings.currentView && currentView !== void 0)
    $$bindings.currentView(currentView);
  $$unsubscribe_dataPacket();
  $$unsubscribe_connected();
  $$unsubscribe_isTestnet();
  return `${$connected ? `<div><div id="midContainer" class="uk-container">${validate_component(Card, "Card").$$render($$result, { class: " mt-6 py-7 ", shadow: true }, {}, {
    default: () => {
      return `<div data-svelte-h="svelte-fmvrqk"></div> <div class=""> <p class="text-center text-4xl">${escape($isTestnet ? $dataPacket.testnetXLMBalance : $dataPacket?.mainnetXLMBalance)} XLM</p> <h3 class="my-2 font-bold text-2xl text-center " data-svelte-h="svelte-ek82cc">Balance</h3></div> <div class="mt-2"><div class="text-center flex justify-center gap-2 px-4"><p class="max-w-[90%] truncate">${escape($dataPacket.currentAddress)}</p> <p class="copy-address inline-block flex items-center">${validate_component(FileCopyAltOutline, "FileCopyAltOutline").$$render($$result, {}, {}, {})}</p></div> <h3 class="mt-4 font-bold text-2xl text-center " data-svelte-h="svelte-br14k1">Address</h3></div>`;
    }
  })} <div class="grid md:grid-cols-4 sm:grid-cols-2 mt-2 gap-3"><button>${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "py-4 lg:px-12 min-h-[80px] justify-center",
      shadow: true
    },
    {},
    {
      default: () => {
        return `<span data-svelte-h="svelte-12rv2l7">Send XLM</span>`;
      }
    }
  )}</button> <button>${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "py-4 lg:px-12 min-h-[80px] justify-center",
      shadow: true
    },
    {},
    {
      default: () => {
        return `NFT`;
      }
    }
  )}</button> <button>${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "py-4 lg:px-12  min-h-[80px] justify-center",
      shadow: true
    },
    {},
    {
      default: () => {
        return `Token`;
      }
    }
  )}</button> <button>${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "py-4 lg:px-12  min-h-[80px] justify-center",
      shadow: true
    },
    {},
    {
      default: () => {
        return `AirDrop`;
      }
    }
  )}</button></div> <div class="mt-2">${currentView == "sendXLM" ? `${validate_component(SendXml, "SendXML").$$render($$result, {}, {}, {})}` : `${currentView == "viewNFT" ? `${validate_component(NftView, "NftView").$$render($$result, {}, {}, {})}` : `${currentView == "token" ? `${validate_component(Token, "Token").$$render($$result, {}, {}, {})}` : `${currentView == "airDrop" ? `${validate_component(AirDrop, "AirDrop").$$render($$result, {}, {}, {})}` : ``}`}`}`}</div></div></div>` : ``} ${!$connected ? `${validate_component(ConnectDisp, "ConnectDisp").$$render($$result, {}, {}, {})}` : ``}`;
});
export {
  Page as default
};
