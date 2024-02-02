import { FeeBumpTransaction, Transaction } from "stellar-base";
import { SorobanRpc } from "./soroban_rpc";
import { Wallet } from "./Wallet";

const testNetURL = "https://horizon-testnet.stellar.org"
const mainNetURL = "https://horizon.stellar.org"
const futureNetURL =  "https://horizon-futurenet.stellar.org"
const soroban_future_RPC = "https://rpc-futurenet.stellar.org:443"
const soroban_test_RPC = "https://soroban-testnet.stellar.org:443"
const soroban_main_rpc = ""; //to be filled in on launch or just later


export async function fund(wallet:Wallet){
    console.log("funding account");
    console.log("wallet Address is: ");
    console.log(wallet.address);
    const response = await fetch(
        `https://friendbot.stellar.org?addr=${encodeURIComponent(
          wallet.address,
        )}`,
      );
      console.log(response);
      const responseJSON = await response.json();
      console.log(responseJSON);
    const response2 = await fetch(
        `https://friendbot-futurenet.stellar.org?addr=${encodeURIComponent(
          wallet.address,
        )}`,
    );
    const response2JSON = await response2.json();
    return [responseJSON, response2JSON];
}



export class Client{
    endPoint:string
    testNet: boolean
    testNetURL: string
    mainNetURL: string
    MainnetPassphrase = 'Public Global Stellar Network ; September 2015'
    TestnetPassphrase = 'Test SDF Network ; September 2015'
    FuturenetPassphrase = 'Test SDF Future Network ; October 2022'
    currentPassphrase: string;
    network: 'mainnet' | 'testnet' | 'futurenet'

    constructor(network?:'mainnet'|'testnet'|'futurenet'){
        this.setNetwork(network);
    }

    setNetworkPassphrase(networkPasspharse: string):void{
        this.currentPassphrase = networkPasspharse;
    }
    setNetwork(network:'mainnet' | 'testnet' | 'futurenet'):void{
        this.network = network;
        if(network === 'testnet'){
            this.endPoint = testNetURL
            this.currentPassphrase = this.TestnetPassphrase
        }
        if(network === 'mainnet'){
            this.endPoint = mainNetURL
            this.currentPassphrase = this.MainnetPassphrase
        }
        if(network === 'futurenet'){
            this.endPoint = futureNetURL
            this.currentPassphrase = this.FuturenetPassphrase
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

    async postData(path, data){
        
    }

    async getAccount(address: string){
        console.log("getAccount");
        console.log(address);
        const data = await this.get(`accounts/${address}`);
        return data
    }

    async checkAccountExists(address: string):Promise<boolean>{
        const data = await this.getAccount(address);
        if(data.status){
            console.log("data has status property");
            if(data.status === 404){
                return false;
            }
            else{
                
                throw new Error(data);
            }
        }
        console.log("data does NOT have status property");
        return true
    }
    async getBalance(address: string){
        const info = await this.getAccount(address)
        if(info.status){
            return [];
        }
        return info.balances[info.balances.length-1].balance
    }
    
    async getAssets(address: string){
        let info = await this.getAccount(address);
        if(info.status){
            return [];
        }
        info.balances[info.balances.length-1].asset_code = "XLM";
        info.balances[info.balances.length-1].issuer = "native";
        return info.balances;
    }
    async getSequence(address: string){
        console.log("getSequence");
        console.log(address);
        const info = await this.getAccount(address)
        return info.sequence
    }
    async submitTransaction(transaction: Transaction | FeeBumpTransaction){
        const tx = encodeURIComponent(transaction.toEnvelope().toXDR().toString("base64"));
        const path = `transactions?tx=${tx}`;
        const response = await this.post(path);
        return response;
    }

    async simulateSoroBanTransaction(transaction: Transaction): Promise<SorobanRpc.SimulateTransactionResponse>{
        let sorobanRPC;
        if(this.network === 'testnet'){
            sorobanRPC = soroban_test_RPC
        }
        if(this.network === 'futurenet'){
            sorobanRPC = soroban_future_RPC
        }
        if(this.network === 'mainnet'){
            sorobanRPC = soroban_main_rpc;
        }
        const result = await fetch(sorobanRPC, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "id": "1334", //use a uuid in the future
                "method": "simulateTransaction",
                "params": {
                  "transaction": transaction.toXDR()
                }
              })
        });
        const output = await result.json() as SorobanRpc.SimulateTransactionResponse;
        console.log(output);
        return output;
    }
}