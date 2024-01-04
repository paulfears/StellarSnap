import {
  Account,
  FeeBumpTransaction,
  Operation,
  Transaction,
  TransactionBuilder,
  xdr,
  Networks,
  Asset
} from "stellar-base";
import { Client } from "./Client";
import type { json_Asset } from "./types";
export class TxnBuilder{
  account: Account
  client: Client
  network: Networks.PUBLIC | Networks.TESTNET | Networks.FUTURENET
  constructor(account: Account, client:Client){
    this.account = account;
    this.client = client;
    if(this.client.network === 'mainnet'){
      this.network = Networks.PUBLIC
    }
    if(this.client.network === 'testnet'){
      this.network = Networks.TESTNET
    }
    if(this.client.network === 'futurenet'){
      this.network = Networks.FUTURENET
    }
  }

  createAccountTxn(destination: string, amount: string, fee?:string): Transaction{
    if(!fee){
      console.log("no fee provided")
      fee = "1000"
    }
    
    const transactionBuilder = new TransactionBuilder(this.account, {fee, networkPassphrase: this.network })
    console.log("transaction initialized");
    console.log(transactionBuilder);
    transactionBuilder
    .addOperation(Operation.createAccount({
        destination: destination,
        startingBalance: amount
    })) // <- funds and creates destinationA
    .setTimeout(30)
    console.log(transactionBuilder);
    const transaction = transactionBuilder.build();
    console.log(transaction);
    console.log(transaction.toXDR());
    return transaction;
  }

  buildCreateTxn(destination: string, amount: string, fee?:string): Transaction{
    if(!fee){
      console.log("no Fee provided");
      fee = "1000"
    }
    const transactionBuilder = new TransactionBuilder(this.account, {fee, networkPassphrase: this.network })
    console.log("transaction initialized");
    console.log(transactionBuilder);
    transactionBuilder
    /*
    .addOperation(Operation.createAccount({
        destination: destinationA,
        startingBalance: "20"
    })) // <- funds and creates destinationA
    */
    .addOperation(
      Operation.createAccount({
        destination: destination,
        startingBalance: amount,
      }),
    ) // <- sends 100 XLM to destinationB
    .setTimeout(30)
    console.log(transactionBuilder);
    const transaction = transactionBuilder.build();
    console.log(transaction);
    console.log(transaction.toXDR());
    return transaction;
  }

  buildPaymentTxn(destination: string, amount: string, fee?:string): Transaction{
    if(!fee){
      console.log("no fee provided")
      fee = "1000"
    }
    
    const transactionBuilder = new TransactionBuilder(this.account, {fee, networkPassphrase: this.network })
    console.log("transaction initialized");
    console.log(transactionBuilder);
    transactionBuilder
    /*
    .addOperation(Operation.createAccount({
        destination: destinationA,
        startingBalance: "20"
    })) // <- funds and creates destinationA
    */
    .addOperation(Operation.payment({
        destination: destination,
        amount: amount,
        asset: Asset.native()
    })) // <- sends 100 XLM to destinationB
    .setTimeout(30)
    console.log(transactionBuilder);
    const transaction = transactionBuilder.build();
    console.log(transaction);
    console.log(transaction.toXDR());
    return transaction;
  }

  buildAssetTxn(destination: string, amount: string, asset:json_Asset, fee?:string): Transaction{
    if(!fee){
      console.log("no fee provided")
      fee = "1000"
    }
    
    const transactionBuilder = new TransactionBuilder(this.account, {fee, networkPassphrase: this.network })
    console.log("transaction initialized");
    console.log(transactionBuilder);
    const stellarAsset = new Asset(asset.code, asset.issuer); 
    transactionBuilder
    /*
    .addOperation(Operation.createAccount({
        destination: destinationA,
        startingBalance: "20"
    })) // <- funds and creates destinationA
    */
    .addOperation(Operation.payment({
        destination: destination,
        amount: amount,
        asset: stellarAsset
    })) // <- sends 100 XLM to destinationB
    .setTimeout(30)
    console.log(transactionBuilder);
    const transaction = transactionBuilder.build();
    console.log(transaction);
    console.log(transaction.toXDR());
    return transaction;
  }


}
