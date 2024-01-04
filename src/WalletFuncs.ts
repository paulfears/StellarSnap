import { Account, Transaction, Keypair, xdr, Memo, MemoType, FeeBumpTransaction, Operation, TransactionBuilder} from "stellar-base";
import { Client } from "./Client";
import { TxnBuilder } from "./TxnBuilder";
import { Wallet } from "./Wallet";
import Utils from "./Utils";
import { panel, text, heading, divider, copyable, Panel } from '@metamask/snaps-ui';
import { Screens } from "./screens";
import { TransactionAnalizer } from "./TransactionAnalizer";
export class WalletFuncs{
    account: Account
    keyPair: Keypair
    builder: TxnBuilder
    client: Client
    analizer: TransactionAnalizer
    constructor(account:Account, keyPair: Keypair, builder: TxnBuilder, client: Client){
        this.account = account
        this.builder = builder
        this.keyPair = keyPair
        this.client = client
        this.analizer = new TransactionAnalizer(this.client);
    }

    async transfer(to:string, amount:string){
        const account_exists = await this.client.checkAccountExists(to);
        let txn:Transaction;
        if(account_exists){
        txn = this.builder.buildPaymentTxn(to, amount);
        }
        else{
            txn = this.builder.createAccountTxn(to, amount);
        }
        return this.signAndSubmitTransaction(txn.toXDR() as unknown as xdr.Transaction);
        /*
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
        */
    }
    
    transferAsset(to, amount, asset){
        const txn = this.builder.buildAssetTxn(to, amount, asset);
        return this.signAndSubmitTransaction(txn.toXDR() as unknown as xdr.Transaction);

    }

    async signArbitaryTxn(xdrTransaction): Promise<Transaction<Memo<MemoType>, Operation[]> | FeeBumpTransaction>{
        
        let txn = TransactionBuilder.fromXDR(xdrTransaction, this.client.currentPassphrase);
        let analizerTxn_ref:Transaction;
        if('innerTransaction' in txn){
            analizerTxn_ref = txn.innerTransaction;
        }
        else{
            analizerTxn_ref = txn;
        }
        const confirm = await this.analizer.analizeTransaction(analizerTxn_ref);
        if(!confirm){
            throw new Error("user rejected request");
        }
        txn.sign(this.keyPair);
        console.log(txn);
        console.log("xdr is: ");
        console.log(txn.toEnvelope().toXDR());
        return txn;
    }

    async signAndSubmitTransaction(xdrTransaction: xdr.Transaction){
        console.log("inHere")
        const signedTxn = await this.signArbitaryTxn(xdrTransaction);
        console.log("next");
        const response = await this.client.submitTransaction(signedTxn);
        console.log("response got");
        if(response.successful){
            await Utils.notify("Transaction Successful")
        }
        else{
            await Utils.notify("Transaction Failed");
        }
        return response;
    }
    
}