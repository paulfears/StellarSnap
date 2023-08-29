/*
Class for utility functions

wallet is a global in the metamask context
*/
import { panel, text, heading, divider, copyable } from '@metamask/snaps-ui';
export class Metamask {
  static throwError(code, msg) {
    if (code === undefined) {
      code = 0;
    }
    // metamask overrides Error codes
    // This function encodes an arc complient error code
    // into the error message, and is then seperated by the SDK
    throw new Error(`${code}\n${msg}`);
  }

  static async notify(message){
    try{
        await snap.request({
            method: 'snap_notify',
            params: {
              type: 'inApp',
              message: message,
            },
        });
        
        const result = await snap.request({
            method: 'snap_notify',
            params: {
              type: 'native',
              message: message,
            },
          });
        return true;
    }
    catch(e){
        console.log("error - ")
        console.log(e);
        await Utils.sendConfirmation("alert", "notifcation", message);
        return false;
    }

    
  }

  static async paymentConfirmation(amount: bigint, address: string, network: string){
    const amount_string = ((Number(amount * BigInt(100000000) / BigInt(100000000)) / 100000000)).toFixed(8).replace(/\.?0+$/,"")
    const confirm = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel([
          heading("Confirm Payment"),
          divider(),
          text("network : "+network),
          text(`${amount_string} Aptos`),
          text("recipent"),
          copyable(address)
        ])
      }
    })
    return confirm
  }

  static async displayBalance(amount: bigint, address: string, network: string){
    const amount_string = ((Number(amount * BigInt(100000000) / BigInt(100000000)) / 100000000)).toFixed(8).replace(/\.?0+$/,"")
    const confirm = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'alert',
        content: panel([
          heading("Wallet Balance"),
          text(network),
          divider(),
          heading(`${amount_string} Aptos`),
          copyable(address)
        ])
      }
    })
    return true;

  }

  static async sendConfirmation(prompt, description, textAreaContent){
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
    
    return confirm;
}
}
