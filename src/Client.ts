import { Transaction } from "stellar-base";

const testNetURL = "https://horizon-testnet.stellar.org"
const mainNetURL = "https://horizon.stellar.org/"

export async function fund(wallet){
    const response = await fetch(
        `https://friendbot.stellar.org?addr=${encodeURIComponent(
          wallet.address,
        )}`,
      );
      console.log(response);
      const responseJSON = await response.json();
      console.log(responseJSON);
      return responseJSON;
}



export class Client{
    endPoint:string
    testNet: boolean
    testNetURL: string
    mainNetURL: string
    MainnetPassphrase = 'Public Global Stellar Network ; September 2015'
    TestnetPassphrase = 'Test SDF Network ; September 2015'
    currentPassphrase: string

    constructor(testnet:boolean=false){
        if(testnet){
            this.currentPassphrase = this.TestnetPassphrase
            this.endPoint = testNetURL;
        }
        else if(!testnet){
            this.currentPassphrase = this.MainnetPassphrase
            this.endPoint = mainNetURL;
        }
    }
    async get(path){
        console.log("here")
        console.log(this.endPoint)
        const response = await fetch(this.endPoint+'/'+path)
        const json = await response.json()
        return json
    }
    async post(path){
        console.log("here")
        const response = await fetch(this.endPoint+'/'+path, {
            method: "POST",
            headers: { 
                'Accept': 'application/json'
            }
        })
        const json = await response.json()
        return json
    }
    setNetworkPassphrase(networkPasspharse: string){
        this.currentPassphrase = networkPasspharse;
    }
    setTestnet(testnet:boolean){
        if(testnet){
            console.log("setting endpoint to Testnet")
            this.endPoint = testNetURL
            console.log(this.endPoint);
        }
        else{
            console.log("setting endpoint to Testnet")
            this.endPoint = mainNetURL
            console.log(this.endPoint);
        }
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