# Stellar Snap Documentation

## Stellar on Metamask
The metastellar.io team manages and maintains the stellar wallet plugin for metamask. If implemented correctly, <b>the end user should be aware they are using the stellar chain, but the experence should never
feel like they are using a 'plug-in'</b> hince the term <b>snap</b>.

The <b>metastellar snap</b> is a piece of code that lives inside the metamask wallet, and is automatically installed when requested by a web app.
Connecting to the Stellar network using the snap is covered in <a href="https://metastellar.io/docs/#/?id=%e2%9c%a8connect-and-install">✨connect and install</a> portion of the docs.

After the user installs the snap, a stellar wallet automatically created for them.
This wallet can be accessed, using the standard metamask rpc api. This means that if you have experence developing with metamask in ethereum this shouldn't be too different. (sadly, no ~~web3.js~~ stellar3.js yet 🤞).

As a developer basic idea, is you shouldn't have to focus on OUR wallet, you should focus on YOUR app.
Ideally the flow would be.

[connect Metamask] -> [<a href="https://github.com/stellar/js-stellar-sdk">create Stellar TXN</a>] -> [call <a href="https://metastellar.io/docs/#/?id=_39signtransaction39">signTxn</a>] -> [<a href="https://github.com/stellar/js-stellar-sdk">submit signed txn</a>] ✅ 

#### happy hacking

<span class="spacer"></span>
<hr>

# Quick Start
<span class="spacer"></span>
  <ol>
  <li>There is <b>NO npm package required!</b></li>
  <li>The only thing required is that the users computer has metamask flask<br/>(just normal metamask after launch)</li>
  <li><a href="https://docs.metamask.io/snaps/get-started/install-flask/">install flask</a></li>
  </ol>
<span class="spacer"></span>

  ## ✨Connect and install: 
  The <b>wallet_requestSnaps</b> method is used to <b>connect</b> to MetaMask <b>and installs</b> the Stellar Wallet if it's not already installed. This also generates the user's wallet.
  ```javascript
  
  /* //request connection */
  async function connect(){
    const connected = await ethereum.request({
      method: 'wallet_requestSnaps',
      params: {
        [`npm:stellar-snap`]: {}
      },
    });
  }
  
  ```
<button id="connectButton">exec connect()</button>

<br>

<span class="spacer"></span>

  ## 🦑Calling Stellar Methods:
  After the snap is connected the <b>wallet_invokeSnap</b> method is used to call Stellar Methods
```javascript 
  
      //evoke a stellar method
      
      const request = {
          method: 'wallet_invokeSnap',
          params: {snapId:`npm:stellar-snap`, 
            request:{
              method: `${'Stellar-Method-Name'}`
            }
          }
      }
      let address = await ethereum.request(request)
  
  
      // gets the stellar address
      address = await ethereum.request({
          method: 'wallet_invokeSnap',
          params: {snapId:`npm:stellar-snap`, request:{
              method: `getAddress`,
          }}
      })
    
  ```
  <span class="spacer"></span>
  <button id="execAddressButton">get the users Address!</button>
  <script>
  
  </script>
 

  ## 📟Calling Stellar Methods With Parameters
    
  <b>Parameters are nested,</b> parameters inside parameters
  
  ```javascript 
      //evoke a stellar method with arguments
      let stellarTransactionXDR = endTransaction.build().toXDR(); //transaction from the stellar-js-sdk
      const args = {
        transaction: String(stellarTransactionXDR),
        network:'testnet'
      }
      const request = { 
          method: 'wallet_invokeSnap', //constant across all method calls
          params:{snapId:'npm:stellar-snap', request:{  //this too
            method:`${'signTransaction'}`,
            params:args
          }
          }
      }
      let SignedTransactionXDR = await ethereum.request(request)
      
      // example method call with parameters
      SignedTransactionXDR = await ethereum.request({
          method: 'wallet_invokeSnap',
          params: {snapId:`npm:stellar-snap`, request:{
              method: `signTransaction`,
              params:{
                transaction: stellarTransactionXDR
                testnet:true
              }

          }}
      })
  ```

<span class="spacer"></span>

<script>
  let connectButton = document.getElementById("connectButton");
  console.log(connectButton)
  connectButton.addEventListener('click', async ()=>{
    try{
      console.log("here")
      const connected = await ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
          ['npm:stellar-snap']: {}
        },
      });
      console.log(connected)
      alert("connected")
    }catch(e){
      if (e.toString() === "ReferenceError: ethereum is not defined"){
         alert("Install metamask flask")
      }
      alert(e);
    }
  });
  const getAddress = async function(){
    console.log("here2")
    try{
        console.log("about to run request");
        const request = {
            method: 'wallet_invokeSnap',
            params: 
            
              {
                snapId:'npm:stellar-snap', 
                request:{
                  method: `${'getAddress'}`
                }
              }
            
        }
        console.log("request in memory")
        let address = await ethereum.request(request);
        console.log("request complete");
        console.log(address)
        // gets the stellar address
        address = await ethereum.request({
            method: 'wallet_invokeSnap',
            params: 
              {
                snapId:'npm:stellar-snap', 
                request:{
                    method: 'getAddress',
                }
              }
            
        });
        alert(address);
    }
    catch(e){
      console.log("error");
      console.log(e);
      alert(e);
    }
  }
  let execButton = window.document.getElementById("execAddressButton");
  console.log(execButton);
  execButton.addEventListener('click', getAddress);
  
</script>

Specifying Network: By default, all methods are treated as mainnet (the main network where actual transactions take place). However, you can specify the testnet (a network used for testing) by passing testnet: true in the parameters.

Current Methods: The README then provides examples of how to use various methods provided by the stellar-snap plugin. These methods include getAddress (returns the account's address), getAccountInfo (returns information related to the account), getBalance (returns the XLM balance of a wallet), transfer (transfers XLM from one account to another), fund (funds the user's wallet on the testnet), and signTransaction (signs an arbitrary transaction).

Soroban: The README also provides an example of how to use the Soroban feature, which allows you to sign a SorobanCall. This involves creating a SorobanClient, getting the account, creating a contract, preparing a transaction, and then signing the transaction.

# Stellar Metamask Methods

<span class="spacer"></span>

## ⚠️ The Docs past this point are incomplete ⚠️
you can always ask a question in the
[discord](https://discord.gg/ETQk4UcYyc)

<span class="spacer"></span>
<span class="spacer"></span>

## connecting

### calling this method will connect to metamask and automatically install the snap if it isn't already installed.

As well as generate the users wallet.
Calling this method or any subsequent methods does not requiring installing anything to a webpage, provided the the user
has metamask (flask) installed.

```javascript
const result = await ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
          [`npm:stellar-snap`]: {}
        },
      });
```
### calling methods

example method call
```javascript 
    const result = await ethereum.request({
        method: 'wallet_invokeSnap',
        params: {`npm:stellar-snap`, request:{
            method: `${methodName}`,
            params:{
              paramName: `${paramValue}`
            }
        }}
    })
```

### specifying network
by default all methods are treated as mainnet, but any method can be issued to the testnet
by using the testnet param.

example:
```javascript
    const result = await ethereum.request({
        method: 'wallet_invokeSnap',
        params: {snapId:`npm:stellar-snap`, request:{
            method: `getBalance`,
            params:{
              testnet: true
            }
        }}
    })
```

### current Methods

####

#### 'getAddress'
returns the accounts address as a string
```javascript
    const address = await ethereum.request({
        method: 'wallet_invokeSnap',
        params: {snapId:`npm:stellar-snap`, request:{
            method: `getAddress`,
        }}
    })
```

#### 'getAccountInfo'
grabs infomation related to the account
requires account to be funded
```typescript
    const info = await ethereum.request({
        method: 'wallet_invokeSnap',
        params: {snapId:`npm:stellar-snap`, request:{
            method: `getAccountInfo`,
            params:{
                testnet?: true | false
            }
        }}
    })
```

#### 'getBalance'
gets the XLM balance of a wallet, returns 0 in unfunded wallets

```typescript
    const balance = await ethereum.request({
        method: 'wallet_invokeSnap',
        params: {snapId:`npm:stellar-snap`, request:{
            method: `getBalance`,
            params:{
                testnet?: true | false
            }
        }}
    })
```

### 'transfer'
this method is used to transfer xlm and requires a funded account.
after being called the wallet will generate a transaction, then prompt a user to accept
if the user accepts the transaction it will be signed and broadcast to the network.
will return transaction infomation. And send a notification stating whether the transaction was
successful.
```typescript
const transactionInfomation = await ethereum.request({
        method: 'wallet_invokeSnap',
        params: {snapId:`npm:stellar-snap`, request:{
            method: `getBalance`,
            params:{
                to: 'stellarAddress' //string
                amount: '1000.45' //string represention of amount xlm to send
                testnet?: true | false
            }
        }}
    })

```

### 'fund'
this method funds the users wallet on the testnet
```javascript
const success = await ethereum.request({
    method: 'wallet_invokeSnap',
    params: {snapId:`npm:stellar-snap`, 
        request:{
            method: 'fund'
        }
    }
    })
```
### 'signTransaction'
This method signs an Arbitary Transaction
```javascript
    async function signTransaction(){
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
      const response = await ethereum.request({
        method: 'wallet_invokeSnap',
        params:{snapId:snapId, request:{
          method: 'signTransaction',
          params:{
            transaction: xdrTransaction,
            testnet: testnet
          }
        }}
      })
      console.log(response);
    }
```
### 'Soroban'
The Wallet also supports sorroban, To sign a SorobanCall
futurenet must be set to true on the params object.
```javascript
    async function callContract() {
      console.log("here in callContract");
  const sourcePublicKey = await ethereum.request({
          method: 'wallet_invokeSnap',
          params: {snapId:snapId, request:{
            method: 'getAddress',
          }}
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
    const signedXDR = await ethereum.request(
      {method: 'wallet_invokeSnap',
          params: {
            snapId:snapId, 
            request:{
              method: 'signTransaction',
              params:{
                transaction: tx_XDR,
                futurenet: true
              }
            }
          }
      }
    )
  console.log(signedXDR)
  try{
    
    const transactionResult = await server.sendTransaction(signedXDR);
    console.log(JSON.stringify(transactionResult, null, 2));
    console.log('\nSuccess! View the transaction at: ');
    console.log(transactionResult)
  } catch (e) {
    console.log('An error has occured:');
    console.log(e);
  }
}

```
## building from Source

```shell
foo@bar:~$ yarn
...

foo@bar:~$ npx mm-snap build

...
Build success: 'src\index.ts' bundled as 'dist\bundle.js'!
Eval Success: evaluated 'dist\bundle.js' in SES!

foo@bar:npx mm-snap serve

Starting server...
Server listening on: http://localhost:8080
```
and just like that you should be good to go.

## Key Generation and Storeage
keys are generated on the fly, anytime a method is invoked.
This works by requesting private entropy from the metamask wallet inside
of the snaps secure execution enviroment, and using that entropy to generate
a users keys. This entropy is static, and based on the users ethereum account.
This means that we at no point store keys, and the fissile material is handled
by metamask.

## Account Recovery
Because keys are handled in this way, when a user recovers their metamask account, they will also recover their stellar
account, which means that there isn't another mnemonic to save. 