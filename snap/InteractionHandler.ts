import { ComponentOrElement } from "@metamask/snaps-sdk";
import { SnapComponent } from "@metamask/snaps-sdk/jsx";

interface InteractionTable{
    [interfaceId:string]:{ //interface id returned from snap_createInterface
        [name:string]:{ //name of the button or input
            type:"button"|"input", //type of the interaction
            callback:(interfaceId:string, ...args:any[])=>any, //callback function interfaceId is always passed as first argument
            args:any[]
        }
    }   
}
type InterfaceId = string;
export class InteractionHandler{
    static interactionTable:InteractionTable = {};
    static requestOrigin:string = "snap";

    static setRequestOrigin(origin:string){
        InteractionHandler.requestOrigin = origin;
    }

    static getRequestOrigin(){
        return InteractionHandler.requestOrigin;
    }

    static registerButton(interfaceId:string, name:string, callback:(interfaceId:string, ...args:any[])=>any, args:any[]){
        if(!InteractionHandler.interactionTable[interfaceId]){
            InteractionHandler.interactionTable[interfaceId] = {};
        }
        InteractionHandler.interactionTable[interfaceId][name] = {callback, args, type:"button"};
    }

    static registerInput(interfaceId:string, name:string, callback:(interfaceId:string, ...args:any[])=>any, args:any[]){
        if(!InteractionHandler.interactionTable[interfaceId]){
            InteractionHandler.interactionTable[interfaceId] = {};
        }
        InteractionHandler.interactionTable[interfaceId][name] = {callback, args, type:"input"};
    }

    static async createInterface(ui:ComponentOrElement):Promise<string>{
        const interfaceId = await snap.request({
            method: "snap_createInterface",
            params: {
              ui: ui
            }
        });
        InteractionHandler.interactionTable[interfaceId] = {};
        return interfaceId;
    }

    static async getState(interfaceId:string):Promise<any>{
        const state = await snap.request({
            method: "snap_getInterfaceState",
            params: {
              id: interfaceId,
            },
        });
        return state;
    }

    static handleCall(interfaceId:string, name:string): any{
        if(InteractionHandler.interactionTable[interfaceId]){
            if(InteractionHandler.interactionTable[interfaceId][name]){
                let args = InteractionHandler.interactionTable[interfaceId][name].args;
                return InteractionHandler.interactionTable[interfaceId][name].callback(interfaceId, ...args);
            }
        }
    }

    static async updateInterface(interfaceId:string, ui:ComponentOrElement): Promise<InterfaceId>{
        await snap.request({
            method: "snap_updateInterface",
            params: {
              id: interfaceId,
              ui
            },
        });
        return interfaceId
    }
}