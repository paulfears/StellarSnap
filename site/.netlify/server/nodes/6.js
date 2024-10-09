import * as server from '../entries/pages/sverdle/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/sverdle/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/sverdle/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.C4Z2hc-K.js","_app/immutable/chunks/scheduler.CK0sPtNb.js","_app/immutable/chunks/globals.D0QH3NT1.js","_app/immutable/chunks/each.-3To2NG0.js","_app/immutable/chunks/index.Cwf1aSWH.js","_app/immutable/chunks/entry.BqpbnM9L.js","_app/immutable/chunks/index.Dvg_BB1D.js"];
export const stylesheets = ["_app/immutable/assets/6.DOkkq0IA.css"];
export const fonts = [];
