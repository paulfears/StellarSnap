import { c as create_ssr_component, a as add_attribute, e as each, b as subscribe, d as add_styles, f as merge_ssr_styles, g as escape, v as validate_component, m as missing_component, n as noop, h as compute_rest_props, o as onDestroy, i as spread, j as escape_attribute_value, k as escape_object, l as identity, p as getContext, q as createEventDispatcher, r as compute_slots } from "../../chunks/ssr.js";
import { c as cn, t as toastState, u as useEffect } from "../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../chunks/ArrowUp.svelte_svelte_type_style_lang.js";
import { B as Button } from "../../chunks/Button.js";
import { twMerge, twJoin } from "tailwind-merge";
import { F as Frame, L as Label } from "../../chunks/Label.js";
import { i as isTestnet, d as dataPacket, c as connected } from "../../chunks/wallet-store.js";
/* empty css                                               */
import * as dom from "@floating-ui/dom";
import { C as Card } from "../../chunks/index.svelte_svelte_type_style_lang2.js";
import "@stellar/stellar-sdk";
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type = "success" } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  return `${type === "success" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>` : `${type === "error" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>` : `${type === "info" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"></path></svg>` : `${type === "warning" ? `<svg viewBox="0 0 64 64" fill="currentColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M32.427,7.987c2.183,0.124 4,1.165 5.096,3.281l17.936,36.208c1.739,3.66 -0.954,8.585 -5.373,8.656l-36.119,0c-4.022,-0.064 -7.322,-4.631 -5.352,-8.696l18.271,-36.207c0.342,-0.65 0.498,-0.838 0.793,-1.179c1.186,-1.375 2.483,-2.111 4.748,-2.063Zm-0.295,3.997c-0.687,0.034 -1.316,0.419 -1.659,1.017c-6.312,11.979 -12.397,24.081 -18.301,36.267c-0.546,1.225 0.391,2.797 1.762,2.863c12.06,0.195 24.125,0.195 36.185,0c1.325,-0.064 2.321,-1.584 1.769,-2.85c-5.793,-12.184 -11.765,-24.286 -17.966,-36.267c-0.366,-0.651 -0.903,-1.042 -1.79,-1.03Z"></path><path d="M33.631,40.581l-3.348,0l-0.368,-16.449l4.1,0l-0.384,16.449Zm-3.828,5.03c0,-0.609 0.197,-1.113 0.592,-1.514c0.396,-0.4 0.935,-0.601 1.618,-0.601c0.684,0 1.223,0.201 1.618,0.601c0.395,0.401 0.593,0.905 0.593,1.514c0,0.587 -0.193,1.078 -0.577,1.473c-0.385,0.395 -0.929,0.593 -1.634,0.593c-0.705,0 -1.249,-0.198 -1.634,-0.593c-0.384,-0.395 -0.576,-0.886 -0.576,-1.473Z"></path></svg>` : ``}`}`}`}`;
});
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { visible } = $$props;
  const bars = Array(12).fill(0);
  if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0)
    $$bindings.visible(visible);
  return `<div class="sonner-loading-wrapper"${add_attribute("data-visible", visible, 0)}><div class="sonner-spinner">${each(bars, (_, i) => {
    return `<div class="sonner-loading-bar"></div>`;
  })}</div></div>`;
});
const TOAST_LIFETIME = 4e3;
const GAP$1 = 14;
const TIME_BEFORE_UNMOUNT = 200;
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isFront;
  let isVisible;
  let toastType;
  let toastClass;
  let toastDescriptionClass;
  let heightIndex;
  let coords;
  let toastsHeightBefore;
  let disabled;
  let isPromiseLoadingOrInfiniteDuration;
  let $$unsubscribe_effect = noop, $$subscribe_effect = () => ($$unsubscribe_effect(), $$unsubscribe_effect = subscribe(effect, ($$value) => $$value), effect);
  let $heights, $$unsubscribe_heights;
  let $toasts, $$unsubscribe_toasts;
  const defaultClasses = {
    toast: "",
    title: "",
    description: "",
    loader: "",
    closeButton: "",
    cancelButton: "",
    actionButton: "",
    action: "",
    warning: "",
    error: "",
    success: "",
    default: "",
    info: "",
    loading: ""
  };
  const { toasts, heights, removeHeight, setHeight, remove } = toastState;
  $$unsubscribe_toasts = subscribe(toasts, (value) => $toasts = value);
  $$unsubscribe_heights = subscribe(heights, (value) => $heights = value);
  let { toast } = $$props;
  let { index } = $$props;
  let { expanded } = $$props;
  let { invert } = $$props;
  let { position } = $$props;
  let { visibleToasts } = $$props;
  let { expandByDefault } = $$props;
  let { closeButton } = $$props;
  let { interacting } = $$props;
  let { cancelButtonStyle = "" } = $$props;
  let { actionButtonStyle = "" } = $$props;
  let { duration = 4e3 } = $$props;
  let { descriptionClass = "" } = $$props;
  let { classes = {} } = $$props;
  let { unstyled = false } = $$props;
  let mounted = false;
  let removed = false;
  let swiping = false;
  let swipeOut = false;
  let offsetBeforeRemove = 0;
  let initialHeight = 0;
  let toastRef;
  let offset = 0;
  let closeTimerStartTimeRef = 0;
  let lastCloseTimerStartTimeRef = 0;
  async function updateHeights() {
    {
      return;
    }
  }
  function deleteToast() {
    removed = true;
    offsetBeforeRemove = offset;
    removeHeight(toast.id);
    setTimeout(
      () => {
        remove(toast.id);
      },
      TIME_BEFORE_UNMOUNT
    );
  }
  let timeoutId;
  let remainingTime = toast.duration || duration || TOAST_LIFETIME;
  function pauseTimer() {
    if (lastCloseTimerStartTimeRef < closeTimerStartTimeRef) {
      const elapsedTime = (/* @__PURE__ */ new Date()).getTime() - closeTimerStartTimeRef;
      remainingTime = remainingTime - elapsedTime;
    }
    lastCloseTimerStartTimeRef = (/* @__PURE__ */ new Date()).getTime();
  }
  function startTimer() {
    closeTimerStartTimeRef = (/* @__PURE__ */ new Date()).getTime();
    timeoutId = setTimeout(
      () => {
        toast.onAutoClose?.(toast);
        deleteToast();
      },
      remainingTime
    );
  }
  let effect;
  if ($$props.toast === void 0 && $$bindings.toast && toast !== void 0)
    $$bindings.toast(toast);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  if ($$props.invert === void 0 && $$bindings.invert && invert !== void 0)
    $$bindings.invert(invert);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.visibleToasts === void 0 && $$bindings.visibleToasts && visibleToasts !== void 0)
    $$bindings.visibleToasts(visibleToasts);
  if ($$props.expandByDefault === void 0 && $$bindings.expandByDefault && expandByDefault !== void 0)
    $$bindings.expandByDefault(expandByDefault);
  if ($$props.closeButton === void 0 && $$bindings.closeButton && closeButton !== void 0)
    $$bindings.closeButton(closeButton);
  if ($$props.interacting === void 0 && $$bindings.interacting && interacting !== void 0)
    $$bindings.interacting(interacting);
  if ($$props.cancelButtonStyle === void 0 && $$bindings.cancelButtonStyle && cancelButtonStyle !== void 0)
    $$bindings.cancelButtonStyle(cancelButtonStyle);
  if ($$props.actionButtonStyle === void 0 && $$bindings.actionButtonStyle && actionButtonStyle !== void 0)
    $$bindings.actionButtonStyle(actionButtonStyle);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.descriptionClass === void 0 && $$bindings.descriptionClass && descriptionClass !== void 0)
    $$bindings.descriptionClass(descriptionClass);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.unstyled === void 0 && $$bindings.unstyled && unstyled !== void 0)
    $$bindings.unstyled(unstyled);
  classes = { ...defaultClasses, ...classes };
  isFront = index === 0;
  isVisible = index + 1 <= visibleToasts;
  toast.title;
  toast.description;
  toastType = toast.type;
  toastClass = toast.class || "";
  toastDescriptionClass = toast.descriptionClass || "";
  heightIndex = $heights.findIndex((height) => height.toastId === toast.id) || 0;
  coords = position.split("-");
  toastsHeightBefore = $heights.reduce(
    (prev, curr, reducerIndex) => {
      if (reducerIndex >= heightIndex)
        return prev;
      return prev + curr.height;
    },
    0
  );
  invert = toast.invert || invert;
  disabled = toastType === "loading";
  offset = Math.round(heightIndex * GAP$1 + toastsHeightBefore);
  {
    updateHeights();
  }
  {
    if (toast.updated) {
      clearTimeout(timeoutId);
      remainingTime = toast.duration || duration || TOAST_LIFETIME;
      startTimer();
    }
  }
  isPromiseLoadingOrInfiniteDuration = toast.promise && toastType === "loading" || toast.duration === Number.POSITIVE_INFINITY;
  $$subscribe_effect(effect = useEffect(() => {
    if (!isPromiseLoadingOrInfiniteDuration) {
      if (expanded || interacting) {
        pauseTimer();
      } else {
        startTimer();
      }
    }
    return () => clearTimeout(timeoutId);
  }));
  {
    if (toast.delete) {
      deleteToast();
    }
  }
  $$unsubscribe_effect();
  $$unsubscribe_heights();
  $$unsubscribe_toasts();
  return `   <li${add_attribute("aria-live", toast.important ? "assertive" : "polite", 0)} aria-atomic="true" role="status"${add_attribute("tabindex", 0, 0)}${add_attribute("class", cn($$props.class, toastClass, classes?.toast, toast?.classes?.toast, classes?.[toastType], toast?.classes?.[toastType]), 0)} data-sonner-toast=""${add_attribute("data-styled", !(toast.component || toast?.unstyled || unstyled), 0)}${add_attribute("data-mounted", mounted, 0)}${add_attribute("data-promise", Boolean(toast.promise), 0)}${add_attribute("data-removed", removed, 0)}${add_attribute("data-visible", isVisible, 0)}${add_attribute("data-y-position", coords[0], 0)}${add_attribute("data-x-position", coords[1], 0)}${add_attribute("data-index", index, 0)}${add_attribute("data-front", isFront, 0)}${add_attribute("data-swiping", swiping, 0)}${add_attribute("data-type", toastType, 0)}${add_attribute("data-invert", invert, 0)}${add_attribute("data-swipe-out", swipeOut, 0)}${add_attribute("data-expanded", Boolean(expanded || expandByDefault && mounted), 0)}${add_styles(merge_ssr_styles(escape(`${$$props.style} ${toast.style}`, true), {
    "--index": index,
    "--toasts-before": index,
    "--z-index": $toasts.length - index,
    "--offset": `${removed ? offsetBeforeRemove : offset}px`,
    "--initial-height": `${initialHeight}px`
  }))}${add_attribute("this", toastRef, 0)}>${closeButton && !toast.component ? `<button aria-label="Close toast"${add_attribute("data-disabled", disabled, 0)} data-close-button${add_attribute("class", cn(classes?.closeButton, toast?.classes?.closeButton), 0)}><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>` : ``} ${toast.component ? `${validate_component(toast.component || missing_component, "svelte:component").$$render($$result, Object.assign({}, toast.componentProps), {}, {})}` : `${toastType !== "default" || toast.icon || toast.promise ? `<div data-icon="">${(toast.promise || toastType === "loading") && !toast.icon ? `${slots["loading-icon"] ? slots["loading-icon"]({}) : ``}` : ``} ${toast.icon ? `${validate_component(toast.icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}` : `${toastType === "success" ? `${slots["success-icon"] ? slots["success-icon"]({}) : ``}` : `${toastType === "error" ? `${slots["error-icon"] ? slots["error-icon"]({}) : ``}` : `${toastType === "warning" ? `${slots["warning-icon"] ? slots["warning-icon"]({}) : ``}` : `${toastType === "info" ? `${slots["info-icon"] ? slots["info-icon"]({}) : ``}` : ``}`}`}`}`}</div>` : ``} <div data-content="">${toast.title ? `<div data-title=""${add_attribute("class", cn(classes?.title, toast?.classes?.title), 0)}>${typeof toast.title !== "string" ? `${validate_component(toast.title || missing_component, "svelte:component").$$render($$result, Object.assign({}, toast.componentProps), {}, {})}` : `${escape(toast.title)}`}</div>` : ``} ${toast.description ? `<div data-description=""${add_attribute("class", cn(descriptionClass, toastDescriptionClass, classes?.description, toast.classes?.description), 0)}>${typeof toast.description !== "string" ? `${validate_component(toast.description || missing_component, "svelte:component").$$render($$result, Object.assign({}, toast.componentProps), {}, {})}` : `${escape(toast.description)}`}</div>` : ``}</div> ${toast.cancel ? `<button data-button data-cancel${add_attribute("style", cancelButtonStyle, 0)}${add_attribute("class", cn(classes?.cancelButton, toast?.classes?.cancelButton), 0)}>${escape(toast.cancel.label)}</button>` : ``} ${toast.action ? `<button data-button=""${add_attribute("style", actionButtonStyle, 0)}${add_attribute("class", cn(classes?.actionButton, toast?.classes?.actionButton), 0)}>${escape(toast.action.label)}</button>` : ``}`}</li>`;
});
const css$5 = {
  code: ":where(html[dir='ltr']),:where([data-sonner-toaster][dir='ltr']){--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}:where(html[dir='rtl']),:where([data-sonner-toaster][dir='rtl']){--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,\n			system-ui,\n			-apple-system,\n			BlinkMacSystemFont,\n			Segoe UI,\n			Roboto,\n			Helvetica Neue,\n			Arial,\n			Noto Sans,\n			sans-serif,\n			Apple Color Emoji,\n			Segoe UI Emoji,\n			Segoe UI Symbol,\n			Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999}:where([data-sonner-toaster][data-x-position='right']){right:max(var(--offset), env(safe-area-inset-right))}:where([data-sonner-toaster][data-x-position='left']){left:max(var(--offset), env(safe-area-inset-left))}:where([data-sonner-toaster][data-x-position='center']){left:50%;transform:translateX(-50%)}:where([data-sonner-toaster][data-y-position='top']){top:max(var(--offset), env(safe-area-inset-top))}:where([data-sonner-toaster][data-y-position='bottom']){bottom:max(var(--offset), env(safe-area-inset-bottom))}:where([data-sonner-toast]){--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform 400ms,\n			opacity 400ms,\n			height 400ms,\n			box-shadow 200ms;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled='true']){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0px 4px 12px rgba(0, 0, 0, 0.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0px 4px 12px rgba(0, 0, 0, 0.1),\n			0 0 0 2px rgba(0, 0, 0, 0.2)}:where([data-sonner-toast][data-y-position='top']){top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position='bottom']){bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise='true']) :where([data-icon])>svg{opacity:0;transform:scale(0.8);transform-origin:center;animation:sonner-fade-in 300ms ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled='true'] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity 400ms,\n			box-shadow 200ms}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px rgba(0, 0, 0, 0.4)}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0, 0, 0, 0.08)}:where([data-sonner-toast][data-theme='dark']) :where([data-cancel]){background:rgba(255, 255, 255, 0.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;background:var(--gray1);color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity 100ms,\n			background 200ms,\n			border-color 200ms}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0px 4px 12px rgba(0, 0, 0, 0.1),\n			0 0 0 2px rgba(0, 0, 0, 0.2)}:where([data-sonner-toast]) :where([data-disabled='true']){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping='true'])::before{content:'';position:absolute;left:0;right:0;height:100%;z-index:-1}:where(\n			[data-sonner-toast][data-y-position='top'][data-swiping='true']\n		)::before{bottom:50%;transform:scaleY(3) translateY(50%)}:where(\n			[data-sonner-toast][data-y-position='bottom'][data-swiping='true']\n		)::before{top:50%;transform:scaleY(3) translateY(-50%)}:where(\n			[data-sonner-toast][data-swiping='false'][data-removed='true']\n		)::before{content:'';position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast])::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted='true']){--y:translateY(0);opacity:1}:where([data-sonner-toast][data-expanded='false'][data-front='false']){--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before)))\n			scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity 400ms}:where(\n			[data-sonner-toast][data-expanded='false'][data-front='false'][data-styled='true']\n		)\n		>*{opacity:0}:where([data-sonner-toast][data-visible='false']){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted='true'][data-expanded='true']){--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where(\n			[data-sonner-toast][data-removed='true'][data-front='true'][data-swipe-out='false']\n		){--y:translateY(calc(var(--lift) * -100%));opacity:0}:where(\n			[data-sonner-toast][data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='true']\n		){--y:translateY(\n			calc(var(--lift) * var(--offset) + var(--lift) * -100%)\n		);opacity:0}:where(\n			[data-sonner-toast][data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='false']\n		){--y:translateY(40%);opacity:0;transition:transform 500ms,\n			opacity 200ms}:where(\n			[data-sonner-toast][data-removed='true'][data-front='false']\n		)::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping='true']{transform:var(--y) translateY(var(--swipe-amount, 0px));transition:none}[data-sonner-toast][data-swipe-out='true'][data-y-position='bottom'],[data-sonner-toast][data-swipe-out='true'][data-y-position='top']{animation:swipe-out 200ms ease-out forwards}@keyframes swipe-out{from{transform:translateY(\n				calc(var(--lift) * var(--offset) + var(--swipe-amount))\n			);opacity:1}to{transform:translateY(\n				calc(\n					var(--lift) * var(--offset) + var(--swipe-amount) +\n						var(--lift) * -100%\n				)\n			);opacity:0}}@media(max-width: 600px){[data-sonner-toaster]{position:fixed;--mobile-offset:16px;right:var(--mobile-offset);left:var(--mobile-offset);width:100%}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset) * 2)}[data-sonner-toaster][data-x-position='left']{left:var(--mobile-offset)}[data-sonner-toaster][data-y-position='bottom']{bottom:20px}[data-sonner-toaster][data-y-position='top']{top:20px}[data-sonner-toaster][data-x-position='center']{left:var(--mobile-offset);right:var(--mobile-offset);transform:none}}[data-sonner-toaster][data-theme='light']{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 91%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 91%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 91%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme='light']\n		[data-sonner-toast][data-invert='true']{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-theme='dark']\n		[data-sonner-toast][data-invert='true']{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-theme='dark']{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 100%, 12%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 12%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-rich-colors='true'] [data-sonner-toast][data-type='success']{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-theme='dark']\n		[data-sonner-toast][data-type='default']\n		[data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-rich-colors='true']\n		[data-sonner-toast][data-type='success']\n		[data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors='true'] [data-sonner-toast][data-type='info']{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors='true']\n		[data-sonner-toast][data-type='info']\n		[data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors='true'] [data-sonner-toast][data-type='warning']{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors='true']\n		[data-sonner-toast][data-type='warning']\n		[data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors='true'] [data-sonner-toast][data-type='error']{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors='true']\n		[data-sonner-toast][data-type='error']\n		[data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible='false']{transform-origin:center;animation:sonner-fade-out 0.2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(0.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-0.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-0.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-0.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-0.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-0.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-0.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-0.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-0.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-0.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:0.15}}@media(prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none !important;animation:none !important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);transform-origin:center;transition:opacity 200ms,\n			transform 200ms}.sonner-loader[data-visible='false']{opacity:0;transform:scale(0.8) translate(-50%, -50%)}",
  map: `{"version":3,"file":"Toaster.svelte","sources":["Toaster.svelte"],"sourcesContent":["<script>import { onDestroy, onMount } from 'svelte';\\nimport { toastState } from './state.js';\\nimport Toast from './Toast.svelte';\\nimport Loader from './Loader.svelte';\\nimport Icon from './Icon.svelte';\\n// Visible toasts amount\\nconst VISIBLE_TOASTS_AMOUNT = 3;\\n// Viewport padding\\nconst VIEWPORT_OFFSET = '32px';\\n// Default toast width\\nconst TOAST_WIDTH = 356;\\n// Default gap between toasts\\nconst GAP = 14;\\nconst DARK = 'dark';\\nconst LIGHT = 'light';\\nfunction getInitialTheme(t) {\\n    if (t !== 'system') {\\n        return t;\\n    }\\n    if (typeof window !== 'undefined') {\\n        if (window.matchMedia &&\\n            window.matchMedia('(prefers-color-scheme: dark)').matches) {\\n            return DARK;\\n        }\\n        return LIGHT;\\n    }\\n    return LIGHT;\\n}\\nfunction getDocumentDirection() {\\n    if (typeof window === 'undefined')\\n        return 'ltr';\\n    if (typeof document === 'undefined')\\n        return 'ltr'; // For Fresh purpose\\n    const dirAttribute = document.documentElement.getAttribute('dir');\\n    if (dirAttribute === 'auto' || !dirAttribute) {\\n        return window.getComputedStyle(document.documentElement)\\n            .direction;\\n    }\\n    return dirAttribute;\\n}\\nexport let invert = false;\\nexport let theme = 'light';\\nexport let position = 'bottom-right';\\nexport let hotkey = ['altKey', 'KeyT'];\\nexport let richColors = false;\\nexport let expand = false;\\nexport let duration = 4000;\\nexport let visibleToasts = VISIBLE_TOASTS_AMOUNT;\\nexport let closeButton = false;\\nexport let toastOptions = {};\\nexport let offset = null;\\nexport let dir = getDocumentDirection();\\nconst { toasts, heights, reset } = toastState;\\n$: possiblePositions = Array.from(new Set([\\n    position,\\n    ...$toasts\\n        .filter((toast) => toast.position)\\n        .map((toast) => toast.position)\\n].filter(Boolean)));\\nlet expanded = false;\\nlet interacting = false;\\nlet actualTheme = getInitialTheme(theme);\\nlet listRef;\\nlet lastFocusedElementRef = null;\\nlet isFocusWithinRef = false;\\n$: hotkeyLabel = hotkey.join('+').replace(/Key/g, '').replace(/Digit/g, '');\\n$: if ($toasts.length <= 1) {\\n    expanded = false;\\n}\\n// Check for dismissed toasts and remove them. We need to do this to have dismiss animation.\\n$: {\\n    const toastsToDismiss = $toasts.filter((toast) => toast.dismiss && !toast.delete);\\n    if (toastsToDismiss.length > 0) {\\n        const updatedToasts = $toasts.map((toast) => {\\n            const matchingToast = toastsToDismiss.find((dismissToast) => dismissToast.id === toast.id);\\n            if (matchingToast) {\\n                return { ...toast, delete: true };\\n            }\\n            return toast;\\n        });\\n        toasts.set(updatedToasts);\\n    }\\n}\\nonDestroy(() => {\\n    if (listRef && lastFocusedElementRef) {\\n        lastFocusedElementRef.focus({ preventScroll: true });\\n        lastFocusedElementRef = null;\\n        isFocusWithinRef = false;\\n    }\\n});\\nonMount(() => {\\n    reset();\\n    const handleKeydown = (event) => {\\n        const isHotkeyPressed = hotkey.every((key) => \\n        // eslint-disable-next-line @typescript-eslint/no-explicit-any\\n        event[key] || event.code === key);\\n        if (isHotkeyPressed) {\\n            expanded = true;\\n            listRef?.focus();\\n        }\\n        if (event.code === 'Escape' &&\\n            (document.activeElement === listRef ||\\n                listRef?.contains(document.activeElement))) {\\n            expanded = false;\\n        }\\n    };\\n    document.addEventListener('keydown', handleKeydown);\\n    return () => {\\n        document.removeEventListener('keydown', handleKeydown);\\n    };\\n});\\n$: {\\n    if (theme !== 'system') {\\n        actualTheme = theme;\\n    }\\n    if (typeof window !== 'undefined') {\\n        if (theme === 'system') {\\n            // check if current preference is dark\\n            if (window.matchMedia &&\\n                window.matchMedia('(prefers-color-scheme: dark)').matches) {\\n                // it's currently dark\\n                actualTheme = DARK;\\n            }\\n            else {\\n                // it's not dark\\n                actualTheme = LIGHT;\\n            }\\n        }\\n        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');\\n        const changeHandler = ({ matches }) => {\\n            actualTheme = matches ? DARK : LIGHT;\\n        };\\n        if ('addEventListener' in mediaQueryList) {\\n            mediaQueryList.addEventListener('change', changeHandler);\\n        }\\n        else {\\n            // @ts-expect-error deprecated API\\n            mediaQueryList.addListener(changeHandler);\\n        }\\n    }\\n}\\nfunction handleBlur(event) {\\n    if (isFocusWithinRef &&\\n        !event.currentTarget.contains(event.relatedTarget)) {\\n        isFocusWithinRef = false;\\n        if (lastFocusedElementRef) {\\n            lastFocusedElementRef.focus({ preventScroll: true });\\n            lastFocusedElementRef = null;\\n        }\\n    }\\n}\\nfunction handleFocus(event) {\\n    if (!isFocusWithinRef) {\\n        isFocusWithinRef = true;\\n        lastFocusedElementRef = event.relatedTarget;\\n    }\\n}\\n<\/script>\\n\\n{#if $toasts.length > 0}\\n\\t<section aria-label={\`Notifications \${hotkeyLabel}\`} tabIndex={-1}>\\n\\t\\t{#each possiblePositions as position, index}\\n\\t\\t\\t<ol\\n\\t\\t\\t\\ttabIndex={-1}\\n\\t\\t\\t\\tbind:this={listRef}\\n\\t\\t\\t\\tclass={$$props.class}\\n\\t\\t\\t\\tdata-sonner-toaster\\n\\t\\t\\t\\tdata-theme={actualTheme}\\n\\t\\t\\t\\tdata-rich-colors={richColors}\\n\\t\\t\\t\\tdir={dir === 'auto' ? getDocumentDirection() : dir}\\n\\t\\t\\t\\tdata-y-position={position.split('-')[0]}\\n\\t\\t\\t\\tdata-x-position={position.split('-')[1]}\\n\\t\\t\\t\\ton:blur={handleBlur}\\n\\t\\t\\t\\ton:focus={handleFocus}\\n\\t\\t\\t\\ton:mouseenter={() => (expanded = true)}\\n\\t\\t\\t\\ton:mousemove={() => (expanded = true)}\\n\\t\\t\\t\\ton:mouseleave={() => {\\n\\t\\t\\t\\t\\tif (!interacting) {\\n\\t\\t\\t\\t\\t\\texpanded = false;\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}}\\n\\t\\t\\t\\ton:pointerdown={() => (interacting = true)}\\n\\t\\t\\t\\ton:pointerup={() => (interacting = false)}\\n\\t\\t\\t\\tstyle:--front-toast-height={\`\${$heights[0]?.height}px\`}\\n\\t\\t\\t\\tstyle:--offset={typeof offset === 'number'\\n\\t\\t\\t\\t\\t? \`\${offset}px\`\\n\\t\\t\\t\\t\\t: offset || VIEWPORT_OFFSET}\\n\\t\\t\\t\\tstyle:--width={\`\${TOAST_WIDTH}px\`}\\n\\t\\t\\t\\tstyle:--gap={\`\${GAP}px\`}\\n\\t\\t\\t\\tstyle={$$props.style}\\n\\t\\t\\t\\t{...$$restProps}\\n\\t\\t\\t>\\n\\t\\t\\t\\t{#each $toasts.filter((toast) => (!toast.position && index === 0) || toast.position === position) as toast, index (toast.id)}\\n\\t\\t\\t\\t\\t<Toast\\n\\t\\t\\t\\t\\t\\t{index}\\n\\t\\t\\t\\t\\t\\t{toast}\\n\\t\\t\\t\\t\\t\\t{invert}\\n\\t\\t\\t\\t\\t\\t{visibleToasts}\\n\\t\\t\\t\\t\\t\\t{closeButton}\\n\\t\\t\\t\\t\\t\\t{interacting}\\n\\t\\t\\t\\t\\t\\t{position}\\n\\t\\t\\t\\t\\t\\texpandByDefault={expand}\\n\\t\\t\\t\\t\\t\\t{expanded}\\n\\t\\t\\t\\t\\t\\tactionButtonStyle={toastOptions?.actionButtonStyle ||\\n\\t\\t\\t\\t\\t\\t\\t''}\\n\\t\\t\\t\\t\\t\\tcancelButtonStyle={toastOptions?.cancelButtonStyle ||\\n\\t\\t\\t\\t\\t\\t\\t''}\\n\\t\\t\\t\\t\\t\\tclass={toastOptions?.class || ''}\\n\\t\\t\\t\\t\\t\\tdescriptionClass={toastOptions?.descriptionClass || ''}\\n\\t\\t\\t\\t\\t\\tclasses={toastOptions.classes || {}}\\n\\t\\t\\t\\t\\t\\tduration={toastOptions?.duration ?? duration}\\n\\t\\t\\t\\t\\t\\tunstyled={toastOptions.unstyled || false}\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t<slot name=\\"loading-icon\\" slot=\\"loading-icon\\">\\n\\t\\t\\t\\t\\t\\t\\t<Loader visible={toast.type === 'loading'} />\\n\\t\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t\\t\\t<slot name=\\"success-icon\\" slot=\\"success-icon\\">\\n\\t\\t\\t\\t\\t\\t\\t<Icon type=\\"success\\" />\\n\\t\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t\\t\\t<slot name=\\"error-icon\\" slot=\\"error-icon\\">\\n\\t\\t\\t\\t\\t\\t\\t<Icon type=\\"error\\" />\\n\\t\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t\\t\\t<slot name=\\"warning-icon\\" slot=\\"warning-icon\\">\\n\\t\\t\\t\\t\\t\\t\\t<Icon type=\\"warning\\" />\\n\\t\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t\\t\\t<slot name=\\"info-icon\\" slot=\\"info-icon\\">\\n\\t\\t\\t\\t\\t\\t\\t<Icon type=\\"info\\" />\\n\\t\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t\\t</Toast>\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</ol>\\n\\t\\t{/each}\\n\\t</section>\\n{/if}\\n\\n<style global>\\n\\t:global(:where(html[dir='ltr'])),\\n\\t:global(:where([data-sonner-toaster][dir='ltr'])) {\\n\\t\\t--toast-icon-margin-start: -3px;\\n\\t\\t--toast-icon-margin-end: 4px;\\n\\t\\t--toast-svg-margin-start: -1px;\\n\\t\\t--toast-svg-margin-end: 0px;\\n\\t\\t--toast-button-margin-start: auto;\\n\\t\\t--toast-button-margin-end: 0;\\n\\t\\t--toast-close-button-start: 0;\\n\\t\\t--toast-close-button-end: unset;\\n\\t\\t--toast-close-button-transform: translate(-35%, -35%);\\n\\t}\\n\\n\\t:global(:where(html[dir='rtl'])),\\n\\t:global(:where([data-sonner-toaster][dir='rtl'])) {\\n\\t\\t--toast-icon-margin-start: 4px;\\n\\t\\t--toast-icon-margin-end: -3px;\\n\\t\\t--toast-svg-margin-start: 0px;\\n\\t\\t--toast-svg-margin-end: -1px;\\n\\t\\t--toast-button-margin-start: 0;\\n\\t\\t--toast-button-margin-end: auto;\\n\\t\\t--toast-close-button-start: unset;\\n\\t\\t--toast-close-button-end: 0;\\n\\t\\t--toast-close-button-transform: translate(35%, -35%);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster])) {\\n\\t\\tposition: fixed;\\n\\t\\twidth: var(--width);\\n\\t\\tfont-family:\\n\\t\\t\\tui-sans-serif,\\n\\t\\t\\tsystem-ui,\\n\\t\\t\\t-apple-system,\\n\\t\\t\\tBlinkMacSystemFont,\\n\\t\\t\\tSegoe UI,\\n\\t\\t\\tRoboto,\\n\\t\\t\\tHelvetica Neue,\\n\\t\\t\\tArial,\\n\\t\\t\\tNoto Sans,\\n\\t\\t\\tsans-serif,\\n\\t\\t\\tApple Color Emoji,\\n\\t\\t\\tSegoe UI Emoji,\\n\\t\\t\\tSegoe UI Symbol,\\n\\t\\t\\tNoto Color Emoji;\\n\\t\\t--gray1: hsl(0, 0%, 99%);\\n\\t\\t--gray2: hsl(0, 0%, 97.3%);\\n\\t\\t--gray3: hsl(0, 0%, 95.1%);\\n\\t\\t--gray4: hsl(0, 0%, 93%);\\n\\t\\t--gray5: hsl(0, 0%, 90.9%);\\n\\t\\t--gray6: hsl(0, 0%, 88.7%);\\n\\t\\t--gray7: hsl(0, 0%, 85.8%);\\n\\t\\t--gray8: hsl(0, 0%, 78%);\\n\\t\\t--gray9: hsl(0, 0%, 56.1%);\\n\\t\\t--gray10: hsl(0, 0%, 52.3%);\\n\\t\\t--gray11: hsl(0, 0%, 43.5%);\\n\\t\\t--gray12: hsl(0, 0%, 9%);\\n\\t\\t--border-radius: 8px;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tpadding: 0;\\n\\t\\tmargin: 0;\\n\\t\\tlist-style: none;\\n\\t\\toutline: none;\\n\\t\\tz-index: 999999999;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster][data-x-position='right'])) {\\n\\t\\tright: max(var(--offset), env(safe-area-inset-right));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster][data-x-position='left'])) {\\n\\t\\tleft: max(var(--offset), env(safe-area-inset-left));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster][data-x-position='center'])) {\\n\\t\\tleft: 50%;\\n\\t\\ttransform: translateX(-50%);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster][data-y-position='top'])) {\\n\\t\\ttop: max(var(--offset), env(safe-area-inset-top));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster][data-y-position='bottom'])) {\\n\\t\\tbottom: max(var(--offset), env(safe-area-inset-bottom));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) {\\n\\t\\t--y: translateY(100%);\\n\\t\\t--lift-amount: calc(var(--lift) * var(--gap));\\n\\t\\tz-index: var(--z-index);\\n\\t\\tposition: absolute;\\n\\t\\topacity: 0;\\n\\t\\ttransform: var(--y);\\n\\t\\tfilter: blur(0);\\n\\t\\t/* https://stackoverflow.com/questions/48124372/pointermove-event-not-working-with-touch-why-not */\\n\\t\\ttouch-action: none;\\n\\t\\ttransition:\\n\\t\\t\\ttransform 400ms,\\n\\t\\t\\topacity 400ms,\\n\\t\\t\\theight 400ms,\\n\\t\\t\\tbox-shadow 200ms;\\n\\t\\tbox-sizing: border-box;\\n\\t\\toutline: none;\\n\\t\\toverflow-wrap: anywhere;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-styled='true'])) {\\n\\t\\tpadding: 16px;\\n\\t\\tbackground: var(--normal-bg);\\n\\t\\tborder: 1px solid var(--normal-border);\\n\\t\\tcolor: var(--normal-text);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tbox-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);\\n\\t\\twidth: var(--width);\\n\\t\\tfont-size: 13px;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tgap: 6px;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast]:focus-visible)) {\\n\\t\\tbox-shadow:\\n\\t\\t\\t0px 4px 12px rgba(0, 0, 0, 0.1),\\n\\t\\t\\t0 0 0 2px rgba(0, 0, 0, 0.2);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-y-position='top'])) {\\n\\t\\ttop: 0;\\n\\t\\t--y: translateY(-100%);\\n\\t\\t--lift: 1;\\n\\t\\t--lift-amount: calc(1 * var(--gap));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-y-position='bottom'])) {\\n\\t\\tbottom: 0;\\n\\t\\t--y: translateY(100%);\\n\\t\\t--lift: -1;\\n\\t\\t--lift-amount: calc(var(--lift) * var(--gap));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-description])) {\\n\\t\\tfont-weight: 400;\\n\\t\\tline-height: 1.4;\\n\\t\\tcolor: inherit;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-title])) {\\n\\t\\tfont-weight: 500;\\n\\t\\tline-height: 1.5;\\n\\t\\tcolor: inherit;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-icon])) {\\n\\t\\tdisplay: flex;\\n\\t\\theight: 16px;\\n\\t\\twidth: 16px;\\n\\t\\tposition: relative;\\n\\t\\tjustify-content: flex-start;\\n\\t\\talign-items: center;\\n\\t\\tflex-shrink: 0;\\n\\t\\tmargin-left: var(--toast-icon-margin-start);\\n\\t\\tmargin-right: var(--toast-icon-margin-end);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-promise='true'])) :global(:where([data-icon])) > :global(svg) {\\n\\t\\topacity: 0;\\n\\t\\ttransform: scale(0.8);\\n\\t\\ttransform-origin: center;\\n\\t\\tanimation: sonner-fade-in 300ms ease forwards;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-icon])) > :global(*) {\\n\\t\\tflex-shrink: 0;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-icon])) :global(svg) {\\n\\t\\tmargin-left: var(--toast-svg-margin-start);\\n\\t\\tmargin-right: var(--toast-svg-margin-end);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-content])) {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: 2px;\\n\\t}\\n\\n\\t:global([data-sonner-toast][data-styled='true']) :global([data-button]) {\\n\\t\\tborder-radius: 4px;\\n\\t\\tpadding-left: 8px;\\n\\t\\tpadding-right: 8px;\\n\\t\\theight: 24px;\\n\\t\\tfont-size: 12px;\\n\\t\\tcolor: var(--normal-bg);\\n\\t\\tbackground: var(--normal-text);\\n\\t\\tmargin-left: var(--toast-button-margin-start);\\n\\t\\tmargin-right: var(--toast-button-margin-end);\\n\\t\\tborder: none;\\n\\t\\tcursor: pointer;\\n\\t\\toutline: none;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tflex-shrink: 0;\\n\\t\\ttransition:\\n\\t\\t\\topacity 400ms,\\n\\t\\t\\tbox-shadow 200ms;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-button]):focus-visible) {\\n\\t\\tbox-shadow: 0 0 0 2px rgba(0, 0, 0, 0.4);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-button]):first-of-type) {\\n\\t\\tmargin-left: var(--toast-button-margin-start);\\n\\t\\tmargin-right: var(--toast-button-margin-end);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-cancel])) {\\n\\t\\tcolor: var(--normal-text);\\n\\t\\tbackground: rgba(0, 0, 0, 0.08);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-theme='dark'])) :global(:where([data-cancel])) {\\n\\t\\tbackground: rgba(255, 255, 255, 0.3);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-close-button])) {\\n\\t\\tposition: absolute;\\n\\t\\tleft: var(--toast-close-button-start);\\n\\t\\tright: var(--toast-close-button-end);\\n\\t\\ttop: 0;\\n\\t\\theight: 20px;\\n\\t\\twidth: 20px;\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t\\talign-items: center;\\n\\t\\tpadding: 0;\\n\\t\\tbackground: var(--gray1);\\n\\t\\tcolor: var(--gray12);\\n\\t\\tborder: 1px solid var(--gray4);\\n\\t\\ttransform: var(--toast-close-button-transform);\\n\\t\\tborder-radius: 50%;\\n\\t\\tcursor: pointer;\\n\\t\\tz-index: 1;\\n\\t\\ttransition:\\n\\t\\t\\topacity 100ms,\\n\\t\\t\\tbackground 200ms,\\n\\t\\t\\tborder-color 200ms;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-close-button]):focus-visible) {\\n\\t\\tbox-shadow:\\n\\t\\t\\t0px 4px 12px rgba(0, 0, 0, 0.1),\\n\\t\\t\\t0 0 0 2px rgba(0, 0, 0, 0.2);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-disabled='true'])) {\\n\\t\\tcursor: not-allowed;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast]):hover) :global(:where([data-close-button]):hover) {\\n\\t\\tbackground: var(--gray2);\\n\\t\\tborder-color: var(--gray5);\\n\\t}\\n\\n\\t/* Leave a ghost div to avoid setting hover to false when swiping out */\\n\\t:global(:where([data-sonner-toast][data-swiping='true'])::before) {\\n\\t\\tcontent: '';\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\tright: 0;\\n\\t\\theight: 100%;\\n\\t\\tz-index: -1;\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-y-position='top'][data-swiping='true']\\n\\t\\t)::before) {\\n\\t\\t/* y 50% needed to distribute height additional height evenly */\\n\\t\\tbottom: 50%;\\n\\t\\ttransform: scaleY(3) translateY(50%);\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-y-position='bottom'][data-swiping='true']\\n\\t\\t)::before) {\\n\\t\\t/* y -50% needed to distribute height additional height evenly */\\n\\t\\ttop: 50%;\\n\\t\\ttransform: scaleY(3) translateY(-50%);\\n\\t}\\n\\n\\t/* Leave a ghost div to avoid setting hover to false when transitioning out */\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-swiping='false'][data-removed='true']\\n\\t\\t)::before) {\\n\\t\\tcontent: '';\\n\\t\\tposition: absolute;\\n\\t\\tinset: 0;\\n\\t\\ttransform: scaleY(2);\\n\\t}\\n\\n\\t/* Needed to avoid setting hover to false when inbetween toasts */\\n\\t:global(:where([data-sonner-toast])::after) {\\n\\t\\tcontent: '';\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\theight: calc(var(--gap) + 1px);\\n\\t\\tbottom: 100%;\\n\\t\\twidth: 100%;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-mounted='true'])) {\\n\\t\\t--y: translateY(0);\\n\\t\\topacity: 1;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-expanded='false'][data-front='false'])) {\\n\\t\\t--scale: var(--toasts-before) * 0.05 + 1;\\n\\t\\t--y: translateY(calc(var(--lift-amount) * var(--toasts-before)))\\n\\t\\t\\tscale(calc(-1 * var(--scale)));\\n\\t\\theight: var(--front-toast-height);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) > :global(*) {\\n\\t\\ttransition: opacity 400ms;\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-expanded='false'][data-front='false'][data-styled='true']\\n\\t\\t)\\n\\t\\t)> :global(*) {\\n\\t\\topacity: 0;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-visible='false'])) {\\n\\t\\topacity: 0;\\n\\t\\tpointer-events: none;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-mounted='true'][data-expanded='true'])) {\\n\\t\\t--y: translateY(calc(var(--lift) * var(--offset)));\\n\\t\\theight: var(--initial-height);\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-removed='true'][data-front='true'][data-swipe-out='false']\\n\\t\\t)) {\\n\\t\\t--y: translateY(calc(var(--lift) * -100%));\\n\\t\\topacity: 0;\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='true']\\n\\t\\t)) {\\n\\t\\t--y: translateY(\\n\\t\\t\\tcalc(var(--lift) * var(--offset) + var(--lift) * -100%)\\n\\t\\t);\\n\\t\\topacity: 0;\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='false']\\n\\t\\t)) {\\n\\t\\t--y: translateY(40%);\\n\\t\\topacity: 0;\\n\\t\\ttransition:\\n\\t\\t\\ttransform 500ms,\\n\\t\\t\\topacity 200ms;\\n\\t}\\n\\n\\t/* Bump up the height to make sure hover state doesn't get set to false */\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-removed='true'][data-front='false']\\n\\t\\t)::before) {\\n\\t\\theight: calc(var(--initial-height) + 20%);\\n\\t}\\n\\n\\t:global([data-sonner-toast][data-swiping='true']) {\\n\\t\\ttransform: var(--y) translateY(var(--swipe-amount, 0px));\\n\\t\\ttransition: none;\\n\\t}\\n\\n\\t:global([data-sonner-toast][data-swipe-out='true'][data-y-position='bottom']),\\n\\t:global([data-sonner-toast][data-swipe-out='true'][data-y-position='top']) {\\n\\t\\tanimation: swipe-out 200ms ease-out forwards;\\n\\t}\\n\\n\\t@keyframes -global-swipe-out {\\n\\t\\tfrom {\\n\\t\\t\\ttransform: translateY(\\n\\t\\t\\t\\tcalc(var(--lift) * var(--offset) + var(--swipe-amount))\\n\\t\\t\\t);\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\n\\t\\tto {\\n\\t\\t\\ttransform: translateY(\\n\\t\\t\\t\\tcalc(\\n\\t\\t\\t\\t\\tvar(--lift) * var(--offset) + var(--swipe-amount) +\\n\\t\\t\\t\\t\\t\\tvar(--lift) * -100%\\n\\t\\t\\t\\t)\\n\\t\\t\\t);\\n\\t\\t\\topacity: 0;\\n\\t\\t}\\n\\t}\\n\\n\\t@media (max-width: 600px) {\\n\\t\\t:global([data-sonner-toaster]) {\\n\\t\\t\\tposition: fixed;\\n\\t\\t\\t--mobile-offset: 16px;\\n\\t\\t\\tright: var(--mobile-offset);\\n\\t\\t\\tleft: var(--mobile-offset);\\n\\t\\t\\twidth: 100%;\\n\\t\\t}\\n\\n\\t\\t:global([data-sonner-toaster]) :global([data-sonner-toast]) {\\n\\t\\t\\tleft: 0;\\n\\t\\t\\tright: 0;\\n\\t\\t\\twidth: calc(100% - var(--mobile-offset) * 2);\\n\\t\\t}\\n\\n\\t\\t:global([data-sonner-toaster][data-x-position='left']) {\\n\\t\\t\\tleft: var(--mobile-offset);\\n\\t\\t}\\n\\n\\t\\t:global([data-sonner-toaster][data-y-position='bottom']) {\\n\\t\\t\\tbottom: 20px;\\n\\t\\t}\\n\\n\\t\\t:global([data-sonner-toaster][data-y-position='top']) {\\n\\t\\t\\ttop: 20px;\\n\\t\\t}\\n\\n\\t\\t:global([data-sonner-toaster][data-x-position='center']) {\\n\\t\\t\\tleft: var(--mobile-offset);\\n\\t\\t\\tright: var(--mobile-offset);\\n\\t\\t\\ttransform: none;\\n\\t\\t}\\n\\t}\\n\\n\\t:global([data-sonner-toaster][data-theme='light']) {\\n\\t\\t--normal-bg: #fff;\\n\\t\\t--normal-border: var(--gray4);\\n\\t\\t--normal-text: var(--gray12);\\n\\n\\t\\t--success-bg: hsl(143, 85%, 96%);\\n\\t\\t--success-border: hsl(145, 92%, 91%);\\n\\t\\t--success-text: hsl(140, 100%, 27%);\\n\\n\\t\\t--info-bg: hsl(208, 100%, 97%);\\n\\t\\t--info-border: hsl(221, 91%, 91%);\\n\\t\\t--info-text: hsl(210, 92%, 45%);\\n\\n\\t\\t--warning-bg: hsl(49, 100%, 97%);\\n\\t\\t--warning-border: hsl(49, 91%, 91%);\\n\\t\\t--warning-text: hsl(31, 92%, 45%);\\n\\n\\t\\t--error-bg: hsl(359, 100%, 97%);\\n\\t\\t--error-border: hsl(359, 100%, 94%);\\n\\t\\t--error-text: hsl(360, 100%, 45%);\\n\\t}\\n\\n\\t:global([data-sonner-toaster][data-theme='light']\\n\\t\\t[data-sonner-toast][data-invert='true']) {\\n\\t\\t--normal-bg: #000;\\n\\t\\t--normal-border: hsl(0, 0%, 20%);\\n\\t\\t--normal-text: var(--gray1);\\n\\t}\\n\\n\\t:global([data-sonner-toaster][data-theme='dark']\\n\\t\\t[data-sonner-toast][data-invert='true']) {\\n\\t\\t--normal-bg: #fff;\\n\\t\\t--normal-border: var(--gray3);\\n\\t\\t--normal-text: var(--gray12);\\n\\t}\\n\\n\\t:global([data-sonner-toaster][data-theme='dark']) {\\n\\t\\t--normal-bg: #000;\\n\\t\\t--normal-border: hsl(0, 0%, 20%);\\n\\t\\t--normal-text: var(--gray1);\\n\\n\\t\\t--success-bg: hsl(150, 100%, 6%);\\n\\t\\t--success-border: hsl(147, 100%, 12%);\\n\\t\\t--success-text: hsl(150, 86%, 65%);\\n\\n\\t\\t--info-bg: hsl(215, 100%, 6%);\\n\\t\\t--info-border: hsl(223, 100%, 12%);\\n\\t\\t--info-text: hsl(216, 87%, 65%);\\n\\n\\t\\t--warning-bg: hsl(64, 100%, 6%);\\n\\t\\t--warning-border: hsl(60, 100%, 12%);\\n\\t\\t--warning-text: hsl(46, 87%, 65%);\\n\\n\\t\\t--error-bg: hsl(358, 76%, 10%);\\n\\t\\t--error-border: hsl(357, 89%, 16%);\\n\\t\\t--error-text: hsl(358, 100%, 81%);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']) :global([data-sonner-toast][data-type='success']) {\\n\\t\\tbackground: var(--success-bg);\\n\\t\\tborder-color: var(--success-border);\\n\\t\\tcolor: var(--success-text);\\n\\t}\\n\\n\\t:global([data-theme='dark']\\n\\t\\t[data-sonner-toast][data-type='default']\\n\\t\\t[data-close-button]) {\\n\\t\\tbackground: var(--normal-bg);\\n\\t\\tborder-color: var(--normal-border);\\n\\t\\tcolor: var(--normal-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']\\n\\t\\t[data-sonner-toast][data-type='success']\\n\\t\\t[data-close-button]) {\\n\\t\\tbackground: var(--success-bg);\\n\\t\\tborder-color: var(--success-border);\\n\\t\\tcolor: var(--success-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']) :global([data-sonner-toast][data-type='info']) {\\n\\t\\tbackground: var(--info-bg);\\n\\t\\tborder-color: var(--info-border);\\n\\t\\tcolor: var(--info-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']\\n\\t\\t[data-sonner-toast][data-type='info']\\n\\t\\t[data-close-button]) {\\n\\t\\tbackground: var(--info-bg);\\n\\t\\tborder-color: var(--info-border);\\n\\t\\tcolor: var(--info-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']) :global([data-sonner-toast][data-type='warning']) {\\n\\t\\tbackground: var(--warning-bg);\\n\\t\\tborder-color: var(--warning-border);\\n\\t\\tcolor: var(--warning-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']\\n\\t\\t[data-sonner-toast][data-type='warning']\\n\\t\\t[data-close-button]) {\\n\\t\\tbackground: var(--warning-bg);\\n\\t\\tborder-color: var(--warning-border);\\n\\t\\tcolor: var(--warning-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']) :global([data-sonner-toast][data-type='error']) {\\n\\t\\tbackground: var(--error-bg);\\n\\t\\tborder-color: var(--error-border);\\n\\t\\tcolor: var(--error-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']\\n\\t\\t[data-sonner-toast][data-type='error']\\n\\t\\t[data-close-button]) {\\n\\t\\tbackground: var(--error-bg);\\n\\t\\tborder-color: var(--error-border);\\n\\t\\tcolor: var(--error-text);\\n\\t}\\n\\n\\t:global(.sonner-loading-wrapper) {\\n\\t\\t--size: 16px;\\n\\t\\theight: var(--size);\\n\\t\\twidth: var(--size);\\n\\t\\tposition: absolute;\\n\\t\\tinset: 0;\\n\\t\\tz-index: 10;\\n\\t}\\n\\n\\t:global(.sonner-loading-wrapper[data-visible='false']) {\\n\\t\\ttransform-origin: center;\\n\\t\\tanimation: sonner-fade-out 0.2s ease forwards;\\n\\t}\\n\\n\\t:global(.sonner-spinner) {\\n\\t\\tposition: relative;\\n\\t\\ttop: 50%;\\n\\t\\tleft: 50%;\\n\\t\\theight: var(--size);\\n\\t\\twidth: var(--size);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar) {\\n\\t\\tanimation: sonner-spin 1.2s linear infinite;\\n\\t\\tbackground: var(--gray11);\\n\\t\\tborder-radius: 6px;\\n\\t\\theight: 8%;\\n\\t\\tleft: -10%;\\n\\t\\tposition: absolute;\\n\\t\\ttop: -3.9%;\\n\\t\\twidth: 24%;\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(1)) {\\n\\t\\tanimation-delay: -1.2s;\\n\\t\\ttransform: rotate(0.0001deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(2)) {\\n\\t\\tanimation-delay: -1.1s;\\n\\t\\ttransform: rotate(30deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(3)) {\\n\\t\\tanimation-delay: -1s;\\n\\t\\ttransform: rotate(60deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(4)) {\\n\\t\\tanimation-delay: -0.9s;\\n\\t\\ttransform: rotate(90deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(5)) {\\n\\t\\tanimation-delay: -0.8s;\\n\\t\\ttransform: rotate(120deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(6)) {\\n\\t\\tanimation-delay: -0.7s;\\n\\t\\ttransform: rotate(150deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(7)) {\\n\\t\\tanimation-delay: -0.6s;\\n\\t\\ttransform: rotate(180deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(8)) {\\n\\t\\tanimation-delay: -0.5s;\\n\\t\\ttransform: rotate(210deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(9)) {\\n\\t\\tanimation-delay: -0.4s;\\n\\t\\ttransform: rotate(240deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(10)) {\\n\\t\\tanimation-delay: -0.3s;\\n\\t\\ttransform: rotate(270deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(11)) {\\n\\t\\tanimation-delay: -0.2s;\\n\\t\\ttransform: rotate(300deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(12)) {\\n\\t\\tanimation-delay: -0.1s;\\n\\t\\ttransform: rotate(330deg) translate(146%);\\n\\t}\\n\\n\\t@keyframes -global-sonner-fade-in {\\n\\t\\t0% {\\n\\t\\t\\topacity: 0;\\n\\t\\t\\ttransform: scale(0.8);\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\topacity: 1;\\n\\t\\t\\ttransform: scale(1);\\n\\t\\t}\\n\\t}\\n\\n\\t@keyframes -global-sonner-fade-out {\\n\\t\\t0% {\\n\\t\\t\\topacity: 1;\\n\\t\\t\\ttransform: scale(1);\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\topacity: 0;\\n\\t\\t\\ttransform: scale(0.8);\\n\\t\\t}\\n\\t}\\n\\n\\t@keyframes -global-sonner-spin {\\n\\t\\t0% {\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\topacity: 0.15;\\n\\t\\t}\\n\\t}\\n\\n\\t@media (prefers-reduced-motion) {\\n\\t\\t:global([data-sonner-toast]),\\n\\t\\t:global([data-sonner-toast]) > :global(*),\\n\\t\\t:global(.sonner-loading-bar) {\\n\\t\\t\\ttransition: none !important;\\n\\t\\t\\tanimation: none !important;\\n\\t\\t}\\n\\t}\\n\\n\\t:global(.sonner-loader) {\\n\\t\\tposition: absolute;\\n\\t\\ttop: 50%;\\n\\t\\tleft: 50%;\\n\\t\\ttransform: translate(-50%, -50%);\\n\\t\\ttransform-origin: center;\\n\\t\\ttransition:\\n\\t\\t\\topacity 200ms,\\n\\t\\t\\ttransform 200ms;\\n\\t}\\n\\n\\t:global(.sonner-loader[data-visible='false']) {\\n\\t\\topacity: 0;\\n\\t\\ttransform: scale(0.8) translate(-50%, -50%);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"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"}`
};
const VISIBLE_TOASTS_AMOUNT = 3;
const VIEWPORT_OFFSET = "32px";
const TOAST_WIDTH = 356;
const GAP = 14;
const DARK = "dark";
const LIGHT = "light";
function getInitialTheme(t) {
  if (t !== "system") {
    return t;
  }
  if (typeof window !== "undefined") {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return DARK;
    }
    return LIGHT;
  }
  return LIGHT;
}
function getDocumentDirection() {
  if (typeof window === "undefined")
    return "ltr";
  if (typeof document === "undefined")
    return "ltr";
  const dirAttribute = document.documentElement.getAttribute("dir");
  if (dirAttribute === "auto" || !dirAttribute) {
    return window.getComputedStyle(document.documentElement).direction;
  }
  return dirAttribute;
}
const Toaster = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let possiblePositions;
  let hotkeyLabel;
  let $$restProps = compute_rest_props($$props, [
    "invert",
    "theme",
    "position",
    "hotkey",
    "richColors",
    "expand",
    "duration",
    "visibleToasts",
    "closeButton",
    "toastOptions",
    "offset",
    "dir"
  ]);
  let $toasts, $$unsubscribe_toasts;
  let $heights, $$unsubscribe_heights;
  let { invert = false } = $$props;
  let { theme = "light" } = $$props;
  let { position = "bottom-right" } = $$props;
  let { hotkey = ["altKey", "KeyT"] } = $$props;
  let { richColors = false } = $$props;
  let { expand = false } = $$props;
  let { duration = 4e3 } = $$props;
  let { visibleToasts = VISIBLE_TOASTS_AMOUNT } = $$props;
  let { closeButton = false } = $$props;
  let { toastOptions = {} } = $$props;
  let { offset = null } = $$props;
  let { dir = getDocumentDirection() } = $$props;
  const { toasts, heights, reset } = toastState;
  $$unsubscribe_toasts = subscribe(toasts, (value) => $toasts = value);
  $$unsubscribe_heights = subscribe(heights, (value) => $heights = value);
  let expanded = false;
  let interacting = false;
  let actualTheme = getInitialTheme(theme);
  let listRef;
  onDestroy(() => {
  });
  if ($$props.invert === void 0 && $$bindings.invert && invert !== void 0)
    $$bindings.invert(invert);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.hotkey === void 0 && $$bindings.hotkey && hotkey !== void 0)
    $$bindings.hotkey(hotkey);
  if ($$props.richColors === void 0 && $$bindings.richColors && richColors !== void 0)
    $$bindings.richColors(richColors);
  if ($$props.expand === void 0 && $$bindings.expand && expand !== void 0)
    $$bindings.expand(expand);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.visibleToasts === void 0 && $$bindings.visibleToasts && visibleToasts !== void 0)
    $$bindings.visibleToasts(visibleToasts);
  if ($$props.closeButton === void 0 && $$bindings.closeButton && closeButton !== void 0)
    $$bindings.closeButton(closeButton);
  if ($$props.toastOptions === void 0 && $$bindings.toastOptions && toastOptions !== void 0)
    $$bindings.toastOptions(toastOptions);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
    $$bindings.offset(offset);
  if ($$props.dir === void 0 && $$bindings.dir && dir !== void 0)
    $$bindings.dir(dir);
  $$result.css.add(css$5);
  possiblePositions = Array.from(new Set([
    position,
    ...$toasts.filter((toast) => toast.position).map((toast) => toast.position)
  ].filter(Boolean)));
  hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
  {
    if ($toasts.length <= 1) {
      expanded = false;
    }
  }
  {
    {
      const toastsToDismiss = $toasts.filter((toast) => toast.dismiss && !toast.delete);
      if (toastsToDismiss.length > 0) {
        const updatedToasts = $toasts.map((toast) => {
          const matchingToast = toastsToDismiss.find((dismissToast) => dismissToast.id === toast.id);
          if (matchingToast) {
            return { ...toast, delete: true };
          }
          return toast;
        });
        toasts.set(updatedToasts);
      }
    }
  }
  {
    {
      if (theme !== "system") {
        actualTheme = theme;
      }
      if (typeof window !== "undefined") {
        if (theme === "system") {
          if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            actualTheme = DARK;
          } else {
            actualTheme = LIGHT;
          }
        }
        const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
        const changeHandler = ({ matches }) => {
          actualTheme = matches ? DARK : LIGHT;
        };
        if ("addEventListener" in mediaQueryList) {
          mediaQueryList.addEventListener("change", changeHandler);
        } else {
          mediaQueryList.addListener(changeHandler);
        }
      }
    }
  }
  $$unsubscribe_toasts();
  $$unsubscribe_heights();
  return `${$toasts.length > 0 ? `<section${add_attribute("aria-label", `Notifications ${hotkeyLabel}`, 0)}${add_attribute("tabindex", -1, 0)}>${each(possiblePositions, (position2, index) => {
    return `<ol${spread(
      [
        { tabindex: escape_attribute_value(-1) },
        {
          class: escape_attribute_value($$props.class)
        },
        { "data-sonner-toaster": true },
        {
          "data-theme": escape_attribute_value(actualTheme)
        },
        {
          "data-rich-colors": escape_attribute_value(richColors)
        },
        {
          dir: escape_attribute_value(dir === "auto" ? getDocumentDirection() : dir)
        },
        {
          "data-y-position": escape_attribute_value(position2.split("-")[0])
        },
        {
          "data-x-position": escape_attribute_value(position2.split("-")[1])
        },
        {
          style: escape_attribute_value($$props.style)
        },
        escape_object($$restProps)
      ],
      {
        styles: {
          "--front-toast-height": `${$heights[0]?.height}px`,
          "--offset": typeof offset === "number" ? `${offset}px` : offset || VIEWPORT_OFFSET,
          "--width": `${TOAST_WIDTH}px`,
          "--gap": `${GAP}px`
        }
      }
    )}${add_attribute("this", listRef, 0)}>${each($toasts.filter((toast) => !toast.position && index === 0 || toast.position === position2), (toast, index2) => {
      return `${validate_component(Toast, "Toast").$$render(
        $$result,
        {
          index: index2,
          toast,
          invert,
          visibleToasts,
          closeButton,
          interacting,
          position: position2,
          expandByDefault: expand,
          expanded,
          actionButtonStyle: toastOptions?.actionButtonStyle || "",
          cancelButtonStyle: toastOptions?.cancelButtonStyle || "",
          class: toastOptions?.class || "",
          descriptionClass: toastOptions?.descriptionClass || "",
          classes: toastOptions.classes || {},
          duration: toastOptions?.duration ?? duration,
          unstyled: toastOptions.unstyled || false
        },
        {},
        {
          "info-icon": () => {
            return `${slots["info-icon"] ? slots["info-icon"]({ slot: "info-icon" }) : ` ${validate_component(Icon, "Icon").$$render($$result, { type: "info" }, {}, {})} `}`;
          },
          "warning-icon": () => {
            return `${slots["warning-icon"] ? slots["warning-icon"]({ slot: "warning-icon" }) : ` ${validate_component(Icon, "Icon").$$render($$result, { type: "warning" }, {}, {})} `}`;
          },
          "error-icon": () => {
            return `${slots["error-icon"] ? slots["error-icon"]({ slot: "error-icon" }) : ` ${validate_component(Icon, "Icon").$$render($$result, { type: "error" }, {}, {})} `}`;
          },
          "success-icon": () => {
            return `${slots["success-icon"] ? slots["success-icon"]({ slot: "success-icon" }) : ` ${validate_component(Icon, "Icon").$$render($$result, { type: "success" }, {}, {})} `}`;
          },
          "loading-icon": () => {
            return `${slots["loading-icon"] ? slots["loading-icon"]({ slot: "loading-icon" }) : ` ${validate_component(Loader, "Loader").$$render($$result, { visible: toast.type === "loading" }, {}, {})} `}`;
          }
        }
      )}`;
    })} </ol>`;
  })}</section>` : ``}`;
});
const svgLogo = "/_app/immutable/assets/metastellar_Logo.C-bnaBLI.svg";
const ConnectImg = "/_app/immutable/assets/Connect.Bk3XjaqP.gif";
function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
const ToolbarButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "name", "ariaLabel", "size", "href"]);
  const background = getContext("background");
  let { color = "default" } = $$props;
  let { name = void 0 } = $$props;
  let { ariaLabel = void 0 } = $$props;
  let { size = "md" } = $$props;
  let { href = void 0 } = $$props;
  const colors = {
    dark: "text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600",
    gray: "text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300",
    red: "text-red-500 focus:ring-red-400 hover:bg-red-200 dark:hover:bg-red-800 dark:hover:text-red-300",
    yellow: "text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800 dark:hover:text-yellow-300",
    green: "text-green-500 focus:ring-green-400 hover:bg-green-200 dark:hover:bg-green-800 dark:hover:text-green-300",
    indigo: "text-indigo-500 focus:ring-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 dark:hover:text-indigo-300",
    purple: "text-purple-500 focus:ring-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800 dark:hover:text-purple-300",
    pink: "text-pink-500 focus:ring-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 dark:hover:text-pink-300",
    blue: "text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 dark:hover:text-blue-300",
    primary: "text-primary-500 focus:ring-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 dark:hover:text-primary-300",
    default: "focus:ring-gray-400 hover:bg-gray-100"
  };
  const sizing = {
    xs: "m-0.5 rounded-sm focus:ring-1 p-0.5",
    sm: "m-0.5 rounded focus:ring-1 p-0.5",
    md: "m-0.5 rounded-lg focus:ring-2 p-1.5",
    lg: "m-0.5 rounded-lg focus:ring-2 p-2.5"
  };
  let buttonClass;
  const svgSizes = {
    xs: "w-3 h-3",
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-5 h-5"
  };
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  buttonClass = twMerge(
    "focus:outline-none whitespace-normal",
    sizing[size],
    colors[color],
    color === "default" && (background ? "dark:hover:bg-gray-600" : "dark:hover:bg-gray-700"),
    $$props.class
  );
  return `${href ? `<a${spread(
    [
      { href: escape_attribute_value(href) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(buttonClass)
      },
      {
        "aria-label": escape_attribute_value(ariaLabel ?? name)
      }
    ],
    {}
  )}>${name ? `<span class="sr-only">${escape(name)}</span>` : ``} ${slots.default ? slots.default({ svgSize: svgSizes[size] }) : ``}</a>` : `<button${spread(
    [
      { type: "button" },
      escape_object($$restProps),
      {
        class: escape_attribute_value(buttonClass)
      },
      {
        "aria-label": escape_attribute_value(ariaLabel ?? name)
      }
    ],
    {}
  )}>${name ? `<span class="sr-only">${escape(name)}</span>` : ``} ${slots.default ? slots.default({ svgSize: svgSizes[size] }) : ``}</button>`} `;
});
const CloseButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["name"]);
  let { name = "Close" } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, Object.assign({}, { name }, $$restProps, { class: twMerge("ms-auto", $$props.class) }), {}, {
    default: ({ svgSize }) => {
      return `<svg${add_attribute("class", svgSize, 0)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
    }
  })} `;
});
const baseClass = "font-medium inline-flex items-center justify-center px-2.5 py-0.5";
const Badge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "large", "dismissable", "border", "href", "rounded", "transition", "params"]);
  createEventDispatcher();
  let { color = "primary" } = $$props;
  let { large = false } = $$props;
  let { dismissable = false } = $$props;
  let { border = false } = $$props;
  let { href = "" } = $$props;
  let { rounded = false } = $$props;
  let { transition = fade } = $$props;
  let { params = {} } = $$props;
  let badgeStatus = true;
  const colors = {
    primary: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300",
    dark: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    pink: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    none: ""
  };
  const borderedColors = {
    primary: "bg-primary-100 text-primary-800 dark:bg-gray-700 dark:text-primary-400 border-primary-400 dark:border-primary-400",
    dark: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border-gray-400 dark:border-gray-400",
    blue: "bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400 border-blue-400 dark:border-blue-400",
    red: "bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border-red-400 dark:border-red-400",
    green: "bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border-green-400 dark:border-green-400",
    yellow: "bg-yellow-100 text-yellow-800 dark:bg-gray-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-300",
    indigo: "bg-indigo-100 text-indigo-800 dark:bg-gray-700 dark:text-indigo-400 border-indigo-400 dark:border-indigo-400",
    purple: "bg-purple-100 text-purple-800 dark:bg-gray-700 dark:text-purple-400 border-purple-400 dark:border-purple-400",
    pink: "bg-pink-100 text-pink-800 dark:bg-gray-700 dark:text-pink-400 border-pink-400 dark:border-pink-400",
    none: ""
  };
  const hoverColors = {
    primary: "hover:bg-primary-200",
    dark: "hover:bg-gray-200",
    blue: "hover:bg-blue-200",
    red: "hover:bg-red-200",
    green: "hover:bg-green-200",
    yellow: "hover:bg-yellow-200",
    indigo: "hover:bg-indigo-200",
    purple: "hover:bg-purple-200",
    pink: "hover:bg-pink-200",
    none: ""
  };
  const close = () => {
    badgeStatus = false;
  };
  let badgeClass;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.large === void 0 && $$bindings.large && large !== void 0)
    $$bindings.large(large);
  if ($$props.dismissable === void 0 && $$bindings.dismissable && dismissable !== void 0)
    $$bindings.dismissable(dismissable);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  badgeClass = twMerge(
    baseClass,
    large ? "text-sm" : "text-xs",
    border ? `border ${borderedColors[color]}` : colors[color],
    href && hoverColors[color],
    rounded ? "rounded-full" : "rounded",
    $$restProps.class
  );
  return `${badgeStatus ? `<div${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(badgeClass)
      }
    ],
    {}
  )}>${href ? `<a${add_attribute("href", href, 0)}>${slots.default ? slots.default({}) : ``}</a>` : `${slots.default ? slots.default({}) : ``}`} ${dismissable ? `${slots["close-button"] ? slots["close-button"]({ close }) : ` ${validate_component(CloseButton, "CloseButton").$$render(
    $$result,
    {
      divclass: "ms-1.5 -me-1.5",
      color,
      size: large ? "sm" : "xs",
      ariaLabel: "Remove badge"
    },
    {},
    {}
  )} `}` : ``}</div>` : ``} `;
});
const Popper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let middleware;
  let $$restProps = compute_rest_props($$props, [
    "activeContent",
    "arrow",
    "offset",
    "placement",
    "trigger",
    "triggeredBy",
    "reference",
    "strategy",
    "open",
    "yOnly",
    "middlewares"
  ]);
  let { activeContent = false } = $$props;
  let { arrow = true } = $$props;
  let { offset = 8 } = $$props;
  let { placement = "top" } = $$props;
  let { trigger = "hover" } = $$props;
  let { triggeredBy = void 0 } = $$props;
  let { reference = void 0 } = $$props;
  let { strategy = "absolute" } = $$props;
  let { open = false } = $$props;
  let { yOnly = false } = $$props;
  let { middlewares = [dom.flip(), dom.shift()] } = $$props;
  const dispatch = createEventDispatcher();
  let referenceEl;
  let floatingEl;
  let arrowEl;
  let contentEl;
  const px = (n) => n != null ? `${n}px` : "";
  let arrowSide;
  const oppositeSideMap = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  function updatePosition() {
    dom.computePosition(referenceEl, floatingEl, { placement, strategy, middleware }).then(({ x, y, middlewareData, placement: placement2, strategy: strategy2 }) => {
      floatingEl.style.position = strategy2;
      floatingEl.style.left = yOnly ? "0" : px(x);
      floatingEl.style.top = px(y);
      if (middlewareData.arrow && arrowEl instanceof HTMLDivElement) {
        arrowEl.style.left = px(middlewareData.arrow.x);
        arrowEl.style.top = px(middlewareData.arrow.y);
        arrowSide = oppositeSideMap[placement2.split("-")[0]];
        arrowEl.style[arrowSide] = px(-arrowEl.offsetWidth / 2 - ($$props.border ? 1 : 0));
      }
    });
  }
  function init(node, _referenceEl) {
    floatingEl = node;
    let cleanup = dom.autoUpdate(_referenceEl, floatingEl, updatePosition);
    return {
      update(_referenceEl2) {
        cleanup();
        cleanup = dom.autoUpdate(_referenceEl2, floatingEl, updatePosition);
      },
      destroy() {
        cleanup();
      }
    };
  }
  let arrowClass;
  if ($$props.activeContent === void 0 && $$bindings.activeContent && activeContent !== void 0)
    $$bindings.activeContent(activeContent);
  if ($$props.arrow === void 0 && $$bindings.arrow && arrow !== void 0)
    $$bindings.arrow(arrow);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
    $$bindings.offset(offset);
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
    $$bindings.placement(placement);
  if ($$props.trigger === void 0 && $$bindings.trigger && trigger !== void 0)
    $$bindings.trigger(trigger);
  if ($$props.triggeredBy === void 0 && $$bindings.triggeredBy && triggeredBy !== void 0)
    $$bindings.triggeredBy(triggeredBy);
  if ($$props.reference === void 0 && $$bindings.reference && reference !== void 0)
    $$bindings.reference(reference);
  if ($$props.strategy === void 0 && $$bindings.strategy && strategy !== void 0)
    $$bindings.strategy(strategy);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.yOnly === void 0 && $$bindings.yOnly && yOnly !== void 0)
    $$bindings.yOnly(yOnly);
  if ($$props.middlewares === void 0 && $$bindings.middlewares && middlewares !== void 0)
    $$bindings.middlewares(middlewares);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      dispatch("show", open);
    }
    placement && (referenceEl = referenceEl);
    middleware = [
      ...middlewares,
      dom.offset(+offset),
      arrowEl
    ];
    arrowClass = twJoin("absolute pointer-events-none block w-[10px] h-[10px] rotate-45 bg-inherit border-inherit", $$props.border && arrowSide === "bottom" && "border-b border-e", $$props.border && arrowSide === "top" && "border-t border-s ", $$props.border && arrowSide === "right" && "border-t border-e ", $$props.border && arrowSide === "left" && "border-b border-s ");
    $$rendered = `${!referenceEl ? `<div${add_attribute("this", contentEl, 0)}></div>` : ``} ${referenceEl ? `${validate_component(Frame, "Frame").$$render(
      $$result,
      Object.assign({}, { use: init }, { options: referenceEl }, { role: "tooltip" }, { tabindex: activeContent ? -1 : void 0 }, $$restProps, { open }),
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``} ${arrow ? `<div${add_attribute("class", arrowClass, 0)}></div>` : ``}`;
        }
      }
    )}` : ``} `;
  } while (!$$settled);
  return $$rendered;
});
const colorClasses = {
  primary: "text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600",
  secondary: "text-secondary-600 focus:ring-secondary-500 dark:focus:ring-secondary-600",
  red: "text-red-600 focus:ring-red-500 dark:focus:ring-red-600",
  green: "text-green-600 focus:ring-green-500 dark:focus:ring-green-600",
  purple: "text-purple-600 focus:ring-purple-500 dark:focus:ring-purple-600",
  teal: "text-teal-600 focus:ring-teal-500 dark:focus:ring-teal-600",
  yellow: "text-yellow-400 focus:ring-yellow-500 dark:focus:ring-yellow-600",
  orange: "text-orange-500 focus:ring-orange-500 dark:focus:ring-orange-600",
  blue: "text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600"
};
const labelClass = (inline, extraClass) => twMerge(inline ? "inline-flex" : "flex", "items-center", extraClass);
const inputClass = (custom, color, rounded, tinted, spacing, extraClass) => twMerge(
  "w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2",
  spacing,
  tinted ? "dark:bg-gray-600 dark:border-gray-500" : "dark:bg-gray-700 dark:border-gray-600",
  custom && "sr-only peer",
  "rounded",
  colorClasses[color],
  extraClass
);
const Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "name",
    "color",
    "custom",
    "inline",
    "group",
    "choices",
    "value",
    "checked",
    "spacing",
    "groupLabelClass",
    "groupInputClass"
  ]);
  let $$slots = compute_slots(slots);
  let { name = void 0 } = $$props;
  let { color = "primary" } = $$props;
  let { custom = false } = $$props;
  let { inline = false } = $$props;
  let { group = [] } = $$props;
  let { choices = [] } = $$props;
  let { value = "on" } = $$props;
  let { checked = void 0 } = $$props;
  let { spacing = $$slots.default ? "me-2" : "" } = $$props;
  let { groupLabelClass = "" } = $$props;
  let { groupInputClass = "" } = $$props;
  let background = getContext("background");
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.custom === void 0 && $$bindings.custom && custom !== void 0)
    $$bindings.custom(custom);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.choices === void 0 && $$bindings.choices && choices !== void 0)
    $$bindings.choices(choices);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.groupLabelClass === void 0 && $$bindings.groupLabelClass && groupLabelClass !== void 0)
    $$bindings.groupLabelClass(groupLabelClass);
  if ($$props.groupInputClass === void 0 && $$bindings.groupInputClass && groupInputClass !== void 0)
    $$bindings.groupInputClass(groupInputClass);
  return `${choices.length > 0 ? `${each(choices, ({ value: value2, label }, i) => {
    return `${validate_component(Label, "Label").$$render(
      $$result,
      {
        class: labelClass(inline, groupLabelClass),
        show: $$slots.default,
        for: `checkbox-${i}`
      },
      {},
      {
        default: () => {
          return `${escape(label)} <input${spread(
            [
              { name: escape_attribute_value(name) },
              {
                id: escape_attribute_value(`checkbox-${i}`)
              },
              { type: "checkbox" },
              { value: escape_attribute_value(value2) },
              escape_object($$restProps),
              {
                class: escape_attribute_value(inputClass(custom, color, true, background, spacing, groupInputClass))
              }
            ],
            {}
          )}${~group.indexOf(value2) ? add_attribute("checked", true, 1) : ""}> ${slots.default ? slots.default({}) : ``} `;
        }
      }
    )}`;
  })}` : `${validate_component(Label, "Label").$$render(
    $$result,
    {
      class: labelClass(inline, $$props.class),
      show: $$slots.default
    },
    {},
    {
      default: () => {
        return `<input${spread(
          [
            { name: escape_attribute_value(name) },
            { type: "checkbox" },
            { value: escape_attribute_value(value) },
            escape_object($$restProps),
            {
              class: escape_attribute_value(inputClass(custom, color, true, background, spacing, $$slots.default || $$props.class))
            }
          ],
          {}
        )}${add_attribute("checked", checked, 1)}> ${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`} `;
});
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let backdropCls;
  let dialogCls;
  let frameCls;
  let headerCls;
  let bodyCls;
  let footerCls;
  let $$restProps = compute_rest_props($$props, [
    "open",
    "title",
    "size",
    "color",
    "placement",
    "autoclose",
    "outsideclose",
    "dismissable",
    "backdropClass",
    "classBackdrop",
    "dialogClass",
    "classDialog",
    "defaultClass",
    "headerClass",
    "classHeader",
    "bodyClass",
    "classBody",
    "footerClass",
    "classFooter"
  ]);
  let $$slots = compute_slots(slots);
  let { open = false } = $$props;
  let { title = "" } = $$props;
  let { size = "md" } = $$props;
  let { color = "default" } = $$props;
  let { placement = "center" } = $$props;
  let { autoclose = false } = $$props;
  let { outsideclose = false } = $$props;
  let { dismissable = true } = $$props;
  let { backdropClass = "fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80" } = $$props;
  let { classBackdrop = void 0 } = $$props;
  let { dialogClass = "fixed top-0 start-0 end-0 h-modal md:inset-0 md:h-full z-50 w-full p-4 flex" } = $$props;
  let { classDialog = void 0 } = $$props;
  let { defaultClass = "relative flex flex-col mx-auto" } = $$props;
  let { headerClass = "flex justify-between items-center p-4 md:p-5 rounded-t-lg" } = $$props;
  let { classHeader = void 0 } = $$props;
  let { bodyClass = "p-4 md:p-5 space-y-4 flex-1 overflow-y-auto overscroll-contain" } = $$props;
  let { classBody = void 0 } = $$props;
  let { footerClass = "flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse rounded-b-lg" } = $$props;
  let { classFooter = void 0 } = $$props;
  const dispatch = createEventDispatcher();
  const getPlacementClasses = (placement2) => {
    switch (placement2) {
      case "top-left":
        return ["justify-start", "items-start"];
      case "top-center":
        return ["justify-center", "items-start"];
      case "top-right":
        return ["justify-end", "items-start"];
      case "center-left":
        return ["justify-start", "items-center"];
      case "center":
        return ["justify-center", "items-center"];
      case "center-right":
        return ["justify-end", "items-center"];
      case "bottom-left":
        return ["justify-start", "items-end"];
      case "bottom-center":
        return ["justify-center", "items-end"];
      case "bottom-right":
        return ["justify-end", "items-end"];
      default:
        return ["justify-center", "items-center"];
    }
  };
  const sizes = {
    xs: "max-w-md",
    sm: "max-w-lg",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-7xl"
  };
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
    $$bindings.placement(placement);
  if ($$props.autoclose === void 0 && $$bindings.autoclose && autoclose !== void 0)
    $$bindings.autoclose(autoclose);
  if ($$props.outsideclose === void 0 && $$bindings.outsideclose && outsideclose !== void 0)
    $$bindings.outsideclose(outsideclose);
  if ($$props.dismissable === void 0 && $$bindings.dismissable && dismissable !== void 0)
    $$bindings.dismissable(dismissable);
  if ($$props.backdropClass === void 0 && $$bindings.backdropClass && backdropClass !== void 0)
    $$bindings.backdropClass(backdropClass);
  if ($$props.classBackdrop === void 0 && $$bindings.classBackdrop && classBackdrop !== void 0)
    $$bindings.classBackdrop(classBackdrop);
  if ($$props.dialogClass === void 0 && $$bindings.dialogClass && dialogClass !== void 0)
    $$bindings.dialogClass(dialogClass);
  if ($$props.classDialog === void 0 && $$bindings.classDialog && classDialog !== void 0)
    $$bindings.classDialog(classDialog);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  if ($$props.headerClass === void 0 && $$bindings.headerClass && headerClass !== void 0)
    $$bindings.headerClass(headerClass);
  if ($$props.classHeader === void 0 && $$bindings.classHeader && classHeader !== void 0)
    $$bindings.classHeader(classHeader);
  if ($$props.bodyClass === void 0 && $$bindings.bodyClass && bodyClass !== void 0)
    $$bindings.bodyClass(bodyClass);
  if ($$props.classBody === void 0 && $$bindings.classBody && classBody !== void 0)
    $$bindings.classBody(classBody);
  if ($$props.footerClass === void 0 && $$bindings.footerClass && footerClass !== void 0)
    $$bindings.footerClass(footerClass);
  if ($$props.classFooter === void 0 && $$bindings.classFooter && classFooter !== void 0)
    $$bindings.classFooter(classFooter);
  {
    dispatch(open ? "open" : "close");
  }
  backdropCls = twMerge(backdropClass, classBackdrop);
  dialogCls = twMerge(dialogClass, classDialog, getPlacementClasses(placement));
  frameCls = twMerge(defaultClass, "w-full divide-y", $$props.class);
  headerCls = twMerge(headerClass, classHeader);
  bodyCls = twMerge(bodyClass, classBody);
  footerCls = twMerge(footerClass, classFooter);
  return `${open ? ` <div${add_attribute("class", backdropCls, 0)}></div>   <div${add_attribute("class", dialogCls, 0)} tabindex="-1" aria-modal="true" role="dialog"><div class="${"flex relative " + escape(sizes[size], true) + " w-full max-h-full"}"> ${validate_component(Frame, "Frame").$$render($$result, Object.assign({}, { rounded: true }, { shadow: true }, $$restProps, { class: frameCls }, { color }), {}, {
    default: () => {
      return ` ${$$slots.header || title ? `${validate_component(Frame, "Frame").$$render($$result, { class: headerCls, color }, {}, {
        default: () => {
          return `${slots.header ? slots.header({}) : ` <h3 class="${"text-xl font-semibold " + escape(
            color === "default" ? "" : "text-gray-900 dark:text-white",
            true
          ) + " p-0"}">${escape(title)}</h3> `} ${dismissable ? `${validate_component(CloseButton, "CloseButton").$$render($$result, { name: "Close modal", color }, {}, {})}` : ``}`;
        }
      })}` : ``}  <div${add_attribute("class", bodyCls, 0)} role="document">${dismissable && !$$slots.header && !title ? `${validate_component(CloseButton, "CloseButton").$$render(
        $$result,
        {
          name: "Close modal",
          class: "absolute top-3 end-2.5",
          color
        },
        {},
        {}
      )}` : ``} ${slots.default ? slots.default({}) : ``}</div>  ${$$slots.footer ? `${validate_component(Frame, "Frame").$$render($$result, { class: footerCls, color }, {}, {
        default: () => {
          return `${slots.footer ? slots.footer({}) : ``}`;
        }
      })}` : ``}`;
    }
  })}</div></div>` : ``} `;
});
const Popover = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["title", "defaultClass"]);
  let $$slots = compute_slots(slots);
  let { title = "" } = $$props;
  let { defaultClass = "py-2 px-3" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  return `${validate_component(Popper, "Popper").$$render(
    $$result,
    Object.assign({}, { activeContent: true }, { border: true }, { shadow: true }, { rounded: true }, $$restProps, {
      class: "dark:!border-gray-600 " + $$props.class
    }),
    {},
    {
      default: () => {
        return `${$$slots.title || title ? `<div class="py-2 px-3 bg-gray-100 rounded-t-md border-b border-gray-200 dark:border-gray-600 dark:bg-gray-700">${slots.title ? slots.title({}) : ` <h3 class="font-semibold text-gray-900 dark:text-white">${escape(title)}</h3> `}</div>` : ``} <div${add_attribute("class", defaultClass, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
      }
    }
  )} `;
});
const css$4 = {
  code: "@keyframes svelte-1oxqub5-button-press{0%{transform:scale(1)}25%{transform:scale(0.7)}90%{transform:scale(1.5)}100%{transform:scale(1)}}",
  map: '{"version":3,"file":"connectButton.svelte","sources":["connectButton.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { callMetaStellar } from \\"$lib/callMetaStellar\\";\\nimport ConnectImg from \\"$lib/images/Connect.gif\\";\\nimport { fade, scale } from \\"svelte/transition\\";\\nimport { Modal } from \\"flowbite-svelte\\";\\nimport { Button } from \\"flowbite-svelte\\";\\nimport { connected, dataPacket, isTestnet } from \\"$lib/wallet-store\\";\\nlet isPressed = false;\\nfunction pressButton() {\\n  isPressed = true;\\n  setTimeout(() => {\\n    isPressed = false;\\n  }, 200);\\n}\\nlet flaskNotDetected;\\nasync function connectSnap() {\\n  $connected = await callMetaStellar(\\"connect\\", {});\\n  $dataPacket = await callMetaStellar(\\"getDataPacket\\", { testnet: $isTestnet });\\n}\\n<\/script>\\r\\n{#if !($connected)}\\r\\n<Button color=\\"light\\" on:click={connectSnap} src={ConnectImg}>Connect</Button>\\r\\n<Modal title=\\"Flask Not Detected\\" bind:open={flaskNotDetected} autoclose>\\r\\n    <p style=\\"font-size:x-large;\\">This Demo Requires Metamask Flask</p>\\r\\n    <hr/>\\r\\n    <p>Though it will be on standard metamask before too long</p>\\r\\n    <p>Install flask here: <a href=\\"https://metamask.io/flask/\\">https://metamask.io/flask/</a></p>\\r\\n</Modal>\\r\\n{/if}\\r\\n<style>\\r\\n    img{\\r\\n        cursor: pointer;\\r\\n        max-width: 150px; \\r\\n    }\\r\\n    img:hover{\\r\\n        transform: scale(1.1);\\r\\n    }\\r\\n    .buttonPressing {\\r\\n        animation: 0.25s linear 0s  button-press;\\r\\n    }\\r\\n    img:active{       \\r\\n    box-shadow: 0 5px #666;\\r\\n    transform: translateY(4px);\\r\\n    }\\r\\n    @keyframes button-press {\\r\\n     0% { transform: scale(1); }\\r\\n     25%{ transform: scale(0.7); }\\r\\n     90% { transform: scale(1.5); }\\r\\n     100% { transform: scale(1); }\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AA2CI,WAAW,2BAAa,CACvB,EAAG,CAAE,SAAS,CAAE,MAAM,CAAC,CAAG,CAC1B,GAAG,CAAE,SAAS,CAAE,MAAM,GAAG,CAAG,CAC5B,GAAI,CAAE,SAAS,CAAE,MAAM,GAAG,CAAG,CAC7B,IAAK,CAAE,SAAS,CAAE,MAAM,CAAC,CAAG,CAC7B"}'
};
const ConnectButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_isTestnet;
  let $$unsubscribe_dataPacket;
  let $connected, $$unsubscribe_connected;
  $$unsubscribe_isTestnet = subscribe(isTestnet, (value) => value);
  $$unsubscribe_dataPacket = subscribe(dataPacket, (value) => value);
  $$unsubscribe_connected = subscribe(connected, (value) => $connected = value);
  let flaskNotDetected;
  $$result.css.add(css$4);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${!$connected ? `${validate_component(Button, "Button").$$render($$result, { color: "light", src: ConnectImg }, {}, {
      default: () => {
        return `Connect`;
      }
    })} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Flask Not Detected",
        autoclose: true,
        open: flaskNotDetected
      },
      {
        open: ($$value) => {
          flaskNotDetected = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<p style="font-size:x-large;" data-svelte-h="svelte-zk0it1">This Demo Requires Metamask Flask</p> <hr> <p data-svelte-h="svelte-be0z7z">Though it will be on standard metamask before too long</p> <p data-svelte-h="svelte-1f40b51">Install flask here: <a href="https://metamask.io/flask/">https://metamask.io/flask/</a></p>`;
        }
      }
    )}` : ``}`;
  } while (!$$settled);
  $$unsubscribe_isTestnet();
  $$unsubscribe_dataPacket();
  $$unsubscribe_connected();
  return $$rendered;
});
const css$3 = {
  code: '.uk-navbar-container.svelte-1h8emav.svelte-1h8emav{background-color:"white"}.uk-navbar-center.svelte-1h8emav.svelte-1h8emav{width:100%;display:block;background-color:white}#logo.svelte-1h8emav.svelte-1h8emav{width:50%;display:flex;justify-content:left;z-index:5}#logo.svelte-1h8emav .svelte-1h8emav{max-width:250px;min-width:250px}.uk-container.svelte-1h8emav.svelte-1h8emav{background-color:white}.uk-navbar-nav.svelte-1h8emav.svelte-1h8emav{background-color:white}.uk-navbar-container.svelte-1h8emav .svelte-1h8emav{background-color:white}.uk-width-expand.svelte-1h8emav.svelte-1h8emav{display:flex;justify-content:center}hr.svelte-1h8emav.svelte-1h8emav{margin-top:0px}li.svelte-1h8emav a.svelte-1h8emav{font-size:larger}.spaceApart li.svelte-1h8emav .svelte-1h8emav{float:right}ul.svelte-1h8emav.svelte-1h8emav{width:100%}',
  map: `{"version":3,"file":"Header.svelte","sources":["Header.svelte"],"sourcesContent":["<script lang='ts'>import svgLogo from \\"$lib/video/metastellar_Logo.svg\\";\\nimport ConnectButton from \\"../components/connectButton.svelte\\";\\nimport { connected } from \\"$lib/wallet-store\\";\\nimport { Button } from \\"flowbite-svelte\\";\\nlet burger = false;\\nfunction handleResize() {\\n  if (window.innerWidth < 768) {\\n    burger = true;\\n  } else {\\n    burger = false;\\n  }\\n}\\n<\/script>\\r\\n<svelte:window on:resize={handleResize} />\\r\\n<div id=\\"header-container\\" class=\\"uk-container\\">\\r\\n\\t<nav class=\\"uk-navbar-container uk-width-expand\\">\\r\\n\\t  <div class=\\"uk-navbar-center\\">\\r\\n\\t\\t{#if !burger}\\r\\n\\t\\t<ul class=\\"uk-navbar-nav\\">\\r\\n\\t\\t\\t\\r\\n\\t\\t\\t<li id=\\"logo\\" data-uk-hover class=\\"uk-width-auto\\">\\r\\n\\t\\t\\t\\t<a href=\\"/\\">\\r\\n\\t\\t\\t\\t\\t<img class=\\"uk-logo uk-width-2-3\\" src={svgLogo} alt=\\"Metastellar Logo\\"/>\\r\\n\\t\\t\\t\\t</a>\\r\\n\\t\\t\\t</li>\\r\\n\\t\\t\\t<li data-uk-hover class=\\"uk-width-1-6\\"><a href=\\"/wallet\\">Wallet</a></li>\\r\\n\\t\\t\\t<li data-uk-hover class=\\"uk-width-1-6\\"><a href=\\"/faq\\">FAQ</a></li>\\r\\n\\t\\t\\t<li data-uk-hover class=\\"uk-width-1-6\\"><a href=\\"/docs\\">Docs</a></li>\\r\\n\\t\\t\\t<li data-uk-hover class=\\"uk-width-1-6\\">\\r\\n\\t\\t\\t\\t<br/>\\r\\n\\t\\t\\t\\t{#if !($connected)}\\r\\n\\t\\t\\t\\t\\t<ConnectButton/>\\r\\n\\t\\t\\t\\t{:else}\\r\\n\\t\\t\\t\\t\\t<Button color=\\"yellow\\" >Connected</Button>\\r\\n\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t</li>\\r\\n\\t\\t</ul>\\r\\n\\r\\n\\t\\t{:else}\\r\\n\\t\\t<ul class=\\"uk-navbar-nav\\">\\r\\n\\t\\t\\t<li id=\\"logo\\" data-uk-hover class=\\"uk-width-auto\\">\\r\\n\\t\\t\\t\\t<img class=\\"uk-logo uk-width-1-2 uk-logo\\" src={svgLogo} alt=\\"Metastellar Logo\\"/>\\r\\n\\t\\t\\t</li>\\r\\n\\t\\t\\t<li data-uk-hover class=\\"uk-width-1-2\\"><div><ConnectButton/></div></li>\\r\\n\\t\\t</ul>\\r\\n\\t\\t{/if}\\r\\n\\t\\t\\t\\t\\t\\r\\n\\t</div>\\r\\n\\t\\t\\t\\t\\t\\r\\n\\t</nav>\\r\\n\\r\\n</div>\\r\\n<hr/>\\r\\n\\r\\n\\r\\n<style>\\r\\n\\t.uk-navbar-container{\\r\\n\\t\\tbackground-color: \\"white\\";\\r\\n\\t}\\r\\n\\t.uk-navbar-center{\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\tdisplay: block;\\r\\n\\t\\tbackground-color: white;\\r\\n\\t}\\r\\n\\t#logo{\\r\\n\\t\\twidth:50%;\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tjustify-content: left;\\r\\n\\t\\tz-index: 5;\\r\\n\\t}\\r\\n\\t#logo *{\\r\\n\\t\\tmax-width: 250px;\\r\\n\\t\\tmin-width: 250px;\\r\\n\\t}\\r\\n\\tvideo{\\r\\n\\t\\tborder:none;\\r\\n\\t\\tclip-path: inset(1px 1px);\\r\\n\\t}\\r\\n\\t.uk-container{\\r\\n\\t\\tbackground-color: white;\\r\\n\\t}\\r\\n\\t.uk-navbar-nav{\\r\\n\\t\\tbackground-color: white;\\r\\n\\t}\\r\\n\\t.uk-navbar-left{\\r\\n\\t\\tbackground-color: white;\\r\\n\\t}\\r\\n\\t.uk-navbar-container *{\\r\\n\\t\\tbackground-color: white;\\r\\n\\t}\\r\\n\\t.uk-width-expand{\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t}\\r\\n\\thr{\\r\\n\\t\\tmargin-top: 0px;\\r\\n\\t\\t\\r\\n\\t}\\r\\n\\tli a{\\r\\n\\t\\tfont-size: larger;\\r\\n\\t}\\r\\n\\t.spaceApart{\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tjustify-content: space-between;\\r\\n\\t}\\r\\n\\t.spaceApart li{\\r\\n\\t\\tmargin-left: auto;\\r\\n\\t\\tmargin-right: auto;\\r\\n\\t}\\r\\n\\t.spaceApart li *{\\r\\n\\t\\tfloat: right;\\r\\n\\t}\\r\\n\\tul{\\r\\n\\t\\twidth: 100%;\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AAwDC,kDAAoB,CACnB,gBAAgB,CAAE,OACnB,CACA,+CAAiB,CAChB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,KAAK,CACd,gBAAgB,CAAE,KACnB,CACA,mCAAK,CACJ,MAAM,GAAG,CACT,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,CACV,CACA,oBAAK,CAAC,eAAC,CACN,SAAS,CAAE,KAAK,CAChB,SAAS,CAAE,KACZ,CAKA,2CAAa,CACZ,gBAAgB,CAAE,KACnB,CACA,4CAAc,CACb,gBAAgB,CAAE,KACnB,CAIA,mCAAoB,CAAC,eAAC,CACrB,gBAAgB,CAAE,KACnB,CACA,8CAAgB,CACf,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAClB,CACA,gCAAE,CACD,UAAU,CAAE,GAEb,CACA,iBAAE,CAAC,gBAAC,CACH,SAAS,CAAE,MACZ,CAUA,WAAW,CAAC,iBAAE,CAAC,eAAC,CACf,KAAK,CAAE,KACR,CACA,gCAAE,CACD,KAAK,CAAE,IACR"}`
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $connected, $$unsubscribe_connected;
  $$unsubscribe_connected = subscribe(connected, (value) => $connected = value);
  $$result.css.add(css$3);
  $$unsubscribe_connected();
  return ` <div id="header-container" class="uk-container svelte-1h8emav"><nav class="uk-navbar-container uk-width-expand svelte-1h8emav"><div class="uk-navbar-center svelte-1h8emav">${`<ul class="uk-navbar-nav svelte-1h8emav"><li id="logo" data-uk-hover class="uk-width-auto svelte-1h8emav" data-svelte-h="svelte-ju698z"><a href="/" class="svelte-1h8emav"><img class="uk-logo uk-width-2-3 svelte-1h8emav"${add_attribute("src", svgLogo, 0)} alt="Metastellar Logo"></a></li> <li data-uk-hover class="uk-width-1-6 svelte-1h8emav" data-svelte-h="svelte-d39phb"><a href="/wallet" class="svelte-1h8emav">Wallet</a></li> <li data-uk-hover class="uk-width-1-6 svelte-1h8emav" data-svelte-h="svelte-1vis8i3"><a href="/faq" class="svelte-1h8emav">FAQ</a></li> <li data-uk-hover class="uk-width-1-6 svelte-1h8emav" data-svelte-h="svelte-dwtw8j"><a href="/docs" class="svelte-1h8emav">Docs</a></li> <li data-uk-hover class="uk-width-1-6 svelte-1h8emav"><br class="svelte-1h8emav"> ${!$connected ? `${validate_component(ConnectButton, "ConnectButton").$$render($$result, {}, {}, {})}` : `${validate_component(Button, "Button").$$render($$result, { color: "yellow" }, {}, {
    default: () => {
      return `Connected`;
    }
  })}`}</li></ul>`}</div></nav></div> <hr class="svelte-1h8emav">`;
});
const LOGO = "/_app/immutable/assets/metastellar.KSuh_pz3.png";
const RING = "/_app/immutable/assets/ring.B9DW7jKF.png";
const RINGFOREGROUND = "/_app/immutable/assets/ring_foreground.DCLrqf89.png";
const durationUnitRegex = /[a-zA-Z]/;
const range = (size, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt);
const css$2 = {
  code: ".wrapper.svelte-1uhddr4{height:var(--size);width:var(--size);display:flex;justify-content:center;align-items:center}.spinner.svelte-1uhddr4{height:var(--size);width:var(--size);animation:svelte-1uhddr4-rotate var(--duration) infinite linear}.dot.svelte-1uhddr4{width:60%;height:60%;display:inline-block;position:absolute;top:0;background-color:var(--color);border-radius:100%;animation:svelte-1uhddr4-bounce var(--duration) infinite ease-in-out}.pause-animation.svelte-1uhddr4{animation-play-state:paused}@keyframes svelte-1uhddr4-rotate{100%{transform:rotate(360deg)}}@keyframes svelte-1uhddr4-bounce{0%,100%{transform:scale(0)}50%{transform:scale(1)}}",
  map: `{"version":3,"file":"Chasing.svelte","sources":["Chasing.svelte"],"sourcesContent":["<script>import { durationUnitRegex, range } from './utils';\\nexport let color = '#FF3E00';\\nexport let unit = 'px';\\nexport let duration = '2s';\\nexport let size = '60';\\nexport let pause = false;\\nlet durationUnit = duration.match(durationUnitRegex)?.[0] ?? 's';\\nlet durationNum = duration.replace(durationUnitRegex, '');\\n<\/script>\\n\\n<div class=\\"wrapper\\" style=\\"--size: {size}{unit}; --color: {color}; --duration: {duration};\\">\\n\\t<div class=\\"spinner\\" class:pause-animation={pause}>\\n\\t\\t{#each range(2, 0) as version}\\n\\t\\t\\t<div\\n\\t\\t\\t\\tclass=\\"dot\\"\\n\\t\\t\\t\\tclass:pause-animation={pause}\\n\\t\\t\\t\\tstyle=\\"animation-delay: {version === 1\\n\\t\\t\\t\\t\\t? \`\${+durationNum / 2}\${durationUnit}\`\\n\\t\\t\\t\\t\\t: '0s'}; {version === 1 ? 'bottom: 0;' : ''} {version === 1 ? 'top: auto;' : ''}\\"\\n\\t\\t\\t/>\\n\\t\\t{/each}\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.wrapper {\\n\\t\\theight: var(--size);\\n\\t\\twidth: var(--size);\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t\\talign-items: center;\\n\\t}\\n\\t.spinner {\\n\\t\\theight: var(--size);\\n\\t\\twidth: var(--size);\\n\\t\\tanimation: rotate var(--duration) infinite linear;\\n\\t}\\n\\t.dot {\\n\\t\\twidth: 60%;\\n\\t\\theight: 60%;\\n\\t\\tdisplay: inline-block;\\n\\t\\tposition: absolute;\\n\\t\\ttop: 0;\\n\\t\\tbackground-color: var(--color);\\n\\t\\tborder-radius: 100%;\\n\\t\\tanimation: bounce var(--duration) infinite ease-in-out;\\n\\t}\\n\\t.pause-animation {\\n\\t\\tanimation-play-state: paused;\\n\\t}\\n\\n\\t@keyframes rotate {\\n\\t\\t100% {\\n\\t\\t\\ttransform: rotate(360deg);\\n\\t\\t}\\n\\t}\\n\\t@keyframes bounce {\\n\\t\\t0%,\\n\\t\\t100% {\\n\\t\\t\\ttransform: scale(0);\\n\\t\\t}\\n\\t\\t50% {\\n\\t\\t\\ttransform: scale(1);\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAyBC,uBAAS,CACR,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,KAAK,CAAE,IAAI,MAAM,CAAC,CAClB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MACd,CACA,uBAAS,CACR,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,KAAK,CAAE,IAAI,MAAM,CAAC,CAClB,SAAS,CAAE,qBAAM,CAAC,IAAI,UAAU,CAAC,CAAC,QAAQ,CAAC,MAC5C,CACA,mBAAK,CACJ,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,YAAY,CACrB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,gBAAgB,CAAE,IAAI,OAAO,CAAC,CAC9B,aAAa,CAAE,IAAI,CACnB,SAAS,CAAE,qBAAM,CAAC,IAAI,UAAU,CAAC,CAAC,QAAQ,CAAC,WAC5C,CACA,+BAAiB,CAChB,oBAAoB,CAAE,MACvB,CAEA,WAAW,qBAAO,CACjB,IAAK,CACJ,SAAS,CAAE,OAAO,MAAM,CACzB,CACD,CACA,WAAW,qBAAO,CACjB,EAAE,CACF,IAAK,CACJ,SAAS,CAAE,MAAM,CAAC,CACnB,CACA,GAAI,CACH,SAAS,CAAE,MAAM,CAAC,CACnB,CACD"}`
};
const Chasing = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color = "#FF3E00" } = $$props;
  let { unit = "px" } = $$props;
  let { duration = "2s" } = $$props;
  let { size = "60" } = $$props;
  let { pause = false } = $$props;
  let durationUnit = duration.match(durationUnitRegex)?.[0] ?? "s";
  let durationNum = duration.replace(durationUnitRegex, "");
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.unit === void 0 && $$bindings.unit && unit !== void 0)
    $$bindings.unit(unit);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.pause === void 0 && $$bindings.pause && pause !== void 0)
    $$bindings.pause(pause);
  $$result.css.add(css$2);
  return `<div class="wrapper svelte-1uhddr4" style="${"--size: " + escape(size, true) + escape(unit, true) + "; --color: " + escape(color, true) + "; --duration: " + escape(duration, true) + ";"}"><div class="${["spinner svelte-1uhddr4", pause ? "pause-animation" : ""].join(" ").trim()}">${each(range(2, 0), (version) => {
    return `<div class="${["dot svelte-1uhddr4", pause ? "pause-animation" : ""].join(" ").trim()}" style="${"animation-delay: " + escape(
      version === 1 ? `${+durationNum / 2}${durationUnit}` : "0s",
      true
    ) + "; " + escape(version === 1 ? "bottom: 0;" : "", true) + " " + escape(version === 1 ? "top: auto;" : "", true)}"></div>`;
  })}</div> </div>`;
});
const css$1 = {
  code: ".copyContainer.svelte-co5zel{word-break:break-all;width:275px;display:flex;padding:0.5rem;border-radius:25px;background-color:#faf8f8}",
  map: '{"version":3,"file":"InternalWallet.svelte","sources":["InternalWallet.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { testnet } from \\"./../../../store.ts\\";\\nimport { Tabs, TabItem, Button, Popover, Spinner } from \\"flowbite-svelte\\";\\nimport { Checkbox, Badge } from \\"flowbite-svelte\\";\\nimport { callMetaStellar } from \\"$lib/callMetaStellar\\";\\nimport { isTestnet, dataPacket, connected } from \\"$lib/wallet-store\\";\\nimport { Card } from \\"@metastellar/ui-library\\";\\nimport { Chasing } from \\"svelte-loading-spinners\\";\\nlet data = $dataPacket;\\nlet length = $dataPacket.currentAddress.length;\\nlet shortenedAddr = $dataPacket.currentAddress.substring(0, 4) + \\"...\\" + $dataPacket.currentAddress.substring(length - 4, length);\\n$:\\n  shortenedAddr = $dataPacket.currentAddress.substring(0, 4) + \\"...\\" + $dataPacket.currentAddress.substring(length - 4, length);\\n<\/script>\\r\\n<br/>\\r\\n<div style=\\"display:flex; flex-direction:row-reverse;\\">\\r\\n<Checkbox bind:checked={$isTestnet}>testnet</Checkbox>\\r\\n</div>\\r\\n<Card>\\r\\n    {#if ($dataPacket).currentAddress === \\"null\\"}\\r\\n        <Chasing/>\\r\\n    {:else}\\r\\n    <div class=\\"flex gap-x-1\\">\\r\\n        <p>{$dataPacket.name}  </p>\\r\\n        {#if $isTestnet}\\r\\n            <Badge rounded color=\\"green\\">Testnet</Badge>\\r\\n        {/if}\\r\\n        {#if !$isTestnet}\\r\\n            <Badge rounded color=\\"yellow\\">Mainnet</Badge>\\r\\n        {/if}\\r\\n    </div>\\r\\n    <p>{$dataPacket.fedName === null? \\"\\": $dataPacket.fedName}</p>\\r\\n    \\r\\n    <div class=\\"copyContainer\\">\\r\\n        \\r\\n        <p id=\\"addr\\">{shortenedAddr}</p>\\r\\n        <svg xmlns=\\"http://www.w3.org/2000/svg\\" height=\\"24px\\" viewBox=\\"0 -960 960 960\\" width=\\"24px\\" fill=\\"#434343\\"><path d=\\"M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z\\"/></svg>\\r\\n        <Popover triggeredBy=\\"#addr\\" placement=\\"bottom-start\\">\\r\\n            {$dataPacket.currentAddress}\\r\\n        </Popover>\\r\\n    </div>\\r\\n    <p></p>\\r\\n    {/if}\\r\\n</Card>\\r\\n\\r\\n<style>\\r\\n    .copyContainer{\\r\\n        word-break: break-all;\\r\\n        width:275px;\\r\\n        display: flex;\\r\\n        padding:0.5rem;\\r\\n        border-radius: 25px;\\r\\n        background-color: #faf8f8;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AA6CI,4BAAc,CACV,UAAU,CAAE,SAAS,CACrB,MAAM,KAAK,CACX,OAAO,CAAE,IAAI,CACb,QAAQ,MAAM,CACd,aAAa,CAAE,IAAI,CACnB,gBAAgB,CAAE,OACtB"}'
};
const InternalWallet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $dataPacket, $$unsubscribe_dataPacket;
  let $isTestnet, $$unsubscribe_isTestnet;
  $$unsubscribe_dataPacket = subscribe(dataPacket, (value) => $dataPacket = value);
  $$unsubscribe_isTestnet = subscribe(isTestnet, (value) => $isTestnet = value);
  let length = $dataPacket.currentAddress.length;
  let shortenedAddr = $dataPacket.currentAddress.substring(0, 4) + "..." + $dataPacket.currentAddress.substring(length - 4, length);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    shortenedAddr = $dataPacket.currentAddress.substring(0, 4) + "..." + $dataPacket.currentAddress.substring(length - 4, length);
    $$rendered = `<br> <div style="display:flex; flex-direction:row-reverse;">${validate_component(Checkbox, "Checkbox").$$render(
      $$result,
      { checked: $isTestnet },
      {
        checked: ($$value) => {
          $isTestnet = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `testnet`;
        }
      }
    )}</div> ${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return `${$dataPacket.currentAddress === "null" ? `${validate_component(Chasing, "Chasing").$$render($$result, {}, {}, {})}` : `<div class="flex gap-x-1"><p>${escape($dataPacket.name)}</p> ${$isTestnet ? `${validate_component(Badge, "Badge").$$render($$result, { rounded: true, color: "green" }, {}, {
          default: () => {
            return `Testnet`;
          }
        })}` : ``} ${!$isTestnet ? `${validate_component(Badge, "Badge").$$render($$result, { rounded: true, color: "yellow" }, {}, {
          default: () => {
            return `Mainnet`;
          }
        })}` : ``}</div> <p>${escape($dataPacket.fedName === null ? "" : $dataPacket.fedName)}</p> <div class="copyContainer svelte-co5zel"><p id="addr">${escape(shortenedAddr)}</p> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"></path></svg> ${validate_component(Popover, "Popover").$$render(
          $$result,
          {
            triggeredBy: "#addr",
            placement: "bottom-start"
          },
          {},
          {
            default: () => {
              return `${escape($dataPacket.currentAddress)}`;
            }
          }
        )}</div> <p></p>`}`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_dataPacket();
  $$unsubscribe_isTestnet();
  return $$rendered;
});
const css = {
  code: ".chatHeadContainer.svelte-17y9tco{position:fixed;z-index:999999;bottom:2em;right:2em;transition:all 0.4s ease}#chatLOGO.svelte-17y9tco{position:relative;width:100px;height:100px;filter:drop-shadow(1px 11px 11px #333333);animation-name:svelte-17y9tco-chatHeadAnimation;animation-duration:5s;animation-timing-function:ease-in-out;animation-iteration-count:infinite}#chatRing.svelte-17y9tco{position:absolute;border-radius:100%;right:25%;bottom:25%;width:70px;height:70px;cursor:pointer;transform:rotate(30deg);filter:drop-shadow(1px 11px 11px #333333)}#chatRingForeground.svelte-17y9tco{position:absolute;border-radius:100%;transform:rotate(30deg);right:25%;bottom:25%;width:70px;height:70px;cursor:pointer;opacity:0.6}#offcanvas-flip.svelte-17y9tco{position:fixed}.spinning.svelte-17y9tco{animation-name:svelte-17y9tco-spinning;animation-duration:5s;animation-timing-function:linear;animation-iteration-count:infinite}#chatHead.svelte-17y9tco{position:absolute;right:25%;bottom:25%;border-radius:100%;width:75px;height:75px;cursor:pointer}#chatHead.svelte-17y9tco:hover{transform:scale(1.1);animation:none}.uk-offcanvas-bar.svelte-17y9tco{z-index:99999;width:350px;left:-350px;background-color:white;border-radius:1em;color:black;position:fixed}@keyframes svelte-17y9tco-spinning{0%{transform:rotate(0deg) scale(1)}50%{transform:rotate(180deg) scale(1.1)}100%{transform:rotate(360deg) scale(1)}}@keyframes svelte-17y9tco-bellyBreath{0%{transform:scale(1)}50%{transform:scale(1.5)}100%{transform:scale(1)}}@keyframes svelte-17y9tco-chatHeadAnimation{0%{transform:translateY(0) scale(1.00);filter:drop-shadow(1px 6px 11px #333333)}25%{transform:translateY(-2px) scale(0.97);filter:drop-shadow(0px 8px 11px #333333)}75%{transform:translateY(6px) scale(1.03);filter:drop-shadow(0px 4px 16px #333333)}100%{transform:translateY(0) scale(1.00);filter:drop-shadow(1px 6px 11px #333333)}}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["\\r\\n\\r\\n<script lang='ts'>import { connected } from \\"$lib/wallet-store\\";\\nimport { sineIn } from \\"svelte/easing\\";\\nlet hidden1 = true;\\nlet transitionParams = {\\n  x: -320,\\n  duration: 200,\\n  easing: sineIn\\n};\\nimport LOGO from \\"./images/metastellar.png\\";\\nimport RING from \\"./images/ring.png\\";\\nimport RINGFOREGROUND from \\"./images/ring_foreground.png\\";\\nimport { fly, fade } from \\"svelte/transition\\";\\nimport { onMount } from \\"svelte\\";\\nimport { cubicOut } from \\"svelte/easing\\";\\nimport InternalWallet from \\"./InternalWallet.svelte\\";\\nimport ConnectButton from \\"../../../components/connectButton.svelte\\";\\nlet visible = true;\\nexport let chatLoading = true;\\nlet chatHead;\\nonMount(() => {\\n  console.log(chatHead);\\n  chatHead = document.createElement(\\"div\\");\\n});\\nlet chatOpen = false;\\nfunction syncRotations() {\\n  let elements = Array.from(document.getElementsByClassName(\\"spinning\\"));\\n  for (let i = 0; i < elements.length; i++) {\\n    const el = elements[i];\\n    el.style.animation = \\"none\\";\\n    el.offsetHeight;\\n    el.style.animation = null;\\n  }\\n}\\nfunction handleHoverIn() {\\n  let chatHeadImage = document.getElementById(\\"chatHead\\");\\n  let ringImage = document.getElementById(\\"chatRing\\");\\n  let ringForeground = document.getElementById(\\"chatRingForeground\\");\\n  if (ringForeground) {\\n    ringForeground.style.transitionDuration = \\"0.45s\\";\\n    ringForeground.style.opacity = \\"0\\";\\n  }\\n  if (chatHeadImage) {\\n    chatHeadImage.style.scale = \\"1.1\\";\\n  }\\n  if (ringImage) {\\n    ringImage.style.transitionDuration = \\"0.45s\\";\\n    ringImage.style.scale = \\"1.2\\";\\n    ringImage.style.opacity = \\"0.6\\";\\n  }\\n}\\nfunction handleHoverOut() {\\n  let chatHeadImage = document.getElementById(\\"chatHead\\");\\n  let ringImage = document.getElementById(\\"chatRing\\");\\n  let ringForeground = document.getElementById(\\"chatRingForeground\\");\\n  if (ringForeground && !chatOpen) {\\n    ringForeground.style.opacity = \\"0.6\\";\\n  }\\n  if (chatHeadImage) {\\n    chatHeadImage.style.scale = \\"1.0\\";\\n  }\\n  if (ringImage) {\\n    ringImage.style.scale = \\"1.0\\";\\n    ringImage.style.animation = \\"none\\";\\n  }\\n  syncRotations();\\n}\\nfunction toggleChat() {\\n  chatOpen = !chatOpen;\\n  let chatHeadBubble = document.getElementById(\\"chatHeadBubble\\");\\n  let chatLOGO = document.getElementById(\\"chatLOGO\\");\\n  let chatRingForeground = document.getElementById(\\"chatRingForeground\\");\\n  let chatRing = document.getElementById(\\"chatRing\\");\\n  if (chatOpen) {\\n    chatLOGO.style.transitionDuration = \\"0.45s\\";\\n    chatHeadBubble.style.right = \\"250px\\";\\n    setTimeout(() => {\\n      chatHeadBubble.style.transform = \\"Scale(0.6)\\";\\n      chatLOGO.style.padding = \\"5px\\";\\n      chatHeadBubble.style.right = \\"260px\\";\\n      chatRingForeground.style.display = \\"none\\";\\n      chatHeadBubble.style.transitionDuration = \\"0.2s\\";\\n      chatHeadBubble.style.bottom = \\"88vh\\";\\n    }, 400);\\n  } else {\\n    chatHeadBubble.style.transitionDuration = \\"0.2s\\";\\n    chatHeadBubble.style.right = \\"2em\\";\\n    setTimeout(() => {\\n      chatHeadBubble.style.transform = \\"Scale(1)\\";\\n      chatLOGO.style.width = \\"75px\\";\\n      chatLOGO.style.height = \\"75px\\";\\n      chatLOGO.style.transitionDuration = \\"0.45s\\";\\n      chatLOGO.style.padding = \\"10px\\";\\n      chatHeadBubble.style.bottom = \\"2em\\";\\n      chatRingForeground.style.display = \\"inherit\\";\\n      chatRingForeground.style.transform = \\"rotate(30deg)\\";\\n      chatRing.style.transform = \\"rotate(30deg)\\";\\n      syncRotations();\\n    }, 400);\\n  }\\n}\\n<\/script>\\r\\n\\r\\n\\r\\n<div id=\\"offcanvas-flip\\" uk-offcanvas=\\"flip: true; overlay: true; bg-close: false;\\">\\r\\n    <div class=\\"uk-offcanvas-bar\\">\\r\\n        {#if !$connected}\\r\\n        <div style=\\"margin-top:4rem;\\">\\r\\n            <ConnectButton/>\\r\\n        </div>\\r\\n        {:else}\\r\\n        <InternalWallet/>\\r\\n        {/if}\\r\\n    </div>\\r\\n</div>\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n<a id=\\"chatHeadBubble\\" class='chatHeadContainer' href=\\"#\\" uk-toggle=\\"target: #offcanvas-flip\\" type=\\"button\\" on:click={toggleChat}>\\r\\n    <div role=\\"dialog\\" on:mouseenter={handleHoverIn} on:mouseleave={handleHoverOut} id=\\"chatLOGO\\">\\r\\n        \\r\\n        {#if !chatLoading}\\r\\n            <img id=\\"chatRing\\" src={RING} alt=\\"RingLOGO\\"/>\\r\\n        {:else}\\r\\n            <img id=\\"chatRing\\" class=\\"spinning\\" src={RING} alt=\\"RingLOGO\\"/>\\r\\n        {/if}\\r\\n            <img id=\\"chatHead\\" src = {LOGO} alt=\\"metastellar logo\\"/>\\r\\n        {#if !chatLoading}\\r\\n            <img id=\\"chatRingForeground\\" src={RINGFOREGROUND} alt=\\"RingLOGO\\"/>\\r\\n        {:else}\\r\\n            <img id=\\"chatRingForeground\\" class=\\"spinning\\" src={RINGFOREGROUND} alt=\\"RingLOGO\\"/>\\r\\n        {/if}\\r\\n    </div>\\r\\n</a>\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n<style>\\r\\n    .chatHeadContainer{\\r\\n        position: fixed;\\r\\n        z-index: 999999;\\r\\n        bottom: 2em;\\r\\n        right: 2em;\\r\\n        transition:all 0.4s ease;\\r\\n\\r\\n    }\\r\\n    #chatLOGO{\\r\\n        position: relative;\\r\\n        width: 100px;\\r\\n        height: 100px;\\r\\n        filter: drop-shadow(1px 11px 11px #333333);\\r\\n        animation-name: chatHeadAnimation;\\r\\n        animation-duration: 5s;\\r\\n        animation-timing-function: ease-in-out;\\r\\n        animation-iteration-count: infinite;\\r\\n    }\\r\\n    #chatRing{\\r\\n        position:absolute;\\r\\n        border-radius: 100%;\\r\\n        right: 25%;\\r\\n        bottom: 25%;\\r\\n        width: 70px;\\r\\n        height: 70px;\\r\\n        cursor: pointer;\\r\\n        transform: rotate(30deg);\\r\\n        filter: drop-shadow(1px 11px 11px #333333);\\r\\n    }\\r\\n    #chatRingForeground{\\r\\n        position:absolute;\\r\\n        border-radius: 100%;\\r\\n        transform: rotate(30deg);\\r\\n        right: 25%;\\r\\n        bottom: 25%;\\r\\n        width: 70px;\\r\\n        height: 70px;\\r\\n        cursor: pointer;\\r\\n        opacity: 0.6;\\r\\n\\r\\n    }\\r\\n\\r\\n    #offcanvas-flip{\\r\\n        position: fixed;\\r\\n    }\\r\\n\\r\\n    .spinning{\\r\\n        animation-name: spinning;\\r\\n        animation-duration: 5s;\\r\\n        animation-timing-function: linear;\\r\\n        animation-iteration-count: infinite;\\r\\n    }\\r\\n    #chatHead{\\r\\n        position:absolute;\\r\\n        right:25%;\\r\\n        bottom: 25%;\\r\\n        border-radius: 100%;\\r\\n        \\r\\n        width:75px;\\r\\n        height: 75px;\\r\\n        cursor: pointer;\\r\\n\\r\\n    }\\r\\n    #chatHead:hover{\\r\\n        transform: scale(1.1);\\r\\n        animation:none;\\r\\n    }\\r\\n    .right{\\r\\n        width:100%;\\r\\n        display: flex;\\r\\n        justify-content: flex-end;\\r\\n    }\\r\\n    \\r\\n    .uk-offcanvas-bar{\\r\\n        z-index: 99999;\\r\\n        width: 350px;\\r\\n        left: -350px;\\r\\n        background-color: white;\\r\\n        border-radius: 1em;\\r\\n        color:black;\\r\\n        position: fixed;\\r\\n    }\\r\\n\\r\\n    h3{\\r\\n        color:black;\\r\\n    }\\r\\n\\r\\n    hr{\\r\\n        color:black;\\r\\n    }\\r\\n\\r\\n    .uk-offcanvas-close:hover{\\r\\n        color:#222;\\r\\n        transform: scale(1.1);\\r\\n    }\\r\\n   \\r\\n    .chatTitle{\\r\\n        text-align: center;\\r\\n        transform:translateY(-50%);\\r\\n    }\\r\\n\\r\\n    @keyframes spinning {\\r\\n        0%{\\r\\n            transform: rotate(0deg) scale(1);\\r\\n        }\\r\\n        50%{\\r\\n            transform: rotate(180deg) scale(1.1);\\r\\n            \\r\\n        }\\r\\n        100%{\\r\\n            transform: rotate(360deg) scale(1);\\r\\n        }\\r\\n    }\\r\\n\\r\\n    @keyframes bellyBreath{\\r\\n        0%{\\r\\n            transform: scale(1);\\r\\n        }\\r\\n        50%{\\r\\n            transform: scale(1.5);\\r\\n        }\\r\\n        100%{\\r\\n            transform: scale(1);\\r\\n        }\\r\\n    }\\r\\n    \\r\\n    @keyframes chatHeadAnimation {\\r\\n        0% { \\r\\n            transform: translateY(0) scale(1.00); \\r\\n            filter: drop-shadow(1px 6px 11px #333333);\\r\\n        }\\r\\n        25%{ \\r\\n            transform: translateY(-2px) scale(0.97); \\r\\n            filter: drop-shadow(0px 8px 11px #333333);\\r\\n        \\r\\n        }\\r\\n        75% { \\r\\n            transform: translateY(6px) scale(1.03); \\r\\n            filter: drop-shadow(0px 4px 16px #333333);\\r\\n        }\\r\\n        100% { \\r\\n            transform: translateY(0) scale(1.00); \\r\\n            filter: drop-shadow(1px 6px 11px #333333);\\r\\n        }\\r\\n    }\\r\\n\\r\\n</style>"],"names":[],"mappings":"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"}`
};
const Chat = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $connected, $$unsubscribe_connected;
  $$unsubscribe_connected = subscribe(connected, (value) => $connected = value);
  let { chatLoading = true } = $$props;
  if ($$props.chatLoading === void 0 && $$bindings.chatLoading && chatLoading !== void 0)
    $$bindings.chatLoading(chatLoading);
  $$result.css.add(css);
  $$unsubscribe_connected();
  return `<div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true; bg-close: false;" class="svelte-17y9tco"><div class="uk-offcanvas-bar svelte-17y9tco">${!$connected ? `<div style="margin-top:4rem;">${validate_component(ConnectButton, "ConnectButton").$$render($$result, {}, {}, {})}</div>` : `${validate_component(InternalWallet, "InternalWallet").$$render($$result, {}, {}, {})}`}</div></div> <a id="chatHeadBubble" class="chatHeadContainer svelte-17y9tco" href="#" uk-toggle="target: #offcanvas-flip" type="button"><div role="dialog" id="chatLOGO" class="svelte-17y9tco">${!chatLoading ? `<img id="chatRing"${add_attribute("src", RING, 0)} alt="RingLOGO" class="svelte-17y9tco">` : `<img id="chatRing" class="spinning svelte-17y9tco"${add_attribute("src", RING, 0)} alt="RingLOGO">`} <img id="chatHead"${add_attribute("src", LOGO, 0)} alt="metastellar logo" class="svelte-17y9tco"> ${!chatLoading ? `<img id="chatRingForeground"${add_attribute("src", RINGFOREGROUND, 0)} alt="RingLOGO" class="svelte-17y9tco">` : `<img id="chatRingForeground" class="spinning svelte-17y9tco"${add_attribute("src", RINGFOREGROUND, 0)} alt="RingLOGO">`}</div> </a>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="app">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main>${slots.default ? slots.default({}) : ``} ${validate_component(Toaster, "Toaster").$$render($$result, { richColors: true, position: "top-right" }, {}, {})} ${validate_component(Chat, "ChatBox").$$render($$result, {}, {}, {})}</main> </div>`;
});
export {
  Layout as default
};
