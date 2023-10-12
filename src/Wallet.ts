globalThis.Buffer = require('buffer/').Buffer
const nacl = require('tweetnacl');
import {StrKey} from './strKey';
import { Account, Keypair } from 'stellar-base';
import { Client } from './Client';

export class Wallet{
    keyPair: Keypair;
    address: string;
    publicKey: Buffer;
    constructor(seed){
        //this.keyPair = nacl.sign.keyPair.fromSeed(seed);
        this.keyPair = Keypair.fromRawEd25519Seed(seed);
        //this.address = StrKey.encodeEd25519PublicKey(this.keyPair.publicKey.buffer);
        this.address = this.keyPair.publicKey();
        //this.publicKey = this.keyPair.publicKey
        this.publicKey = this.keyPair.rawPublicKey();
        console.log(this.publicKey);
    }

    async getKeyPair(): Promise<Keypair>{
        return this.keyPair;
    }
    
    async getBaseAccount(client: Client): Promise<Account>{
        console.log(client);
        const sequence = await client.getSequence(this.address)    
        return new Account(this.address, sequence);
    }
    static fromHexString(hexString){
        return Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)))
    }
      
}




export async function getWallet(){
    const entropy = await snap.request({
        method: 'snap_getEntropy',
        params: {
          version: 1,
          salt: 'foo', // Optional
        },
    });
    console.log("seed generation")
    console.log(entropy)
    const seed = Wallet.fromHexString(entropy).slice(0, 32)
    console.log(seed);
    return new Wallet(seed)
}


