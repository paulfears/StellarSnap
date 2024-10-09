import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.4Ohv1XpA.js","_app/immutable/chunks/scheduler.CK0sPtNb.js","_app/immutable/chunks/index.Cwf1aSWH.js","_app/immutable/chunks/globals.D0QH3NT1.js","_app/immutable/chunks/index.svelte_svelte_type_style_lang.DwVJPAfF.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/ArrowUp.svelte_svelte_type_style_lang.CbZnO2vG.js"];
export const stylesheets = ["_app/immutable/assets/2.BMuNLF2q.css","_app/immutable/assets/index.CXhFIqPa.css","_app/immutable/assets/index.BRc9k1L7.css","_app/immutable/assets/ArrowUp.CIRyELHb.css"];
export const fonts = [];
