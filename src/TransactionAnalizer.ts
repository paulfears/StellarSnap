
import Utils from "./Utils";
import { panel, text, heading, divider, copyable, Panel } from '@metamask/snaps-ui';

import { TransactionBuilder, Transaction, FeeBumpTransaction, xdr} from "stellar-base";
import { Client } from "./Client";
import { isSorobanTransaction, assembleTransaction } from "./sorobanTxn";
import { TxnBuilder } from "./TxnBuilder";

export class TransactionAnalizer{
    client;
    constructor(client: Client){
        this.client = client;
    }

    _parseOperation(operation, currentValue): {uiList:Array<any>, currentValue:object}{
        console.log(operation);
        const uiList = [];
        if(operation.type === 'payment'){
            uiList.push(text('payment'))
        }
        return {uiList, currentValue}
    }

    async decodeXDRTransaction(xdrTransaction): Promise<Transaction>{
        console.log(xdrTransaction);
        let txn = TransactionBuilder.fromXDR(xdrTransaction, this.client.currentPassphrase);
        console.log(txn);
        if('innerTransaction' in txn){
            txn = txn.innerTransaction;
        }
        if(isSorobanTransaction(txn)){
            if(this.client.network !== 'futurenet'){
                throw new Error("Soroban Transactions are currently only supported on futurenet");
            }
        }
        return txn;
    }

    

    async analizeTransaction(decodedTransaction){
        const dispArray = [heading('Sign Transaction?'), divider()];
        const network = this.client.network;
        let value = {};
        dispArray.push(text(`network: ${network}`));
        let fee = decodedTransaction._fee
        dispArray.push(text(`fee: ${fee}`));
        dispArray.push(text('operations'));
        dispArray.push(divider());
        let operations = decodedTransaction._operations
        console.log(operations);
        for(const operation of operations){
            let output = this._parseOperation(operation, value);
            console.log(output);
            dispArray.push(...output.uiList);
            value = output.currentValue;
        }

        const confirmation = await Utils.displayPanel(panel(dispArray), "confirmation");

        return confirmation;
    }
}