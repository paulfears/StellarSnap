export interface walletAccount{
    name:string,
    address:string,
    type: "imported" | "generated",
    seed?: Uint8Array,
    salt?: string,
    privateKey?: string,
    assets:{
        "mainnet":[]
        "testnet":[]
    }
}
export interface State{
    assets:{
        "mainnet":[],
        "testnet":[]
    },
    blank: boolean,
    accounts:{[address:string]:walletAccount}
    currentAccount:string|null
}

/*
snap_manageState
Allows the Snap to persist up to 100 MB of data to disk and retrieve it at will. The data is automatically encrypted using a Snap-specific key and automatically decrypted when retrieved.

This method is only callable by Snaps.

link:
https://docs.metamask.io/snaps/reference/rpc-api/#snap_managestate
*/ 

export class StateManager{
    static makeEmptyState():State{
        return {assets:{"mainnet":[], "testnet":[]}, blank:true, accounts:{}, currentAccount:null}
    }
    static async getState(): Promise<State>{
        const output:State = await snap.request({
            method: 'snap_manageState',
            params: { operation: 'get' },
        }) as unknown as State;
        if(output === null){
            return StateManager.makeEmptyState();
        }
        else{
            return output;
        }
    }
    static async setState(newState:State){
        newState.blank = false;
        const result = await snap.request({
            method: 'snap_manageState',
            params: { operation: 'update', newState: newState as any},
        });
        return result;
    }
    static async clearState(){
        const result = await snap.request({
            method: 'snap_manageState',
            params: { operation: 'clear'},
        });
        return result;
    }
}