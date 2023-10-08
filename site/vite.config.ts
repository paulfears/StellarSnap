import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import { resolve } from "path";
rollupNodePolyFill()
export default defineConfig({
    plugins: [svelte()],
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: "globalThis",
            },
            plugins: [
              NodeGlobalsPolyfillPlugin({
                process: true,
                buffer: true
              }),
              NodeModulesPolyfillPlugin()
            ],
        },
    },
});