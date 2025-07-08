import { Keypair } from "stellar-base";
import {panel, text, heading, divider, copyable} from '@metamask/snaps-ui';
import Utils from "./Utils";
import { InteractionHandler } from "./InteractionHandler";

export class Auth{
    keypair:Keypair;
    
    constructor(keypair:Keypair){

        this.keypair = keypair;
    }
    async getTestKey(url: string):Promise<any>{
        const res = await fetch(url);
        const key = await res.json();
        return key.key;
    }
    prepairTest(data:string):Buffer{
        const dataHex = Buffer.from(data).toString('hex');
        const safty = Buffer.from("__challenge__").toString('hex');
        //this is done so an evil server couldn't use this function to sign a valid transaction
        const prepaired = Buffer.from(safty+dataHex, 'hex');
        return prepaired;
    }
    async signData(data: string):Promise<string>{
        let displayPanel = panel([
            heading('Sign Text?'),
            divider(),
            copyable(data), //KYR-01-002 resolved here, markdown characters will not show up in the copyable component
            divider(),
            text('request from: '+InteractionHandler.requestOrigin)
        ])
        const confirmation = await Utils.displayPanel(displayPanel);
        if(!confirmation){
            return "not signed"
        }
        const prepairedData = this.prepairTest(data);
        const proof = this.keypair.sign(prepairedData).toString('hex');
        return proof;
    }
    async getAuthObject(testKey:string){
        const pk = this.keypair.rawPublicKey().toString('hex');
        const addr = this.keypair.publicKey();
        const proof = await this.signData(testKey);
        return {
            pk,
            addr,
            proof
        }
    }

    async signOnGet(url:string, testKey:string){
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

    async signOnPost(url:string, jsonData:any, testKey:string){
        const auth = await this.getAuthObject(testKey);
        jsonData.auth = auth;
        const outAuth = JSON.stringify(jsonData);
        const response = await fetch(url, 
            {   
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: outAuth
            }
        )

        const output = await response.json();

        return output;
    }
}