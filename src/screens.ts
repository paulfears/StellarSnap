
import { panel, text, heading, divider, copyable, Panel } from '@metamask/snaps-ui';
import Utils from './Utils';
import { Wallet } from './Wallet';
import { createFederationAccount, lookupFedAccount, lookupAddress } from './federation';
import { StateManager } from './stateManager';
import IMG from './SVG';
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
            heading('EnterS a Federation Name For'),
            heading(wallet.walletName),
            copyable(wallet.address),
            divider(),
            text("desired account name")
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

    static async setUpFedAccount(wallet:Wallet){
        let result;
        while(true){
            const name = await Screens.FedAccountName(wallet);
            if(name === null){
              break;
            }
            
            result = await createFederationAccount(wallet.keyPair, name as string);
            if(result.error){
              if(result.error === "username is already in use"){
                await Screens.SameNameWarning(name);
                continue;
              }
              if(result.error === "address already has an account"){
                await Screens.AlreadyExistsError(wallet);
              }
            }
            break;
        }
        return result;
    }

    static async getCoolSVG(){
        
    }

    static async installedScreen(wallet:Wallet){
        
        if(!wallet.currentState.blank){
            console.log("about to clear");
            return null;
        }
        const greeting = panel([
            heading("WELCOME TO STELLAR 🪐"),
            IMG
        ])
        const walletName = await Utils.displayPanel(greeting, 'prompt');
        if(walletName === null){
            //if the user presses cancel on the name just keep the default name
            return;
        }
        await Wallet.renameWallet(wallet.address, walletName);
        wallet.walletName = walletName as string;
        if((await lookupAddress(wallet.address)).account_id === null){
            const setUpAccount = panel([
                heading("Would you like to set up a MetaStellar Account"),
                text("you can always do this later"),
                text("learn more at"),
                copyable("metastellar.io")
                ]
            );
            const setUpNow = await Utils.displayPanel(setUpAccount, "confirmation");
            
            if(setUpNow){
                await Screens.setUpFedAccount(wallet);
            }
        }
    }

    static async confirmAccountChange(origin, accountName, accountAddress):Promise<boolean>{
        const disp = panel([
            heading('Switch Account?'),
            divider(),
            text(`${origin} would like to switch the current account to`),
            panel([
                text(accountName),
                copyable(accountAddress)
            ]),
        ]);
        return (await Utils.displayPanel(disp, 'confirmation')) as boolean;
    }

    static async homeScreen(wallet){

    }

    static async clearStateConfirmation():Promise<boolean>{
        const disp = panel([
            heading("Would you like to clear all state?"),
            divider(),
            text("⚠️This will permenatly delete all imported accounts⚠️"),
            text("⚠️This will delete all generated accounts⚠️"),
        ])
        return (await Utils.displayPanel(disp, 'confirmation')) as boolean
    }
}