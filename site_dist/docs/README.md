# Stellar Snap
adds stellar to metamask, by creating a non-custodial wallet built directly into metamask

## Standard Useage

### connecting

calling this method will connect to metamask and automatically install the snap if it isn't already installed.
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