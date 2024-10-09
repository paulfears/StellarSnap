import { c as create_ssr_component, h as compute_rest_props, v as validate_component, a as add_attribute, i as spread, k as escape_object, r as compute_slots, p as getContext, g as escape, j as escape_attribute_value, e as each, b as subscribe } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/Button.js";
import { twMerge } from "tailwind-merge";
import { F as Frame, L as Label } from "../../../chunks/Label.js";
import { P } from "../../../chunks/P.js";
import "stellar-sdk";
import { i as is_void } from "../../../chunks/names.js";
import { i as isTestnet, d as dataPacket, c as connected } from "../../../chunks/wallet-store.js";
import { C as ConnectDisp, T as Tabs, a as TabItem } from "../../../chunks/ConnectDisp.js";
import { J as JSEditor } from "../../../chunks/JSEditor.js";
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "horizontal", "reverse", "img", "padding", "size", "imgClass"]);
  let { href = void 0 } = $$props;
  let { horizontal = false } = $$props;
  let { reverse = false } = $$props;
  let { img = void 0 } = $$props;
  let { padding = "lg" } = $$props;
  let { size = "sm" } = $$props;
  let { imgClass = "" } = $$props;
  const paddings = {
    none: "",
    xs: "p-2",
    sm: "p-4",
    md: "p-4 sm:p-5",
    lg: "p-4 sm:p-6",
    xl: "p-4 sm:p-8"
  };
  const sizes = {
    none: "",
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-xl",
    lg: "max-w-2xl",
    xl: "max-w-screen-xl"
  };
  let innerPadding;
  let cardClass;
  let imgCls;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.horizontal === void 0 && $$bindings.horizontal && horizontal !== void 0)
    $$bindings.horizontal(horizontal);
  if ($$props.reverse === void 0 && $$bindings.reverse && reverse !== void 0)
    $$bindings.reverse(reverse);
  if ($$props.img === void 0 && $$bindings.img && img !== void 0)
    $$bindings.img(img);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.imgClass === void 0 && $$bindings.imgClass && imgClass !== void 0)
    $$bindings.imgClass(imgClass);
  innerPadding = paddings[padding];
  cardClass = twMerge("flex w-full", sizes[size], reverse ? "flex-col-reverse" : "flex-col", horizontal && (reverse ? "md:flex-row-reverse" : "md:flex-row"), href && "hover:bg-gray-100 dark:hover:bg-gray-700", !img && innerPadding, $$props.class);
  imgCls = twMerge(reverse ? "rounded-b-lg" : "rounded-t-lg", horizontal && "object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none", horizontal && (reverse ? "md:rounded-e-lg" : "md:rounded-s-lg"), imgClass);
  return `${validate_component(Frame, "Frame").$$render($$result, Object.assign({}, { tag: href ? "a" : "div" }, { rounded: true }, { shadow: true }, { border: true }, { href }, $$restProps, { class: cardClass }), {}, {
    default: () => {
      return `${img ? `<img${add_attribute("class", imgCls, 0)}${add_attribute("src", img, 0)} alt=""> <div${add_attribute("class", innerPadding, 0)}>${slots.default ? slots.default({}) : ``}</div>` : `${slots.default ? slots.default({}) : ``}`}`;
    }
  })} `;
});
const Wrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["tag", "show", "use"]);
  let { tag = "div" } = $$props;
  let { show } = $$props;
  let { use = () => {
  } } = $$props;
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  return `${show ? `${((tag$1) => {
    return tag$1 ? `<${tag}${spread([escape_object($$restProps)], {})}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}` : `${slots.default ? slots.default({}) : ``}`} `;
});
function clampSize(s) {
  return s && s === "xs" ? "sm" : s === "xl" ? "lg" : s;
}
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let _size;
  let $$restProps = compute_rest_props($$props, ["type", "value", "size", "defaultClass", "color", "floatClass"]);
  let $$slots = compute_slots(slots);
  let { type = "text" } = $$props;
  let { value = void 0 } = $$props;
  let { size = void 0 } = $$props;
  let { defaultClass = "block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right" } = $$props;
  let { color = "base" } = $$props;
  let { floatClass = "flex absolute inset-y-0 items-center text-gray-500 dark:text-gray-400" } = $$props;
  const borderClasses = {
    base: "border border-gray-300 dark:border-gray-600",
    tinted: "border border-gray-300 dark:border-gray-500",
    green: "border border-green-500 dark:border-green-400",
    red: "border border-red-500 dark:border-red-400"
  };
  const ringClasses = {
    base: "focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500",
    green: "focus:ring-green-500 focus:border-green-500 dark:focus:border-green-500 dark:focus:ring-green-500",
    red: "focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500"
  };
  const colorClasses = {
    base: "bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400",
    tinted: "bg-gray-50 text-gray-900 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400",
    green: "bg-green-50 text-green-900 placeholder-green-700 dark:text-green-400 dark:placeholder-green-500 dark:bg-gray-700",
    red: "bg-red-50 text-red-900 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500 dark:bg-gray-700"
  };
  let background = getContext("background");
  let group = getContext("group");
  const textSizes = {
    sm: "sm:text-xs",
    md: "text-sm",
    lg: "sm:text-base"
  };
  const leftPadding = { sm: "ps-9", md: "ps-10", lg: "ps-11" };
  const rightPadding = { sm: "pe-9", md: "pe-10", lg: "pe-11" };
  const inputPadding = { sm: "p-2", md: "p-2.5", lg: "p-3" };
  let inputClass;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.floatClass === void 0 && $$bindings.floatClass && floatClass !== void 0)
    $$bindings.floatClass(floatClass);
  _size = size || clampSize(group?.size) || "md";
  {
    {
      const _color = color === "base" && background ? "tinted" : color;
      inputClass = twMerge([
        defaultClass,
        inputPadding[_size],
        $$slots.left && leftPadding[_size] || $$slots.right && rightPadding[_size],
        ringClasses[color],
        colorClasses[_color],
        borderClasses[_color],
        textSizes[_size],
        group || "rounded-lg",
        group && "first:rounded-s-lg last:rounded-e-lg",
        group && "[&:not(:first-child)]:-ms-px",
        $$props.class
      ]);
    }
  }
  return `${validate_component(Wrapper, "Wrapper").$$render(
    $$result,
    {
      class: "relative w-full",
      show: $$slots.left || $$slots.right
    },
    {},
    {
      default: () => {
        return `${$$slots.left ? `<div class="${escape(twMerge(floatClass, $$props.classLeft), true) + " start-0 ps-2.5 pointer-events-none"}">${slots.left ? slots.left({}) : ``}</div>` : ``} ${slots.default ? slots.default({
          props: { ...$$restProps, class: inputClass }
        }) : ` <input${spread(
          [
            escape_object($$restProps),
            escape_object({ type }),
            {
              class: escape_attribute_value(inputClass)
            }
          ],
          {}
        )}${add_attribute("value", value, 0)}> `} ${$$slots.right ? `<div class="${escape(twMerge(floatClass, $$props.classRight), true) + " end-0 pe-2.5"}">${slots.right ? slots.right({}) : ``}</div>` : ``}`;
      }
    }
  )} `;
});
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "placeholder", "value"]);
  let $$slots = compute_slots(slots);
  let { size = "lg" } = $$props;
  let { placeholder = "Search" } = $$props;
  let { value = void 0 } = $$props;
  const sizes = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Wrapper, "Wrapper").$$render(
      $$result,
      {
        class: "relative w-full",
        show: $$slots.default
      },
      {},
      {
        default: () => {
          return `${validate_component(Input, "Input").$$render(
            $$result,
            Object.assign({}, { type: "search" }, { placeholder }, { size }, $$restProps, { class: $$props.class }, { value }),
            {
              value: ($$value) => {
                value = $$value;
                $$settled = false;
              }
            },
            {
              left: () => {
                return `<svg slot="left"${add_attribute("class", sizes[size], 0)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>`;
              }
            }
          )}  ${$$slots.default ? `<div class="flex absolute inset-y-0 end-0 items-center text-gray-500 dark:text-gray-400">${slots.default ? slots.default({}) : ``}</div>` : ``}`;
        }
      }
    )} `;
  } while (!$$settled);
  return $$rendered;
});
const common = "block w-full";
const Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "items",
    "value",
    "placeholder",
    "underline",
    "size",
    "defaultClass",
    "underlineClass"
  ]);
  let { items = [] } = $$props;
  let { value = "" } = $$props;
  let { placeholder = "Choose option ..." } = $$props;
  let { underline = false } = $$props;
  let { size = "md" } = $$props;
  let { defaultClass = "text-gray-900 disabled:text-gray-400 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:disabled:text-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500" } = $$props;
  let { underlineClass = "text-gray-500 disabled:text-gray-400 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:disabled:text-gray-500 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" } = $$props;
  const sizes = {
    sm: "text-sm p-2",
    md: "text-sm p-2.5",
    lg: "text-base py-3 px-4"
  };
  let selectClass;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.underline === void 0 && $$bindings.underline && underline !== void 0)
    $$bindings.underline(underline);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  if ($$props.underlineClass === void 0 && $$bindings.underlineClass && underlineClass !== void 0)
    $$bindings.underlineClass(underlineClass);
  selectClass = twMerge(common, underline ? underlineClass : defaultClass, sizes[size], underline && "!px-0", $$props.class);
  return `<select${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(selectClass)
      }
    ],
    {}
  )}>${placeholder ? `<option disabled ${(value === void 0 ? true : void 0) ? "selected" : ""} value="">${escape(placeholder)}</option>` : ``}${items.length ? each(items, ({ value: itemValue, name }) => {
    return `<option${add_attribute("value", itemValue, 0)} ${(itemValue === value ? true : void 0) ? "selected" : ""}>${escape(name)}</option>`;
  }) : `${slots.default ? slots.default({}) : ``}`}</select> `;
});
const Hr = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["icon", "divClass", "hrClass", "iconDivClass", "textSpanClass", "innerDivClass"]);
  let $$slots = compute_slots(slots);
  let { icon = false } = $$props;
  let { divClass = "inline-flex items-center justify-center w-full" } = $$props;
  let { hrClass = "h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" } = $$props;
  let { iconDivClass = "absolute start-1/2 px-4 bg-white -translate-x-1/2 rtl:translate-x-1/2 " } = $$props;
  let { textSpanClass = "absolute px-3 font-medium text-gray-900 -translate-x-1/2 rtl:translate-x-1/2 bg-white start-1/2 dark:text-white dark:bg-gray-900 " } = $$props;
  let { innerDivClass = "absolute px-4 -translate-x-1/2 rtl:translate-x-1/2 bg-white start-1/2 dark:bg-gray-900" } = $$props;
  let horizontalCls = twMerge(hrClass, $$props.classHr);
  let divCls = twMerge(divClass, $$slots && "relative", $$props.classDiv);
  let innerDivCls = twMerge(innerDivClass, icon ? iconDivClass : textSpanClass, $$props.classInnerDiv);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0)
    $$bindings.divClass(divClass);
  if ($$props.hrClass === void 0 && $$bindings.hrClass && hrClass !== void 0)
    $$bindings.hrClass(hrClass);
  if ($$props.iconDivClass === void 0 && $$bindings.iconDivClass && iconDivClass !== void 0)
    $$bindings.iconDivClass(iconDivClass);
  if ($$props.textSpanClass === void 0 && $$bindings.textSpanClass && textSpanClass !== void 0)
    $$bindings.textSpanClass(textSpanClass);
  if ($$props.innerDivClass === void 0 && $$bindings.innerDivClass && innerDivClass !== void 0)
    $$bindings.innerDivClass(innerDivClass);
  return `${$$slots.default ? `<div${spread([escape_object($$restProps), { class: escape_attribute_value(divCls) }], {})}><hr${add_attribute("class", horizontalCls, 0)}> <div${add_attribute("class", innerDivCls, 0)}>${slots.default ? slots.default({}) : ``}</div></div>` : `<hr${add_attribute("class", horizontalCls, 0)}>`} `;
});
const OperationParams$1 = {
  "": {
    type: "",
    params: {}
  },
  "createAccount": {
    type: "createAccount",
    params: {
      destination: "string:address",
      startingBalance: "number"
    }
  },
  "payment": {
    type: "payment",
    params: {
      destination: "string:address",
      asset: "asset",
      amount: "number"
    }
  },
  "pathPaymentStrictReceive": {
    type: "pathPaymentStrictReceive",
    params: {
      sendAsset: "asset",
      sendMax: "number",
      destination: "string:address",
      destAsset: "asset",
      destAmount: "number",
      path: "array:asset"
    }
  },
  "pathPaymentStrictSend": {
    type: "pathPaymentStrictSend",
    params: {
      sendAsset: "asset",
      sendAmount: "number",
      destination: "string:address",
      destAsset: "asset",
      destMin: "number",
      path: "array:asset"
    }
  },
  "changeTrust": {
    type: "changeTrust",
    params: {
      asset: "asset",
      limit: "number"
    }
  },
  "allowTrust": {
    type: "allowTrust",
    params: {
      trustor: "string:address",
      assetCode: "string:assetCode",
      authorize: "enum:0|1|2"
    }
  },
  "setOptions": {
    type: "setOptions",
    params: {
      inflationDest: "optional:string:address",
      clearFlags: "number",
      setFlags: "number",
      masterWeight: "number",
      lowThreshold: "number",
      medThreshold: "number",
      highThreshold: "number",
      signer: "signer"
    }
  },
  // the next  intentionally falls through!
  "manageOffer": {
    type: "manageOffer",
    params: {
      selling: "asset",
      buying: "asset",
      amount: "number",
      price: "price",
      offerId: "number:offerId"
    }
  },
  "manageSellOffer": {
    type: "manageSellOffer",
    params: {
      selling: "asset",
      buying: "asset",
      amount: "number",
      price: "price",
      offerId: "optional:number:offerId"
    }
  },
  "manageBuyOffer": {
    type: "manageBuyOffer",
    params: {
      selling: "asset",
      buying: "asset",
      buyAmount: "number",
      price: "price",
      offerId: "optional:number:offerId"
    }
  },
  "createPassiveOffer": {
    type: "createPassiveOffer",
    params: {
      selling: "asset",
      buying: "asset",
      amount: "number",
      price: "price"
    }
  },
  "createPassiveSellOffer": {
    type: "createPassiveSellOffer",
    params: {
      selling: "asset",
      buying: "asset",
      amount: "number",
      price: "price"
    }
  },
  "accountMerge": {
    type: "accountMerge",
    params: {
      destination: "string:address"
    }
  },
  "manageData": {
    type: "manageData",
    params: {
      name: "string",
      value: "string"
    }
  },
  "inflation": {
    type: "inflation",
    params: {}
  },
  "bumpSequence": {
    type: "bumpSequence",
    params: {
      bumpTo: "number"
    }
  },
  "createClaimableBalance": {
    type: "createClaimableBalance",
    params: {
      asset: "asset",
      amount: "number",
      claimants: "array:claimant"
    }
  },
  "claimClaimableBalance": {
    type: "claimClaimableBalance",
    params: {
      balanceId: "string:balanceId"
    }
  },
  "beginSponsoringFutureReserves": {
    type: "beginSponsoringFutureReserves",
    params: {
      sponsoredId: "string"
    }
  },
  "endSponsoringFutureReserves": {
    type: "endSponsoringFutureReserves",
    params: {}
  },
  "revokeSponsorship": {
    type: "revokeSponsorship",
    params: {}
  },
  "revokeAccountSponsorship": {
    type: "revokeAccountSponsorship",
    params: {
      account: "string:accountId"
    }
  },
  "revokeTrustlineSponsorship": {
    type: "revokeTrustlineSponsorship",
    params: {
      account: "string:accountId",
      asset: "asset"
    }
  },
  "revokeOfferSponsorship": {
    type: "revokeOfferSponsorship",
    params: {
      seller: "string:accountId",
      offerId: "number:offerId"
    }
  },
  "revokeDataSponsorship": {
    type: "revokeDataSponsorship",
    params: {
      account: "string:accountId",
      name: "string"
    }
  },
  "revokeClaimableBalanceSponsorship": {
    type: "revokeClaimableBalanceSponsorship",
    params: {
      balanceId: "string:balanceId"
    }
  },
  "revokeLiquidityPoolSponsorship": {
    type: "revokeLiquidityPoolSponsorship",
    params: {
      liquidityPoolId: "string:liquidityPoolId"
    }
  },
  "revokeSignerSponsorship": {
    type: "revokeSignerSponsorship",
    params: {
      account: "string:accountId",
      signer: "signer"
    }
  },
  "clawback": {
    type: "clawback",
    params: {
      amount: "number",
      from: "string:address",
      asset: "asset"
    }
  },
  "clawbackClaimableBalance": {
    type: "clawbackClaimableBalance",
    params: {
      balanceId: "string:balanceId"
    }
  },
  "setTrustLineFlags": {
    type: "setTrustLineFlags",
    params: {
      asset: "asset",
      trustor: "string:address",
      flags: "trustLineFlags"
    }
  },
  "liquidityPoolDeposit": {
    type: "liquidityPoolDeposit",
    params: {
      liquidityPoolId: "string:liquidityPoolId",
      maxAmountA: "number",
      maxAmountB: "number",
      minPrice: "price",
      maxPrice: "price"
    }
  },
  "liquidityPoolWithdraw": {
    type: "liquidityPoolWithdraw",
    params: {
      liquidityPoolId: "string:liquidityPoolId",
      amount: "number",
      minAmountA: "number",
      minAmountB: "number"
    }
  }
};
const stellarImage = "https://upload.wikimedia.org/wikipedia/commons/5/56/Stellar_Symbol.png";
const AssetSelect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { ownedAssets = [] } = $$props;
  let { selectedAsset } = $$props;
  let { network = "mainnet" } = $$props;
  let currentSearch = "";
  const xlm_display = {
    image: stellarImage,
    asset: void 0,
    code: "XLM",
    domain: "stellar.org",
    score: 10
  };
  [...ownedAssets, xlm_display];
  if ($$props.ownedAssets === void 0 && $$bindings.ownedAssets && ownedAssets !== void 0)
    $$bindings.ownedAssets(ownedAssets);
  if ($$props.selectedAsset === void 0 && $$bindings.selectedAsset && selectedAsset !== void 0)
    $$bindings.selectedAsset(selectedAsset);
  if ($$props.network === void 0 && $$bindings.network && network !== void 0)
    $$bindings.network(network);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex"><div style="flex:1;">${validate_component(Search, "Search").$$render(
      $$result,
      { value: currentSearch },
      {
        value: ($$value) => {
          currentSearch = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> ${``}</div> ${``}`;
  } while (!$$settled);
  return $$rendered;
});
const OperationForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { operationType = "" } = $$props;
  let { network = "mainnet" } = $$props;
  console.log("operation type: ");
  console.log(operationType);
  let { operation = { type: operationType, params: {} } } = $$props;
  let operationParams = OperationParams$1[operationType];
  if ($$props.operationType === void 0 && $$bindings.operationType && operationType !== void 0)
    $$bindings.operationType(operationType);
  if ($$props.network === void 0 && $$bindings.network && network !== void 0)
    $$bindings.network(network);
  if ($$props.operation === void 0 && $$bindings.operation && operation !== void 0)
    $$bindings.operation(operation);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="container" style="text-align:left;">${each(Object.entries(operationParams.params), ([field, value]) => {
      return `${validate_component(Label, "Label").$$render($$result, { for: "first_name", class: "mb-2" }, {}, {
        default: () => {
          return `${escape(field)}${value.startsWith("optional:") ? ` *optional` : ``}`;
        }
      })} ${value.startsWith("optional:") ? `${value.startsWith("optional:string") ? `${validate_component(Input, "Input").$$render(
        $$result,
        {
          type: "text",
          placeholder: field,
          value: operation.params[field]
        },
        {
          value: ($$value) => {
            operation.params[field] = $$value;
            $$settled = false;
          }
        },
        {}
      )}` : ``} ${value.startsWith("optional:offerId") ? `${validate_component(Input, "Input").$$render(
        $$result,
        {
          type: "number",
          placeholder: field,
          value: operation.params[field]
        },
        {
          value: ($$value) => {
            operation.params[field] = $$value;
            $$settled = false;
          }
        },
        {}
      )}` : ``}` : ``} ${value.startsWith("string:") ? `${validate_component(Input, "Input").$$render(
        $$result,
        {
          type: "text",
          placeholder: field,
          value: operation.params[field]
        },
        {
          value: ($$value) => {
            operation.params[field] = $$value;
            $$settled = false;
          }
        },
        {}
      )}` : `${value === "string" ? `${validate_component(Input, "Input").$$render(
        $$result,
        {
          type: "text",
          placeholder: field,
          value: operation.params[field]
        },
        {
          value: ($$value) => {
            operation.params[field] = $$value;
            $$settled = false;
          }
        },
        {}
      )}` : `${value === "number" ? `${validate_component(Input, "Input").$$render(
        $$result,
        {
          type: "number",
          placeholder: field,
          value: operation.params[field]
        },
        {
          value: ($$value) => {
            operation.params[field] = $$value;
            $$settled = false;
          }
        },
        {}
      )}` : `${value === "asset" ? `${validate_component(AssetSelect, "AssetSelect").$$render(
        $$result,
        {
          network,
          selectedAsset: operation.params[field]
        },
        {
          selectedAsset: ($$value) => {
            operation.params[field] = $$value;
            $$settled = false;
          }
        },
        {}
      )}` : `${value === "enum:0|1|2" ? `<select><option${add_attribute("value", 0, 0)} data-svelte-h="svelte-2k0dyc">0</option><option${add_attribute("value", 1, 0)} data-svelte-h="svelte-vpatae">1</option><option${add_attribute("value", 2, 0)} data-svelte-h="svelte-jxp9q0">2</option></select>` : `${value === "price" ? `${validate_component(Input, "Input").$$render(
        $$result,
        {
          type: "number",
          placeholder: field,
          value: operation.params[field]
        },
        {
          value: ($$value) => {
            operation.params[field] = $$value;
            $$settled = false;
          }
        },
        {}
      )}` : ``}`}`}`}`}`} <br>`;
    })}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const TransactionMaker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { network = "mainnet" } = $$props;
  let { address } = $$props;
  let { callback } = $$props;
  let options = [];
  for (let op of Object.keys(OperationParams$1)) {
    options.push({ value: op, name: op });
  }
  let { operations = [{ type: "", params: {} }] } = $$props;
  if ($$props.network === void 0 && $$bindings.network && network !== void 0)
    $$bindings.network(network);
  if ($$props.address === void 0 && $$bindings.address && address !== void 0)
    $$bindings.address(address);
  if ($$props.callback === void 0 && $$bindings.callback && callback !== void 0)
    $$bindings.callback(callback);
  if ($$props.operations === void 0 && $$bindings.operations && operations !== void 0)
    $$bindings.operations(operations);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="uk-container justify-center">${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(P, "P").$$render($$result, { size: "2xl" }, {}, {
          default: () => {
            return `operations`;
          }
        })} ${each(operations, (operation, i) => {
          return `${validate_component(Card, "Card").$$render($$result, {}, {}, {
            default: () => {
              return `<div class="flex">${validate_component(Select, "Select").$$render(
                $$result,
                {
                  placeholder: "Operation Type",
                  items: options,
                  value: operations[i]["type"]
                },
                {
                  value: ($$value) => {
                    operations[i]["type"] = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}</div> ${validate_component(Hr, "Hr").$$render($$result, {}, {}, {})} ${validate_component(OperationForm, "OperationForm").$$render(
                $$result,
                {
                  network,
                  operationType: operations[i].type,
                  operation: operations[i]
                },
                {
                  operation: ($$value) => {
                    operations[i] = $$value;
                    $$settled = false;
                  }
                },
                {}
              )} <div style="display:flex; justify-content:left; gap:10px;">${validate_component(Button, "Button").$$render($$result, { color: "light", size: "xs" }, {}, {
                default: () => {
                  return `Insert additional Operation`;
                }
              })} ${i !== 0 ? `${validate_component(Button, "Button").$$render($$result, { color: "light", size: "xs" }, {}, {
                default: () => {
                  return `remove`;
                }
              })}` : ``}</div> `;
            }
          })}`;
        })} <br> ${validate_component(Button, "Button").$$render($$result, { color: "light" }, {}, {
          default: () => {
            return `Generate`;
          }
        })}`;
      }
    })} </div>`;
  } while (!$$settled);
  return $$rendered;
});
const OperationParams = {
  "": {
    type: "",
    params: {}
  },
  "createAccount": {
    type: "createAccount",
    params: {
      destination: "string:address",
      startingBalance: "number"
    }
  },
  "payment": {
    type: "payment",
    params: {
      destination: "string:address",
      asset: "asset",
      amount: "number"
    }
  },
  "pathPaymentStrictReceive": {
    type: "pathPaymentStrictReceive",
    params: {
      sendAsset: "asset",
      sendMax: "number",
      destination: "string:address",
      destAsset: "asset",
      destAmount: "number",
      path: "array:asset"
    }
  },
  "pathPaymentStrictSend": {
    type: "pathPaymentStrictSend",
    params: {
      sendAsset: "asset",
      sendAmount: "number",
      destination: "string:address",
      destAsset: "asset",
      destMin: "number",
      path: "array:asset"
    }
  },
  "changeTrust": {
    type: "changeTrust",
    params: {
      asset: "asset",
      limit: "number"
    }
  },
  "allowTrust": {
    type: "allowTrust",
    params: {
      trustor: "string:address",
      assetCode: "string:assetCode",
      authorize: "enum:0|1|2"
    }
  },
  "setOptions": {
    type: "setOptions",
    params: {
      inflationDest: "optional:string:address",
      clearFlags: "number",
      setFlags: "number",
      masterWeight: "number",
      lowThreshold: "number",
      medThreshold: "number",
      highThreshold: "number",
      signer: "signer"
    }
  },
  // the next  intentionally falls through!
  "manageOffer": {
    type: "manageOffer",
    params: {
      selling: "asset",
      buying: "asset",
      amount: "number",
      price: "price",
      offerId: "number:offerId"
    }
  },
  "manageSellOffer": {
    type: "manageSellOffer",
    params: {
      selling: "asset",
      buying: "asset",
      amount: "number",
      price: "price",
      offerId: "optional:number:offerId"
    }
  },
  "manageBuyOffer": {
    type: "manageBuyOffer",
    params: {
      selling: "asset",
      buying: "asset",
      buyAmount: "number",
      price: "price",
      offerId: "optional:number:offerId"
    }
  },
  "createPassiveOffer": {
    type: "createPassiveOffer",
    params: {
      selling: "asset",
      buying: "asset",
      amount: "number",
      price: "price"
    }
  },
  "createPassiveSellOffer": {
    type: "createPassiveSellOffer",
    params: {
      selling: "asset",
      buying: "asset",
      amount: "number",
      price: "price"
    }
  },
  "accountMerge": {
    type: "accountMerge",
    params: {
      destination: "string:address"
    }
  },
  "manageData": {
    type: "manageData",
    params: {
      name: "string",
      value: "string"
    }
  },
  "inflation": {
    type: "inflation",
    params: {}
  },
  "bumpSequence": {
    type: "bumpSequence",
    params: {
      bumpTo: "number"
    }
  },
  "createClaimableBalance": {
    type: "createClaimableBalance",
    params: {
      asset: "asset",
      amount: "number",
      claimants: "array:claimant"
    }
  },
  "claimClaimableBalance": {
    type: "claimClaimableBalance",
    params: {
      balanceId: "string:balanceId"
    }
  },
  "beginSponsoringFutureReserves": {
    type: "beginSponsoringFutureReserves",
    params: {
      sponsoredId: "string"
    }
  },
  "endSponsoringFutureReserves": {
    type: "endSponsoringFutureReserves",
    params: {}
  },
  "revokeSponsorship": {
    type: "revokeSponsorship",
    params: {}
  },
  "revokeAccountSponsorship": {
    type: "revokeAccountSponsorship",
    params: {
      account: "string:accountId"
    }
  },
  "revokeTrustlineSponsorship": {
    type: "revokeTrustlineSponsorship",
    params: {
      account: "string:accountId",
      asset: "asset"
    }
  },
  "revokeOfferSponsorship": {
    type: "revokeOfferSponsorship",
    params: {
      seller: "string:accountId",
      offerId: "number:offerId"
    }
  },
  "revokeDataSponsorship": {
    type: "revokeDataSponsorship",
    params: {
      account: "string:accountId",
      name: "string"
    }
  },
  "revokeClaimableBalanceSponsorship": {
    type: "revokeClaimableBalanceSponsorship",
    params: {
      balanceId: "string:balanceId"
    }
  },
  "revokeLiquidityPoolSponsorship": {
    type: "revokeLiquidityPoolSponsorship",
    params: {
      liquidityPoolId: "string:liquidityPoolId"
    }
  },
  "revokeSignerSponsorship": {
    type: "revokeSignerSponsorship",
    params: {
      account: "string:accountId",
      signer: "signer"
    }
  },
  "clawback": {
    type: "clawback",
    params: {
      amount: "number",
      from: "string:address",
      asset: "asset"
    }
  },
  "clawbackClaimableBalance": {
    type: "clawbackClaimableBalance",
    params: {
      balanceId: "string:balanceId"
    }
  },
  "setTrustLineFlags": {
    type: "setTrustLineFlags",
    params: {
      asset: "asset",
      trustor: "string:address",
      flags: "trustLineFlags"
    }
  },
  "liquidityPoolDeposit": {
    type: "liquidityPoolDeposit",
    params: {
      liquidityPoolId: "string:liquidityPoolId",
      maxAmountA: "number",
      maxAmountB: "number",
      minPrice: "price",
      maxPrice: "price"
    }
  },
  "liquidityPoolWithdraw": {
    type: "liquidityPoolWithdraw",
    params: {
      liquidityPoolId: "string:liquidityPoolId",
      amount: "number",
      minAmountA: "number",
      minAmountB: "number"
    }
  }
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isTestnet, $$unsubscribe_isTestnet;
  let $dataPacket, $$unsubscribe_dataPacket;
  let $connected, $$unsubscribe_connected;
  $$unsubscribe_isTestnet = subscribe(isTestnet, (value) => $isTestnet = value);
  $$unsubscribe_dataPacket = subscribe(dataPacket, (value) => $dataPacket = value);
  $$unsubscribe_connected = subscribe(connected, (value) => $connected = value);
  let transactionCode = "";
  let transactionXDR = "No Transaction compiled";
  let transactionResult = "No Transaction Submited";
  const MetaStellar_String = `

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
  async function transaction_callback(txn, operations) {
    transactionCode = String(txn);
    let codeString = ``;
    codeString += `
        const network = \`\${'testnet'}\`
        const address = \`\${'${$dataPacket.currentAddress}'}\`

        async function CreateTransaction(network, address){
            const passpharase = network === 'testnet'? StellarSdk.Networks.TESTNET : StellarSdk.Networks.PUBLIC

            const server = new StellarSdk.Horizon.Server(network === 'testnet'?'https://horizon-testnet.stellar.org':'https://horizon.stellar.org');
            const account = await server.loadAccount(address);
            const txnBuilder = new StellarSdk.TransactionBuilder(account, {fee:StellarSdk.BASE_FEE, networkPassphrase: passpharase});
        `;
    let i = 0;
    for (const operation of operations) {
      console.log(operation);
      let paramsTypes = OperationParams[operation.type].params;
      console.log("param types is:");
      console.log(paramsTypes);
      let argString = "{";
      for (let key in operation.params) {
        i += 1;
        if (paramsTypes[key] === "asset") {
          const varName = operation.params[key].code + "_Asset" + i;
          codeString += `
			let ${varName} = new StellarSdk.Asset('${operation.params[key]["code"]}', '${operation.params[key]["issuer"]}');
`;
          operation.params[key] = varName;
          argString += `'${key}':${varName},`;
        } else {
          argString += `'${key}':'${operation.params[key]}',`;
        }
      }
      argString += "}";
      codeString += `
            txnBuilder.addOperation(
                
                StellarSdk.Operation.${operation.type}(${argString})

            )`;
    }
    codeString += `
            txnBuilder.setTimeout(3600);
            return txnBuilder.build().toXDR()
            
        }
        CreateTransaction(network, address)
        .then(
            async (txnXDR) => {
                alert( 
                    JSON.stringify(
                        await callMetaStellar('signAndSubmitTransaction', 
                            {testnet:${$isTestnet}, transaction:txnXDR}
                        )
                    )
                );
            }
        )

        
        `;
    transactionCode = codeString;
    transactionXDR = txn.setTimeout(3600).build().toXDR();
  }
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${!$connected ? `${validate_component(ConnectDisp, "ConnectDisp").$$render($$result, {}, {}, {})}` : `${validate_component(P, "P").$$render(
      $$result,
      {
        size: "4xl",
        class: "uk-container justify-center"
      },
      {},
      {
        default: () => {
          return `TXN Test Kitchen`;
        }
      }
    )} <br> <div class="flex flex-wrap"><div style="margin-left: 2rem; margin-top:2rem; width:30rem; min-width:30rem;">${validate_component(TransactionMaker, "TransactionMaker").$$render(
      $$result,
      {
        network: $isTestnet ? "testnet" : "mainnet",
        address: $dataPacket.currentAddress,
        callback: transaction_callback
      },
      {},
      {}
    )}</div> <div style="margin-left:2rem; margin-right:2rem; margin-top:2rem; border-left: 1px solid; padding-left: 2rem;">${validate_component(Tabs, "Tabs").$$render($$result, { tabStyle: "underline" }, {}, {
      default: () => {
        return `${validate_component(TabItem, "TabItem").$$render($$result, { title: "Javascript-SDK Code", open: true }, {}, {
          default: () => {
            return `${validate_component(JSEditor, "JsEditor").$$render(
              $$result,
              {
                width: "40rem",
                prependCode: MetaStellar_String,
                code: transactionCode
              },
              {
                code: ($$value) => {
                  transactionCode = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })} ${validate_component(TabItem, "TabItem").$$render($$result, { title: "Transaction XDR" }, {}, {
          default: () => {
            return `Transaction XDR
                    <div style="width:40rem; word-wrap:break-word">${escape(transactionXDR)}</div> ${validate_component(Button, "Button").$$render($$result, { color: "light" }, {}, {
              default: () => {
                return `Sign And Submit`;
              }
            })} <p data-svelte-h="svelte-1v7tiyb">Transaction result</p> <div style="width:40rem; height:10rem; word-wrap:break-word">${escape(transactionResult)}</div>`;
          }
        })}`;
      }
    })}</div></div>`}`;
  } while (!$$settled);
  $$unsubscribe_isTestnet();
  $$unsubscribe_dataPacket();
  $$unsubscribe_connected();
  return $$rendered;
});
export {
  Page as default
};
