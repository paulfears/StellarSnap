import { Account, Address, Keypair } from "stellar-base"



export async function createFederationAccount(account:Keypair, username:string){
    const url = "https://regal-sfogliatella-fe7d58.netlify.app/.netlify/functions/createaccount"
    const address = account.publicKey()
    console.log("here")
    const proof = account.sign(Buffer.from('createaccount')).toString()
    
    const data = {
        address,
        proof,
        username
    }
    const response = await fetch(url, {
        method: "POST",
        mode: 'no-cors',
        headers: { 
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    console.log("response is");
    console.log(response);
    const output = await response.json();
    console.log("output is");
    console.log(output);
    return output;
}