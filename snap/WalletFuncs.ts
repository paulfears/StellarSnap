import { Account, Transaction, Keypair, xdr, MemoType, FeeBumpTransaction, Operation, TransactionBuilder} from "stellar-base";
import { Memo, } from "@stellar/stellar-sdk";

import { Client } from "./Client";
import { TxnBuilder } from "./TxnBuilder";
import Utils from "./Utils";
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

    async transfer(to:string, amount:string, confirmation?:Boolean, memo?:string|null){
        let memo_type:MemoType = "none";
        if(memo !== undefined){
            if(Number.isNaN(Number(memo))){
                memo_type = "text";
            }
            else{
                memo_type = "id";
            }
        }
        if(memo === undefined){
            memo = null;
        }
        if(confirmation === undefined){
            confirmation = true;
        }
        const account_exists = await this.client.checkAccountExists(to);
        let txn:Transaction;
        if(account_exists){
        txn = this.builder.buildPaymentTxn(to, amount, undefined, new Memo(memo_type, memo));
        }
        else{
            txn = this.builder.createAccountTxn(to, amount, undefined, new Memo(memo_type, memo));
        }
       
        return this.signAndSubmitTransaction(txn.toXDR() as unknown as xdr.Transaction, confirmation);
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

    signStr(str:string){
        const proof = this.keyPair.sign(Buffer.from('createaccount')).toString()
        return {
            pk: this.keyPair.publicKey(),
            sig: proof,
            msg: str
        }
    }

    async signArbitaryTxn(xdrTransaction:xdr.Transaction | string, includeConfirm?:Boolean): Promise<Transaction<Memo<MemoType>, Operation[]> | FeeBumpTransaction>{
        
        let txn = TransactionBuilder.fromXDR(xdrTransaction, this.client.currentPassphrase);
        let analizerTxn_ref:Transaction;
        if(includeConfirm === undefined){
            includeConfirm = true;
        }
        if('innerTransaction' in txn){
            analizerTxn_ref = txn.innerTransaction;
        }
        else{
            analizerTxn_ref = txn;
        }
        let confirm;
        if(includeConfirm !== false){
            confirm = await this.analizer.analizeTransaction(analizerTxn_ref);
        }
        else{
            confirm = true;
        }
        if(!confirm){
            throw new Error("user rejected request");
        }
        txn.sign(this.keyPair);
        console.log(txn);
        console.log("xdr is: ");
        console.log(txn.toEnvelope().toXDR());
        return txn;
    }

    async signAndSubmitTransaction(xdrTransaction: xdr.Transaction, confirmation?:Boolean){
        if(confirmation === undefined){
            confirmation = true;
        }
        console.log("inHere")
        const signedTxn = await this.signArbitaryTxn(xdrTransaction, confirmation);
        console.log("next");
        const response = await this.client.submitTransaction(signedTxn);
        console.log("response got");
        console.log(response);
        if(response.successful){
            await Utils.notify("Transaction Successful")
        }
        else{
            await Utils.notify("Transaction Failed");
        }
        return response;
    }
    
}