import { writable } from "svelte/store";
import type { Writable } from "svelte/store";


interface NativeBalance {
    balance:string,
    liquidity_pool_id?:string,
    limit: string,
    buying_liabilites: string,
    selling_liabilites: string,
    sponser?: string,
    last_modified_ledger: number,
    is_authorized: boolean,
    is_authorized_to_maintain_liabilites: boolean,
    is_clawback_enabled: boolean,
    asset_type: "native",
    asset_issuer: "native"
    asset_code: "XLM"
}

export interface AssetBalance {
    balance: string, //number
    liquidity_pool_id?: string, //number
    limit: string, //number
    buying_liabilites: string, //number
    selling_liabilites: string, //number
    sponser?: string, //address
    last_modified_ledger: number,
    is_authorized: boolean,
    is_authorized_to_maintain_liabilites: boolean,
    is_clawback_enabled: boolean,
    asset_type: "credit_alphanum4"|"credit_alphanum12"
    asset_code: string,
    asset_issuer: string, //address
}

export type walletAsset = AssetBalance | NativeBalance

export interface DataPacket{
    name: string, //comment
    currentAddress: string,
    mainnetAssets?: walletAsset[],
    testnetAssets?: walletAsset[],
    accounts: Array<{name:String, address:String}>
    mainnetXLMBalance: string,
    testnetXLMBalance: string,
    fedName: string | null
}

export const nullDataPacket:DataPacket = {
    name: "null Packet",
    currentAddress: "null",
    accounts:[],
    mainnetXLMBalance:"0",
    testnetXLMBalance:"0",
    fedName:null
}

export const dataPacket:Writable<DataPacket> = writable(nullDataPacket);
export const isTestnet:Writable<boolean> = writable(true);
export const connected:Writable<boolean> = writable(false);

