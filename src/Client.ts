import { wallet } from "./accounts";

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
    wallet: wallet
    constructor(wallet: wallet){
        this.testNetURL = "https://horizon-testnet.stellar.org"
        this.enpoint = this.testNetURL;
        this.wallet = wallet;
    }
    async get(path){
        const response = await fetch(this.enpoint+'/'+path)
        const json = await response.json()
        return json
    }
    async getAccount(){
        return await this.get(`accounts/${this.wallet.address}`);
    }
}