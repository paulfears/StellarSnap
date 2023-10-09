import { writable } from "svelte/store";

export const connected = writable<boolean>();
export const network = writable<"mainnet" | "testnet">("testnet");
export const address = writable<string>();
export const testnet = writable<boolean>();
