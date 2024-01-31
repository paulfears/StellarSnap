
import { panel, text, heading, divider, copyable, Panel } from '@metamask/snaps-ui';
import Utils from './Utils';
import type { Wallet } from './Wallet';
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
        return (await Utils.displayPanel(disp)) as boolean;
    }

    static async importAccountPrivateKey(){
        const disp = panel([
            heading("Enter Private Key"),
            divider(),
            text("⚠️do not share your private key with anyone⚠️")
        ])
        return await Utils.displayPanel(disp, "prompt");

    }
    static async importAccountName(address:string){
        const disp = panel([
            heading("Name your imported account"),
            divider(),
            text("Enter a name for account:"),
            copyable(address),
        ]);
        console.log("disp is");
        console.log(disp);
        return await Utils.displayPanel(disp, "prompt")
    }

    static async FedAccountName(wallet:Wallet){
        const disp = panel([
            heading('Create a Federation Name'),
            divider(),
            text('for account'),
            copyable(wallet.walletName),
            copyable(wallet.address)
        ])
        return await Utils.displayPanel(disp, 'prompt');
    }

    static async SameNameWarning(name){
        const disp = panel([
            heading(`${name} is already taken`),
            divider(),
            text('try a different name')
        ])
        return await Utils.displayPanel(disp, "alert");
    }

    static async AlreadyExistsError(wallet:Wallet){
        const disp = panel([
            heading(`account already exists for ${wallet.walletName}`),
            
            copyable(wallet.address),
            divider(),
        ])
        return await Utils.displayPanel(disp, "alert");
    }

    static async revealPrivateKey(wallet:Wallet){
        const disp1 = panel([
            heading("Are you sure you want to reveal your private key"),
            divider(),
            text("Anyone with your private Key can spend your funds."),
            text("Keep this safe!")
        ])
        const anwser = await Utils.displayPanel(disp1, "confirmation")
        if(!anwser){
            return;
        }
        else{
            const secret = wallet.keyPair.secret();
            const disp2 = panel([
                heading("Your Secret Key"),
                divider(),
                copyable(secret)
            ])
            await Utils.displayPanel(disp2, 'alert');
        }
        
    }
}