import { c as create_ssr_component, h as compute_rest_props, o as onDestroy, i as spread, k as escape_object, j as escape_attribute_value, a as add_attribute, v as validate_component } from "./ssr.js";
import { i as is_void } from "./names.js";
import { twMerge } from "tailwind-merge";
function getCurrentTimeStamp() {
  const dNow = /* @__PURE__ */ new Date();
  return dNow.valueOf();
}
const Frame_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "isMouseTrackRecord",
    "intervalData",
    "dataURL",
    "hoverTransform",
    "imgHoverTransform",
    "isMouseEntered",
    "distanceThreshold",
    "timeThreshold"
  ]);
  let { isMouseTrackRecord = false } = $$props;
  let { intervalData = void 0 } = $$props;
  let { dataURL = void 0 } = $$props;
  let { hoverTransform = void 0 } = $$props;
  let { imgHoverTransform = void 0 } = $$props;
  let { isMouseEntered = false } = $$props;
  let { distanceThreshold = 10 } = $$props;
  let { timeThreshold = 500 } = $$props;
  let mouseTrackData = [];
  let countTime = 0;
  function clearMouseTrackData() {
    mouseTrackData = [];
  }
  async function sendMouseTrackData() {
    if (dataURL == void 0 || mouseTrackData.length == 0)
      return;
    try {
      const body = { data: JSON.stringify(mouseTrackData) };
      const res = await fetch(dataURL, {
        method: "post",
        body: JSON.stringify(body)
      });
      clearMouseTrackData();
    } catch (e) {
      console.log("request error", e);
    }
  }
  ({
    point: { x: 0, y: 0 },
    timestamp: getCurrentTimeStamp()
  });
  let containerRef;
  onDestroy(() => {
    if (isMouseTrackRecord) {
      sendMouseTrackData();
    }
  });
  let divClass;
  if ($$props.isMouseTrackRecord === void 0 && $$bindings.isMouseTrackRecord && isMouseTrackRecord !== void 0)
    $$bindings.isMouseTrackRecord(isMouseTrackRecord);
  if ($$props.intervalData === void 0 && $$bindings.intervalData && intervalData !== void 0)
    $$bindings.intervalData(intervalData);
  if ($$props.dataURL === void 0 && $$bindings.dataURL && dataURL !== void 0)
    $$bindings.dataURL(dataURL);
  if ($$props.hoverTransform === void 0 && $$bindings.hoverTransform && hoverTransform !== void 0)
    $$bindings.hoverTransform(hoverTransform);
  if ($$props.imgHoverTransform === void 0 && $$bindings.imgHoverTransform && imgHoverTransform !== void 0)
    $$bindings.imgHoverTransform(imgHoverTransform);
  if ($$props.isMouseEntered === void 0 && $$bindings.isMouseEntered && isMouseEntered !== void 0)
    $$bindings.isMouseEntered(isMouseEntered);
  if ($$props.distanceThreshold === void 0 && $$bindings.distanceThreshold && distanceThreshold !== void 0)
    $$bindings.distanceThreshold(distanceThreshold);
  if ($$props.timeThreshold === void 0 && $$bindings.timeThreshold && timeThreshold !== void 0)
    $$bindings.timeThreshold(timeThreshold);
  {
    if (isMouseTrackRecord && intervalData != void 0 && countTime != 0 && countTime % intervalData == 0) {
      sendMouseTrackData();
    }
  }
  divClass = twMerge("ms-frame ", $$props.rounded && "rounded-lg", $$props.class, $$props.shadow && "shadow");
  return ` <div style="perspective: 1000px;">${((tag) => {
    return tag ? `<div${spread([escape_object($$restProps), { class: escape_attribute_value(divClass) }], {})}${add_attribute("this", containerRef, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}</div>` : "";
  })("div")}</div>`;
});
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "img", "reverse", "imgClass", "isMouseEntered", "padding"]);
  let { href = void 0 } = $$props;
  let { img = void 0 } = $$props;
  let { reverse = false } = $$props;
  let { imgClass = "" } = $$props;
  let { isMouseEntered = false } = $$props;
  let { padding = "lg" } = $$props;
  const paddings = {
    none: "",
    xs: "p-2",
    sm: "p-4",
    md: "p-4 sm:p-5",
    lg: "p-4 sm:p-6",
    xl: "p-4 sm:p-8"
  };
  const yPaddings = {
    none: "",
    xs: "py-2",
    sm: "py-4",
    md: "py-4 sm:py-5",
    lg: "py-4 sm:py-6",
    xl: "py-4 sm:py-8"
  };
  let innerPadding;
  let innerYpadding;
  let cardClass;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.img === void 0 && $$bindings.img && img !== void 0)
    $$bindings.img(img);
  if ($$props.reverse === void 0 && $$bindings.reverse && reverse !== void 0)
    $$bindings.reverse(reverse);
  if ($$props.imgClass === void 0 && $$bindings.imgClass && imgClass !== void 0)
    $$bindings.imgClass(imgClass);
  if ($$props.isMouseEntered === void 0 && $$bindings.isMouseEntered && isMouseEntered !== void 0)
    $$bindings.isMouseEntered(isMouseEntered);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    innerPadding = paddings[padding];
    innerYpadding = yPaddings[padding];
    cardClass = twMerge("flex w-full  ", reverse ? "flex-col-reverse " : "flex-col", $$props.class, innerPadding, $$restProps.imgHoverTransform && "img-hover", $$restProps.hoverTransform && "hover");
    $$rendered = `${validate_component(Frame_1, "Frame").$$render(
      $$result,
      Object.assign({}, { tag: href ? "a" : "div" }, $$restProps, { class: cardClass }, { isMouseEntered }),
      {
        isMouseEntered: ($$value) => {
          isMouseEntered = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return ` ${img ? `<img${add_attribute("class", imgClass, 0)}${add_attribute("src", img, 0)} alt=""> <div${add_attribute("class", innerYpadding, 0)}>${slots.default ? slots.default({}) : ``}</div>` : `${slots.default ? slots.default({}) : ``}`}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Card as C
};
