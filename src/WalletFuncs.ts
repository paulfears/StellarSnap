import { Account, Transaction, Keypair} from "stellar-base";
import { Client } from "./Client";
import { TxnBuilder } from "./TxnBuilder";
import { Wallet } from "./Wallet";
import Utils from "./Utils";
import { panel, text, heading, divider, copyable, Panel } from '@metamask/snaps-ui';

export class WalletFuncs{
    account: Account
    keyPair: Keypair
    builder: TxnBuilder
    client: Client
    constructor(account:Account, keyPair: Keypair, builder: TxnBuilder, client: Client){
        this.account = account
        this.builder = builder
        this.keyPair = keyPair
        this.client = client
    }

    async transfer(to:string, amount:string){
        const txn = this.builder.buildPaymentTxn(to, amount);
        const disp = panel([
            heading("Confirm Spend"),
            divider(),
            text('Amount: '),
            text(`${amount}`),
            text('Recepient: '),
            copyable(to)
        ])
        const confirmed = await Utils.displayPanel(disp);
        if(!confirmed){
            throw Error("User rejected Request");
            return;
        }
        txn.sign(this.keyPair);
        const response = await this.client.submitTransaction(txn);
        console.log(response);
        if(response.successful){
            await Utils.notify("Transaction Successful")
        }
        else{
            await Utils.notify("Transaction Failed")
        }
        return response;
    }
    
    transferAsset(){

    }

    async TxnAnalizer(txn:Transaction){
        //to do
    }
    
}