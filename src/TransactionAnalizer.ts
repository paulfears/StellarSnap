
import Utils from "./Utils";
import { panel, text, heading, divider, copyable, Panel } from '@metamask/snaps-ui';

import { TransactionBuilder, Transaction, FeeBumpTransaction, xdr} from "stellar-base";
import { Client } from "./Client";
import { isSorobanTransaction, assembleTransaction } from "./sorobanTxn";
import { TxnBuilder } from "./TxnBuilder";
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
        else if(operation.type === 'createAccount'){
            uiList.push(text('createAccount'))
        }
        else if(operation.type === 'pathPaymentStrictReceive'){

        }
        else if(operation.type === 'pathPaymentStrictSend'){

        }
        else if(operation.type === 'manageSellOffer'){

        }
        else if(operation.type === 'createPassiveSellOffer'){

        }
        else if(operation.type === 'setOptions'){

        }
        else if(operation.type === 'changeTrust'){

        }
        else if(operation.type === 'allowTrust'){

        }
        else if(operation.type === 'accountMerge'){

        }
        else if(operation.type === 'inflation'){

        }
        else if(operation.type === 'manageData'){

        }
        else if(operation.type === 'bumpSequence'){

        }
        else if(operation.type === 'createClaimableBalance'){

        }
        else if(operation.type === 'claimClaimableBalance'){

        }
        else if(operation.type === 'beginSponsoringFutureReserves'){

        }
        else if(operation.type === 'endSponsoringFutureReserves'){

        }
        else if(operation.type === 'revokeAccountSponsorship'){

        }
        else if(operation.type === 'revokeTrustlineSponsorship'){

        }
        else if(operation.type === 'revokeOfferSponsorship'){

        }
        else if(operation.type === 'revokeDataSponsorship'){

        }
        else if(operation.type === 'revokeClaimableBalanceSponsorship'){

        }
        else if(operation.type === 'revokeLiquidityPoolSponsorship'){

        }
        else if(operation.type === 'revokeSignerSponsorship'){

        }
        else if(operation.type === 'clawback'){

        }
        else if(operation.type === 'clawbackClaimableBalance'){

        }
        else if(operation.type === 'setTrustLineFlags'){

        }
        else if(operation.type === 'liquidityPoolDeposit'){

        }
        else if(operation.type === 'liquidityPoolWithdraw'){

        }
        else if(operation.type === 'invokeHostFunction'){

        }
        else if(operation.type === ''){

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