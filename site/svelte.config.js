import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
  },
  ssr:{
    noExternal: ['svelte-ace']
  },
  preprocess: vitePreprocess(),
};
export default config;
