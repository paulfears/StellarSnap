
import Utils from "./Utils";
import { panel, text, heading, divider, copyable, Panel } from '@metamask/snaps-ui';

import { TransactionBuilder, Transaction, FeeBumpTransaction, xdr, Operation, Address, scValToNative} from "stellar-base";
import { Client } from "./Client";
import { isSorobanTransaction, assembleTransaction } from "./sorobanTxn";
import { TxnBuilder } from "./TxnBuilder";
import { Asset } from "stellar-base";
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

async function getAddressInfo(addresses:string[]){
    const possibleTags = [
        "exchange",
        "anchor",
        "issuer",
        "wallet",
        "custodian",
        "malicious",
        "unsafe",
        "personal",
        "sdf",
        "memo-required",
        "airdrop",
        "obsolete-inflation-pool"
      ]
    const url = `https://api.stellar.expert/explorer/directory?`;
    let query=""
    for(let address of addresses){
        query+=`address[]=${address}&`
    }
    const response = await fetch(url+query);
    const output = await response.json();
    console.log(output);
    return output._embedded.records;
}


async function getAssetInfo(client:Client, asset:Asset){
    let network;
    try{
        if(asset.issuer === '0'){
            return `stellarexpert rating: 10`;
        }
        if(client.network === 'mainnet'){
            network = 'public';
        }
        else{
            network = client.network;
        }
        if(network === "futurenet"){
            return 'futurenet asset';
        }
        const res = await fetch(`https://api.stellar.expert/explorer/${network}/asset/?search=${asset.code+"-"+asset.issuer}/&limit=1`)
        let output = await res.json();
        console.log("getAssetInfo is: ");
        console.log(output);
        console.log("getAddressInfo");
        const issuerInfo = await getAddressInfo([asset.issuer]);
        console.log(issuerInfo);
        console.log(output._embedded.records);
        return output;
    }
    catch(e){
        console.log(e);
        return 'asset not found'
    }
}

async function getAssetRating(client:Client, asset:Asset){
    let network;
    //reme,ber this is here
    console.log("client is: ");
    console.log(client);
    console.log(await getAssetInfo(client, asset));
    try{
        if(asset.issuer === '0'){
            return `stellarexpert rating: 10`;
        }
        if(client.network === 'mainnet'){
            network = 'public';
        }
        else{
            network = client.network;
        }
        if(network === "futurenet"){
            return 'futurenet asset';
        }
        const res = await fetch(`https://api.stellar.expert/explorer/${network}/asset/${asset.code+"-"+asset.issuer}/rating`)
        let output = await res.json();
        return `stellarexpert rating: ${output.rating.average}`;
    }
    catch(e){
        console.log(e);
        return 'rating not found'
    }
}

export class TransactionAnalizer{
    client;
    requiresMemo:boolean;
    dangerous:boolean;
    constructor(client: Client){
        this.client = client;
    }

    async buildAddressBlock(address:string):Promise<Panel>{
        try{
            const addressInfo = (await getAddressInfo([address]))[0];

            const outputUI = []
            let tagsString = ""
            let okay = true;
            if(addressInfo === undefined){
                outputUI.push(copyable(address));
                return panel(outputUI);
            }
            if(addressInfo.tags){
                const tags = Array.from(addressInfo.tags);
                if(tags.includes('malicious')){
                    this.dangerous = true;
                    okay = false;
                    outputUI.push(heading("⚠️Malicious Address⚠️"))
                }
                if(tags.includes('unsafe')){
                    outputUI.push(heading("⚠️Unsafe Address⚠️"))
                    okay = false;
                    this.dangerous = true;
                }
                if(tags.includes('memo-required')){
                    this.requiresMemo = true;
                    outputUI.push(text("⚠️requires memo"));
                }
                tagsString = "["+tags.join(",")+"]"
            }
            if(addressInfo.name && addressInfo.domain){
                outputUI.push(text(`${addressInfo.name} - ${addressInfo.domain} ${okay?"✅":"⚠️"}`))
            }
            else if(addressInfo.name && !addressInfo.domain){
                outputUI.push(text(`${addressInfo.name} ${okay?"✅":"⚠️"}`))
            }
            else if(addressInfo.domain && !addressInfo.name){
                outputUI.push(text(`${addressInfo.domain} ${okay?"✅":"⚠️"}`))
            }
            outputUI.push(copyable(address));
            if(! await this.client.checkAccountExists()){
                outputUI.push(text("⚠️Account does not exist yet"));
            }
            outputUI.push(text("tags:"));
            outputUI.push(text(tagsString));

            return panel(outputUI);
        }
        catch(e){
            console.log(e);
            return panel([copyable(address)]);
        }
    }

    async buildAssetBlock(asset:Asset): Promise<Panel>{
        if(!asset.issuer){
            asset.issuer = '0';
        }
        const infoList = [];
        infoList.push(text(`${asset.code}`));
        infoList.push(copyable(asset.issuer));
        infoList.push(text(await getAssetRating(this.client, asset)))
        infoList.push(text("ㅤ"));
        return panel(infoList);
    }

    async _buildOperationUI(operation:Operation): Promise<Array<any>>{
        let infoList = [];
        infoList.push(heading(operation.type));
        infoList.push(divider());
        console.log("build operation UI")
        for(let key in operation){
            console.log("key");
            console.log(key);
            console.log(operation[key]);
            let value = operation[key];
            if(key === 'type'){
                continue;
            }
            else if(value instanceof Asset){
                if(!value.issuer){
                    value.issuer = '0';
                }
                infoList.push(text('**'+key+'**'));
                infoList.push(text(`${value.code}`));
                infoList.push(copyable(value.issuer));
                infoList.push(text(await getAssetRating(this.client, value)))
                infoList.push(text("ㅤ"));
            }
            else if(value instanceof Uint8Array){
                let outputString = "";
                let outputBits = [];
                infoList.push(text('**'+key+'**'));
                for(let i = 0; i<value.byteLength; i++){
                    outputString += (String.fromCharCode(value[i]));
                    outputBits.push(value[i]);
                }
                infoList.push(text(outputString));
            }
            else if(key === 'path'){ 
                value = Array.from(value.map((asset)=>asset.code)).join('->')
                infoList.push(text("path"))
                infoList.push(text(value))
            }
            else if(key === 'destination'){
                infoList.push(text('destination'));
                infoList.push(await this.buildAddressBlock(value));
            }
            else{
                infoList.push(text('**'+key+'**'));
                if(typeof value === 'string'){
                    infoList.push(text(value))
                }
                else if(typeof value === "object"){
                    for(let param in value){
                        let subValue = value[param];
                        infoList.push(text("ㅤ"+param));
                        infoList.push(text("ㅤ"+String(subValue)))
                    }
                    
                }
                else{
                    infoList.push(text(String(value)));
                }
            }
            
        }
        console.log("final InfoList is");
        for(let item of infoList){
            console.log(item);
        }
        return infoList
    }

    async _parseOperation(operation, currentValue): Promise<{uiList:Array<any>, currentValue:object}>{
            console.log("operation is: ");
            console.log(operation);
            const uiList = [];
            if(operation.type === 'payment'){
                uiList.push(heading('payment'))
                uiList.push(divider())
                uiList.push(text(`${operation.amount} ${operation.asset.code}`));
                currentValue[operation.asset.code] += Number(operation.amount);
                uiList.push(await this.buildAddressBlock(operation.destination))
            }
            else if(operation.type === 'createAccount'){
                uiList.push(heading('createAccount'))
                uiList.push(divider())
                uiList.push(text(`destination:`))
                uiList.push(await this.buildAddressBlock(operation.destination));
                uiList.push(text(`balance: ${operation.startingBalance}`));
                console.log("operation value is: ");

                for(let key in operation){
                    console.log(key);
                    console.log(operation[key]);
                }
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
                uiList.push(... await this._buildOperationUI(operation));
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
                let output = await this._parseOperation(operation, value);
                console.log(output);
                console.log("made it past parseOperation");
                dispArray.push(...output.uiList);
                dispArray.push(text("ㅤ"));
                value = output.currentValue;
            }
            for(let item of dispArray){
                console.log(item);
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