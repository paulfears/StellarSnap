
import Utils from "./Utils";
import { panel, text, heading, divider, copyable, Panel } from '@metamask/snaps-ui';

import { TransactionBuilder, Transaction, FeeBumpTransaction, xdr} from "stellar-base";
import { Client } from "./Client";
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

    decodeXDRTransaction(xdrTransaction){
        return TransactionBuilder.fromXDR(xdrTransaction, this.client.currentPassphrase);
    }
    

    async analizeTransaction(decodedTransaction){
        const dispArray = [heading('Sign Transaction?'), divider()];
        let transaction;
        let network;
        let value = {};
        if(this.client.testNet){
            network = "testnet"
        }
        else{
            network = "mainnet"
        }
        if(decodedTransaction.innerTransaction !== undefined){
            transaction = decodedTransaction.innerTransaction
        }
        else{
            transaction = decodedTransaction
        }
        dispArray.push(text(`network: ${network}`));
        let fee = transaction._fee
        dispArray.push(text(`fee: ${fee}`));
        dispArray.push(text('operations'));
        dispArray.push(divider());
        let operations = transaction._operations
        for(const operation of operations){
            let output = this._parseOperation(operation, value);
            dispArray.push(...output.uiList);
            value = output.currentValue;
        }

        const confirmation = await Utils.displayPanel(panel(dispArray), "confirmation");

        return confirmation;
    }
}