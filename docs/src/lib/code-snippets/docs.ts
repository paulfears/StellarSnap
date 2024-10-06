let accountAddress = 'accountAddress';
let endpoint = 'endpoint';
let toBeSigned = 'toBeSigned';
let WalletAddress = 'WalletAddress';

export const callMetaStellar = `async function callMetaStellar(method, params){
  //You Can Delete this section after offical launch
  const isFlask = ( 
    await window.ethereum?.request({ method: "web3_clientVersion" })
  )?.includes("flask"); 
  if(!isFlask){
    alert("install Metamask Flask")
  }
  // ------------------------------------------------

  if(method === 'connect'){
  //This will also install stellar if the user has metamask
      return await window.ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
          ['npm:stellar-snap']: {}
        },
      });
  }
  const rpcPacket = {
    method: 'wallet_invokeSnap',
    params:{
      snapId:'npm:stellar-snap',
      request: {'method':method, params:params}
    }
  }
  return await window.ethereum.request(rpcPacket);
}


alert((await callMetaStellar('connect'))?'connected':'not connected');

//await callMetaStellar('showAddress');
//await callMetaStellar('fund');
//await callMetaStellar('getBalance', {testnet:true})`;

export const connect = `/* //request connection */
async function connect(){
  const connected = await window.ethereum.request({
    method: 'wallet_requestSnaps',
    params: {
      [\`npm:stellar-snap\`]: {}
    },
  });
}`;

export const get_wallet_data = `//invoke a stellar method without callMetaStellar()
const request = {
    method: 'wallet_invokeSnap',
    params: {
        snapId:\`npm:stellar-snap\`, 
        request:{
            method: \`${'getDataPacket'}\`
        }
    }
}
let address = (await window.ethereum.request(request)).currentAddress;
// retreives the stellar walletData
const walletData = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
        snapId:\`npm:stellar-snap\`, 
        request:{
            method: \`getDataPacket\`,
        }
    }
})`;

export const specify_a_network = `const result = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
        snapId:\`npm:stellar-snap\`, 
        request:{
            method: \`getBalance\`,
            params:{
                testnet: true
            }
        }
    }
})`;

export const easily_signing_a_transaction = `//invoke a stellar method with callMetaStellar
let stellarTransactionXDR:string = endTransaction.build().toXDR();
let signedTxnXDR:Promise<string> = callMetaStellar('signTransaction', {transaction : stellarTransactionXDR, testnet:true});`;

export const copy_the_metastellar_function = `async function callMetaStellar(method, params){

  //You Can Delete this section after offical launch
  const isFlask = ( 
    await window.ethereum?.request({ method: "web3_clientVersion" })
  )?.includes("flask"); 
  if(!isFlask){
    alert("install Metamask Flask")
  }
  // ------------------------------------------------

  if(method === 'connect'){
  //This will also install stellar if the user has metamask
      return await window.ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
          ['npm:stellar-snap']: {}
        },
      });
  }
  const rpcPacket = {
    method: 'wallet_invokeSnap',
    params:{
      snapId:'npm:stellar-snap',
      request: {'method':method, params:params}
    }
  }
  return await window.ethereum.request(rpcPacket);
}`;

export const invoke_the_metastellar_function = `//connect:
const connected:boolean = await callMetaStellar('connect');
//getAddress:
const address:string = await callMetaStellar('getAddress'); 
//signTransaction:
interface signTxnParams{
  transaction:string //StellarSDK.TransactionXDR as String)
  testnet:boolean
}
let params = {transaction:txn, testnet:true}
const signedTxn:string = await callMetaStellar('signTransaction', params)
//returns a signed stellar transaction in XDR as a string`;

export const getAddress = `const address = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
        snapId:\`npm:stellar-snap\`, 
        request:{
            method: \`getAddress\`,
        }'
    }
})`;

export const getAccountInfo = `const info = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
        snapId:\`npm:stellar-snap\`, 
        request:{
            method: \`getAccountInfo\`,
            params:{
                testnet?: true | false
            }
        }
    }
})`;

export const getBalance = `const balance = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
        snapId:\`npm:stellar-snap\`, 
        request:{
            method: \`getBalance\`,
            params:{
                testnet?: true | false
            }
        }
    }
})`;

export const transfer = `const transactionInfomation = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
        snapId:\`npm:stellar-snap\`, 
        request:{
            method: \`getBalance\`,
            params:{
                to: 'stellarAddress' //string
                amount: '1000.45' //string represention of amount xlm to send
                testnet?: true | false
            }
        }
    }
})`;

export const fund = `const success = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
        snapId:\`npm:stellar-snap\`, 
        request:{
            method: 'fund'
        }
    }
})`;

export const signTransaction = `async function signTransaction(){
    const transaction = new StellarSdk.TransactionBuilder(account, { fee, networkPassphrase: "Test SDF Network ; September 2015" });
    // Add a payment operation to the transaction
    console.log("transaction builder initilazed");
    await transaction.addOperation(StellarSdk.Operation.payment({
        destination: receiverPublicKey,
        // The term native asset refers to lumens
        asset: StellarSdk.Asset.native(),
        // Specify 350.1234567 lumens. Lumens are divisible to seven digits past
        // the decimal. They are represented in JS Stellar SDK in string format
        // to avoid errors from the use of the JavaScript Number data structure.
        amount: '350.1234567',
    }));
    console.log("operations added")
    // Make this transaction valid for the next 30 seconds only
    await transaction.setTimeout(30);
    console.log("timeout set");
    // Uncomment to add a memo (https://www.stellar.org/developers/learn/concepts/transactions.html)
    // .addMemo(StellarSdk.Memo.text('Hello world!'))
    const endTransaction = await transaction.build();
    const xdrTransaction = endTransaction.toXDR();
    console.log(xdrTransaction);
    const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params:{
            snapId:snapId, 
            request:{
                method: 'signTransaction',
                params:{
                    transaction: xdrTransaction,
                    testnet: testnet
                }
            }
        }
    })
    console.log(response);
}`;

export const signAndSubmitTransaction = `if(!wallet_funded){
    await Screens.RequiresFundedWallet(request.method, wallet.address);
}
return await operations.signAndSubmitTransaction(params.transaction);`;

export const getDataPacket = `const walletInfo: DataPacket = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
        \`npm:stellar-snap\`, 
        request:{
            method: \`getDataPacket\`,
        }
    }
})`;

export const setCurrentAccount = `interface setCurrentAccountParams :{ 
    address:string
}
const switchAccountParams:setCurrentAccountParams = {
    address:\`${WalletAddress}\`
}
const result = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
        \`npm:stellar-snap\`, 
        request:{
            method: switchAccountParams,
            params
        }
    }
})`;

export const showAddress = `const result = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
        \`npm:stellar-snap\`, 
        request:{
            method: \`showAddress\`,
        }
    }
})`;

export const createAccount = `interface createAccountParams{
    name: string
}

const createAccountResult = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
        \`npm:stellar-snap\`, 
        request: {
            method: \`createAccount\`,
            params: {
                name: \`${'Account-name'}\`
            }
        }
    }
})`;

export const listAccounts = `const accountList = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
        \`npm:stellar-snap\`, 
        request: {
            method: \`listAccounts\`,
        }
    }
})`;

export const renameAccount = `const result = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {\`npm:stellar-snap\`, 
      request:{
          method: \`renameAccount\`,
          params:{
            address: \`${accountAddress}\`,
            name: \`${'New-Account-Name'}\`
          }
      }}
  })`;

export const importAccount = `const success:boolean = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
      snapId:\`npm:stellar-snap\`, 
      request:{
          method: "importAccount",
      }}
  })`;

export const getAssets = `const assets: walletAsset[] = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
    snapId:\`npm:stellar-snap\`, 
    request:{
        method: \`getAssets\`,
        params:{
          testnet: true
        }
    }}
})`;

export const sendAuthRequest = `const result = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {\`npm:stellar-snap\`, request:{
        method: \`sendAuthRequest\`,
        params:{
            url: \`${endpoint}\`,
            data: Object(postData),
            challenge: \`${toBeSigned}\`
        }
    }}
})`;

export const signStr = `const auth = new Auth(wallet.keyPair);
return await auth.signData(params.challenge);`;

export const dispPrivateKey = `return await Screens.revealPrivateKey(wallet);
// -------------------------------- Methods That Require a funded Account ------------------------------------------`;

export const sendAsset = `if(!wallet_funded){
    await Screens.RequiresFundedWallet(request.method, wallet.address);
    throw new Error('Method Requires Account to be funded');
}
return await operations.transferAsset(params.to, params.amount, params.asset);`;

export const createFederationAccount = `return await Screens.setUpFedAccount(wallet);`;

export const Soroban = `async function callContract() {
    console.log("here in callContract");
    const sourcePublicKey = await window.ethereum.request({
            method: 'wallet_invokeSnap',
            params: {
                snapId:snapId, 
                request:{
                    method: 'getAddress',
                }
            }
        })
    const server = new SorobanClient.Server('https://rpc-futurenet.stellar.org');

    console.log("getting account")
    const account = await server.getAccount(sourcePublicKey);
    console.log("account is: ")
    console.log(account);

    console.log(SorobanClient);

    const contract = new SorobanClient.Contract("CCNLUNUY66TU4MB6JK4Y4EHVQTAO6KDWXDUSASQD2BBURMQT22H2CQU7")
    console.log(contract)
    const arg = SorobanClient.nativeToScVal("world")
    console.log("arg is: ")
    console.log(arg)
    let call_operation = contract.call('hello', arg);
    console.log(call_operation)

    let transaction = new SorobanClient.TransactionBuilder(account, { fee: "150", networkPassphrase: SorobanClient.Networks.FUTURENET })
    .addOperation(call_operation) // <- funds and creates destinationA
    .setTimeout(30)
    .build();

    console.log(transaction)

    const preparedTransaction = await server.prepareTransaction(transaction, SorobanClient.Networks.FUTURENET);
    console.log("prepairedTxn: ");
    console.log(preparedTransaction);
    const tx_XDR = preparedTransaction.toXDR();
    const signedXDR = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
            snapId:snapId, 
            request:{
                method: 'signTransaction',
                params: {
                    transaction: tx_XDR,
                    futurenet: true
                }
            }
        }
    })
    console.log(signedXDR)
    try{
        const transactionResult = await server.sendTransaction(signedXDR);
        console.log(JSON.stringify(transactionResult, null, 2));
        console.log('Success! View the transaction at: ');
        console.log(transactionResult)
    } catch (e) {
        console.log('An error has occured:');
        console.log(e);
    }
}`;

export const DataPacket = `export interface DataPacket{
    name: string, //comment
    currentAddress: string,
    mainnetAssets?: walletAsset[],
    testnetAssets?: walletAsset[],
    accounts: Array<{name:String, address:String}>
    mainnetXLMBalance: string,
    testnetXLMBalance: string,
    fedName: string | null
}`;

export const WalletAsset = `export type walletAsset = AssetBalance | NativeBalance`;

export const NativeBalance = `export interface NativeBalance {
    balance:string,
    liquidity_pool_id?:string,
    limit: string,
    buying_liabilites: string,
    selling_liabilites: string,
    sponser?: string,
    last_modified_ledger: number,
    is_authorized: boolean,
    is_authorized_to_maintain_liabilites: boolean,
    is_clawback_enabled: boolean,
    asset_type: "native",
    asset_issuer: "native"
    asset_code: "XLM"
}`;

export const AssetBalance = `export interface AssetBalance {
    balance: string, //number
    liquidity_pool_id?: string, //number
    limit: string, //number
    buying_liabilites: string, //number
    selling_liabilites: string, //number
    sponser?: string, //address
    last_modified_ledger: number,
    is_authorized: boolean,
    is_authorized_to_maintain_liabilites: boolean,
    is_clawback_enabled: boolean,
    asset_type: "credit_alphanum4"|"credit_alphanum12"
    asset_code: string,
    asset_issuer: string, //address
}`;

export const BuildingFromSource = `foo@bar:~$ yarn
...

foo@bar:~$ npx mm-snap build

...
Build success: 'src\index.ts' bundled as 'dist\bundle.js'!
Eval Success: evaluated 'dist\bundle.js' in SES!

foo@bar:npx mm-snap serve

Starting server...
Server listening on: http://localhost:8080`;
