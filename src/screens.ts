
import { panel, text, heading, divider, copyable, Panel } from '@metamask/snaps-ui';
import Utils from './Utils';
export class Screens{

    static async RequiresFundedWallet(method:string, address:string):Promise<boolean>{
        const disp = panel([
            heading(`${method} Requires A Funded Account`),
            divider(),
            text(`To fund an account send XLM to`),
            copyable(address)
        ])
        await Utils.displayPanel(disp, "alert");
        return true;
    }

    static async paymentConfirmation(to:string, amount:string): Promise<boolean>{
        const disp = panel([
            heading("Confirm XLM Payment"),
            divider(),
            text(`Amount: ${amount} XLM`),
            text(`Recipient: `),
            copyable(to),
            
        ])
        return await Utils.displayPanel(disp)
    }
}