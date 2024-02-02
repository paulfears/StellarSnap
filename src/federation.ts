import { Account, Address, Keypair } from "stellar-base"
import {Auth} from './Auth'
interface fedResponse{
    stellar_address:string | null,
    account_id:string | null,
    error?:string
}

interface createFedResponse{
    error?:string,
    success:boolean
}



export async function createFederationAccount(account:Keypair, username:string): Promise<createFedResponse>{
    
    const preflightRun = await lookupAddress(account.publicKey());
    const preflightRun2 = await lookupFedAccount(username+"*metastellar.io");

    if(preflightRun.error !== "not found"){
        return {"error": "address already has an account", 'success':false}
    }

    if(preflightRun2.error !== "not found"){
        return {"error": "username is already in use", 'success': false}
    }


    const authenticator = new Auth(account);

    const url = "https://regal-sfogliatella-fe7d58.netlify.app/.netlify/functions/createaccount"
    const address = account.publicKey();
    const response = await authenticator.signOnPost(url, {address:address, username:username}, 'createaccount');
    console.log(response);
    return response;
    /*
    try{
        console.log("about to submit")
        const response = await fetch(url, {
            method: "POST",
            mode: 'no-cors',
            headers: { 
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        console.log("submitted")
        console.log("response is");
        console.log(response);
        console.log("new json text is");
        console.log(await response.json())
    }
    catch(e){
        console.log(e);
    }

    console.log("preforming post check");
    let postCheck = await lookupAddress(account.publicKey());
    console.log("postcheck done result is");
    console.log(postCheck);
    if(postCheck.error){
        return {"error":"Account Not Created", "success":false};
    }
    else{
        return {"success":true};
    }
    */
}

export async function lookupFedAccount(name):Promise<fedResponse>{
    try{
        const res = await fetch(`https://stellarid.io/federation/?q=${name}&type=name`, {
            method: "GET",
            mode: 'cors',
            headers: { 
                'Accept': 'application/json'
            },
        });
        console.log("response is");
        console.log(res);
        console.log(res.status);
        if(res.status === 404){
            return {"error":"not found", 'stellar_address':null, 'account_id':null}
        }
        const output = await res.json();
        console.log(output);
        return output;
    }
    catch(e){
        console.log("there was an error");
        console.log(e);
        return e;
    }
}

export async function lookupAddress(address:string):Promise<fedResponse>{
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
            console.log("not found");
            return {'error':"not found", 'stellar_address':null, 'account_id':null}
        }
        const output = await res.json();
        console.log("output text is:");
        console.log(output);
        return output;
    }
    catch(e){
        console.log("there was an error");
        console.log(e);
        return {"stellar_address":null, account_id:null, "error":e};
    }
}