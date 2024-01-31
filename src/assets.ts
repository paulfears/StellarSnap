import { Client } from "./Client";
import { Wallet } from "./Wallet";
import { lookupAddress } from "./federation";
export interface NativeBalance{
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

export interface AssetBalance{
    balance:string, //number
    liquidity_pool_id?:string, //number
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

const emptyNativeBalance:NativeBalance = {
    balance:"0",
    limit: "Infinity",
    buying_liabilites: "0",
    selling_liabilites: "0",
    last_modified_ledger: Date.now(),
    is_authorized: true,
    is_authorized_to_maintain_liabilites: true,
    is_clawback_enabled: false,
    asset_type: "native",
    asset_issuer: "native",
    asset_code: "XLM"
}

export interface DataPacket{
    name:string,
    currentAddress:string,
    mainnetAssets?: walletAsset[],
    testnetAssets?: walletAsset[],
    accounts: Array<{name:String, address:String}>
    mainnetXLMBalance: string,
    testnetXLMBalance: string,
    fedName: string | null
}

export async function getAssets(wallet:Wallet, client:Client):Promise<Array<AssetBalance | NativeBalance>>{
    const assets = await client.getAssets(wallet.address);
    if(assets.length === 0){
        return [emptyNativeBalance]
    }
    return assets;
}

export async function getDataPacket(wallet:Wallet, client:Client):Promise<DataPacket>{
    const currentAddress = wallet.currentState.currentAccount;
    const accounts = await Wallet.listAccounts(wallet.currentState);
    const name = wallet.currentState.accounts[currentAddress].name;
    const startingNetwork = client.network;
    client.setNetwork('mainnet');
    const mainnetAssets = await getAssets(wallet, client);
    client.setNetwork('testnet');
    const testnetAssets = await getAssets(wallet, client);
    const mainnetXLMBalance = mainnetAssets[mainnetAssets.length-1].balance; //xlm is always the last asset
    const testnetXLMBalance = testnetAssets[testnetAssets.length-1].balance;
    const fedName = await lookupAddress(currentAddress);
    client.setNetwork(startingNetwork);
    return {
        name,
        accounts,
        currentAddress,
        mainnetAssets,
        testnetAssets,
        mainnetXLMBalance,
        testnetXLMBalance,
        fedName
    }
}