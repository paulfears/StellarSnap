import { Account, Address, Keypair } from "stellar-base"



export async function createFederationAccount(account:Keypair, username:string){
    const preflightRun = await lookupAddress(account.publicKey());
    const preflightRun2 = await lookupFedAccount(username+"*metastellar.io");
    console.log(preflightRun2);
    console.log(preflightRun2.error);
    if(preflightRun.error === "not found"){
        console.log("good to go");
    }
    else{
        return {"error": "address already has an account"}
    }
    if(preflightRun2.error == "not found"){
        console.log("good to go");
    }
    else{
        return {"error": "username is already in use"}
    }

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

export async function lookupFedAccount(name){
    try{
    const res = await fetch(`https://stellarid.io/federation/?q=${name}&type=name`, {
        method: "GET",
        mode: 'cors',
        headers: { 
            'Accept': 'application/json'
        },
    });
    console.log(res);
    if(res.status === 404){
        console.log("in here")
        return {"error":"not found"}
    }
    const output = await res.text();
    console.log(output);
    return output;
    }
    catch(e){
        console.log("there was an error");
        console.log(e);
        return e;
    }
}
export async function lookupAddress(address:string){
    try{
    const res = await fetch(`https://stellarid.io/federation/?q=${address}&type=id`, {
        method: "GET",
        mode: 'cors',
        headers: { 
            'Accept': 'application/json'
        },
    });
    console.log("response is");
    console.log(res);
    if(res.status === 404){
        console.log("in here");
        return {"error":"not found"}
    }
    const output = await res.json();
    console.log("output text is:");
    console.log(output);
    return output;
    }
    catch(e){
        console.log("there was an error");
        console.log(e);
        return e;
    }
}