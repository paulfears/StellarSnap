import { Keypair } from "stellar-base";
import { Wallet } from "./Wallet";
import {panel, text, heading, divider, copyable} from '@metamask/snaps-ui';
import Utils from "./Utils";
const proof = {};
interface AuthRequest{
    [key: number]:any,
    auth:auth
}
interface auth{
    pk:string, //hexString
    address:string, //stellar address
    proof:string //signed item 
}
export class Auth{
    keypair:Keypair;
    
    constructor(keypair){

        this.keypair = keypair;
    }
    async getTestKey(url: string){
        const res = await fetch(url);
        const key = await res.json();
        return key.key;
    }
    prepairTest(data:string):Buffer{
        const dataHex = Buffer.from(data).toString('hex');
        const safty = Buffer.from("__challenge__").toString('hex');
        //this is done so an evil server couldn't use this function to sign a valid transaction
        const prepaired = Buffer.from(safty+dataHex, 'hex');
        console.log("prepaired is");
        console.log(prepaired);
        return prepaired;
    }
    async signData(data: string):string{
        let displayPanel = panel([
            heading('Sign Text?'),
            divider(),
            copyable(data)
        ])
        const confirmation = await Utils.displayPanel(displayPanel);
        if(!confirmation){
            return "not signed"
        }
        const prepairedData = this.prepairTest(data);
        console.log("prepaired data is");
        console.log(prepairedData)
        const proof = this.keypair.sign(prepairedData).toString('hex');
        return proof;
    }
    async getAuthObject(testKey:string){
        const pk = this.keypair.rawPublicKey().toString('hex');
        const addr = this.keypair.publicKey();
        const proof = await this.signData(testKey);
        console.log("auth object -----------------------------")
        console.log('pk')
        console.log(pk);
        console.log('addr');
        console.log(addr);
        console.log('proof');
        console.log(proof);
        return {
            pk,
            addr,
            proof
        }
    }

    async signOnGet(url, testKey){
        const auth = await this.getAuthObject(testKey);
        const outAuth = JSON.stringify({auth:auth})
        const response = await fetch(url, 
            {   
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: outAuth
            }
        )
        return await response.json();
    }

    async signOnPost(url, jsonData, testKey){
        const auth = await this.getAuthObject(testKey);
        console.log("sign on post");
        jsonData.auth = auth;
        console.log("auth is");
        console.log(jsonData.auth);
        const outAuth = JSON.stringify(jsonData);
        console.log("out auth is");
        console.log(outAuth)
        const response = await fetch(url, 
            {   
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: outAuth
            }
        )
        console.log(response);

        const output = await response.json();
        console.log("json output is");
        console.log(output);
        return output;
    }
}