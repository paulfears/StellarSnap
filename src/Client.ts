import { Transaction } from "stellar-base";

export async function fund(wallet){
    const response = await fetch(
        `https://friendbot.stellar.org?addr=${encodeURIComponent(
          wallet.address,
        )}`,
      );
      const responseJSON = await response.json();
      return responseJSON;
}


export class Client{
    testNetURL:string
    enpoint:string
    constructor(){
        this.testNetURL = "https://horizon-testnet.stellar.org"
        this.enpoint = this.testNetURL;
    }
    async get(path){
        console.log("here")
        const response = await fetch(this.enpoint+'/'+path)
        const json = await response.json()
        return json
    }
    async post(path){
        console.log("here")
        const response = await fetch(this.enpoint+'/'+path, {
            method: "POST",
            headers: { 
                'Accept': 'application/json'
            }
        })
        const json = await response.json()
        return json
    }
    async getAccount(address: string){
        const data = await this.get(`accounts/${address}`);
        console.log(data);
        return data
    }
    async getBalance(address: string){
        const info = await this.getAccount(address)
        return info.balances[0].balance
    }
    async getSequence(address: string){
        const info = await this.getAccount(address)
        return info.sequence
    }
    async submitTransaction(transaction: Transaction){
        const tx = encodeURIComponent(transaction.toEnvelope().toXDR().toString("base64"));
        const path = `transactions?tx=${tx}`;
        const response = await this.post(path);
        return response;
    }
}