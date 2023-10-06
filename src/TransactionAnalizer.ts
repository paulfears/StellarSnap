
import Utils from "./Utils";
import { panel, text, heading, divider, copyable, Panel } from '@metamask/snaps-ui';

import { TransactionBuilder, Transaction, FeeBumpTransaction, xdr, Operation, Address, scValToNative} from "stellar-base";
import { Client } from "./Client";
import { isSorobanTransaction, assembleTransaction } from "./sorobanTxn";
import { TxnBuilder } from "./TxnBuilder";
//import { toTxrep } from '@stellarguard/txrep';
/**
 * 
 * Operation.createAccount
Operation.payment
Operation.pathPaymentStrictReceive
Operation.pathPaymentStrictSend
Operation.manageSellOffer
Operation.manageBuyOffer
Operation.createPassiveSellOffer
Operation.setOptions
Operation.changeTrust
Operation.allowTrust
Operation.accountMerge
Operation.inflation
Operation.manageData
Operation.bumpSequence
Operation.createClaimableBalance
Operation.claimClaimableBalance
Operation.beginSponsoringFutureReserves
Operation.endSponsoringFutureReserves
Operation.revokeAccountSponsorship
Operation.revokeTrustlineSponsorship
Operation.revokeOfferSponsorship
Operation.revokeDataSponsorship
Operation.revokeClaimableBalanceSponsorship
Operation.revokeLiquidityPoolSponsorship
Operation.revokeSignerSponsorship
Operation.clawback
Operation.clawbackClaimableBalance
Operation.setTrustLineFlags
Operation.liquidityPoolDeposit
Operation.liquidityPoolWithdraw
 */

async function resolveAsset(){

}

async function resolveName(){

}

export class TransactionAnalizer{
    client;
    constructor(client: Client){
        this.client = client;
    }

    _buildOperationUI(operation:Operation): Array<any>{
        let infoList = [];
        infoList.push(text(operation.type));
        infoList.push(divider());
        for(let key in operation){
            let value = operation[key];
            if(key === 'type'){
                continue;
            }
            else if(key === 'asset'){
                console.log('typeof asset is: '+typeof(key))
                infoList.push(text(`asset: ${value.code}`));
            }
            else if(key === 'path'){ 
                value = Array.from(value.map((asset)=>asset.code)).join('->')
                infoList.push(text("path"))
                infoList.push(text(value))
            }
            else if(key === 'destination'){
                infoList.push(text('destination'));
                infoList.push(copyable(value));
            }
            else{
                infoList.push(key);
                if(typeof value === 'string'){
                    infoList.push(text(value))
                }
                else if(typeof value === "object"){
                    let objectParamList = [];
                    for(let param in value){
                        let subValue = value[param];
                        objectParamList.push(text(param));
                        objectParamList.push(text(String(subValue)))
                    }
                    infoList.push(panel(objectParamList));
                }
                else{
                    infoList.push(String(value));
                }
            }
            
        }
        return infoList
    }

    _parseOperation(operation, currentValue): {uiList:Array<any>, currentValue:object}{
        
            console.log(operation);
            const uiList = [];
            if(operation.type === 'payment'){
                uiList.push(text('payment'))
                uiList.push(divider())
                uiList.push(text(`${operation.amount} ${operation.asset.code}`))
                uiList.push(copyable(operation.destination))
            }
            else if(operation.type === 'createAccount'){
                uiList.push(text('createAccount'))
                uiList.push(divider())
            }
            else if(operation.type === 'invokeHostFunction'){
                uiList.push(heading('smartcontract call'));
                console.log("funcVal is: ");
                const funcVal = scValToNative(operation.func);
                console.log(funcVal);
                console.log("contract method name is: ");
                const contractAddress = Address.fromScAddress(funcVal._attributes.contractAddress).toString();
                console.log(contractAddress);
                
                uiList.push(
                    text("Contract Address"),
                    copyable(contractAddress),
                )
                //const xdrConverter = new xdr.XDRString(4294967295);
                const methodName = Array.from(funcVal._attributes.functionName);
                let methodString = '';
                for(let i = 0; i<methodName.length; i++){
                    methodString += String.fromCharCode(Number(methodName[i]));
                }
                console.log(methodString);
                uiList.push(text('Method Name'));
                uiList.push(text(methodString));
                const args = Array.from(Array.from(funcVal._attributes.args).map(scValToNative));
                uiList.push(text("Arguments"));
                for(let i = 0; i<funcVal._attributes.args.length; i++){
                    try{
                        uiList.push(text(scValToNative(funcVal._attributes.args[i]).toString()));
                    }
                    catch(e){
                        uiList.push(text("non native arg"));
                    }
                }
                console.log(args);

                console.log(operation);
            }
            else{
                uiList.push(this._buildOperationUI(operation));
            }
        return {uiList:[panel(uiList)], currentValue}
    }

    async decodeXDRTransaction(xdrTransaction): Promise<Transaction>{
        console.log(xdrTransaction);
        let txn = TransactionBuilder.fromXDR(xdrTransaction, this.client.currentPassphrase);
        console.log(txn);
        if('innerTransaction' in txn){
            txn = txn.innerTransaction;
        }
        if(isSorobanTransaction(txn)){
            if(this.client.network !== 'futurenet' && this.client.network !== 'testnet'){
                throw new Error("Soroban Transactions are currently only supported on futurenet and testnet");
            }
        }
        return txn;
    }

    async analizeTransaction(decodedTransaction){
        try{
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
        catch(e){
            console.log(e);
            //fallback to transaction stringify json
            const dispArray = [
                heading('Sign Transaction?'), 
                divider(), 
                panel([text(JSON.stringify((decodedTransaction)) as string)])
            ];
            const confirmation = await Utils.displayPanel(panel(dispArray));
            return confirmation;
        }
    }
}