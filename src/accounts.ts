globalThis.Buffer = require('buffer/').Buffer
const nacl = require('tweetnacl');
import {StrKey} from './strKey';


export class wallet{
    keyPair;
    address;
    constructor(seed){
        this.keyPair = nacl.sign.keyPair.fromSeed(seed);
        this.address = StrKey.encodeEd25519PublicKey(this.keyPair.publicKey.buffer)
    }

    sign(data){
        const signature = nacl.sign.detached(data, this.keyPair.secretKey);
      
        return signature;
    };
    verify(data, signature){
      
        return nacl.sign.detached.verify(data, signature, this.keyPair.publicKey);
    };
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
    const seed = wallet.fromHexString(entropy).slice(0, 32)
    console.log(seed);
    return new wallet(seed)
}


