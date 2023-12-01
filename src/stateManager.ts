
export interface State{
    assets:{
        "mainnet":[],
        "testnet":[]
    },
    blank: boolean,
}

import { Json } from "@metamask/snaps-types";

export class StateManager{
    static makeEmptyState():State{
        return {assets:{"mainnet":[], "testnet":[]}, blank:true}
    }
    static async getState(): Promise<State>{
        const output:State = await snap.request({
            method: 'snap_manageState',
            params: { operation: 'get' },
        }) as unknown as State;
        if(output === null){
            return this.makeEmptyState();
        }
        else{
            return output;
        }
    }
    static async setState(newState:State):Promise<Boolean>{
        await snap.request({
            method: 'snap_manageState',
            params: { operation: 'update', newState: (newState as unknown as Record<string, Json>)},
        });
        return true;
    }
}