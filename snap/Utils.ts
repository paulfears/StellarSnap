

/*
Class for utility functions

wallet is a global in the metamask context
*/
import { DialogResult } from '@metamask/snaps-sdk';
import { panel, text, heading, divider, copyable, Panel } from '@metamask/snaps-ui';
type interfaceId = string;
export default class Utils {
    
    static throwError(code, msg){
        if(code === undefined){
            code = 0
        }
        //metamask overrides Error codes
        //This function encodes an arc complient error code
        //into the error message, and is then seperated by the SDK
        console.log(JSON.stringify(msg));
        throw new Error(`${code}\n${msg}`);
    }

    static async notify(message: string, type?:"native"|"inApp"): Promise<boolean>{
        if(!type){
            type = 'native';
        }
        try{
            
            const result = await snap.request({
                method: 'snap_notify',
                params: {
                  type: type,
                  message: message,
                },
              });
            return true;
        }
        catch(e){
            console.log(e);
            await snap.request({
                method: 'snap_notify',
                params: {
                  type: 'inApp',
                  message: message,
                },
              });
            return true;
        }


        
    }

    static async sendConfirmation(prompt: string, description: string, textAreaContent: string): Promise<boolean>{
        if(!textAreaContent){
            textAreaContent = ""
        }
        const confirm= await snap.request({
        method: 'snap_dialog',
        params: {
            type: 'confirmation',
            content: panel([
            heading(prompt),
            divider(),
            text(description),
            divider(),
            text(textAreaContent),
            ]),
        },
        });
        
        return confirm as boolean;
    }

    static async sendAlert(title: string, info: string): Promise<boolean>{
        const alert = await snap.request({
            method: 'snap_dialog',
            params:{
                type: 'alert',
                content: panel([
                    heading(title),
                    divider(),
                    text(info)
                ])
            }
        })
        return true;
    }
    
    static async openDialog(id:interfaceId): Promise<DialogResult>{
        const alert = await snap.request({
            method: 'snap_dialog',
            params:{
                type: 'alert',
                id: id
            }
        })
        return alert;
    }

    static async displayPanel(panel: Panel, type:"confirmation" | "alert" | "prompt" = "confirmation"): Promise<DialogResult>{
        const disp = await snap.request({
            method: 'snap_dialog',
            params:{
                type: type,
                content: panel
            }
        })
        return disp
    }

    
}