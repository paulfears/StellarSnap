import { writable } from "svelte/store";
import type { Writable } from "svelte/store";


export const lockScroll: Writable<boolean> = writable(false);

