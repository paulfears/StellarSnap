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

export class TxnBuilder{
  account: Account
  client: Client
  constructor(account: Account){
    this.account = account;
  }

  createAccountTxn(destination: string, amount: string, fee?:string): Transaction{
    if(!fee){
      console.log("no fee provided")
      fee = "1000"
    }
    
    const transactionBuilder = new TransactionBuilder(this.account, {fee, networkPassphrase: Networks.TESTNET })
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
    const transactionBuilder = new TransactionBuilder(this.account, {fee, networkPassphrase: Networks.TESTNET })
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
    
    const transactionBuilder = new TransactionBuilder(this.account, {fee, networkPassphrase: Networks.TESTNET })
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


}
