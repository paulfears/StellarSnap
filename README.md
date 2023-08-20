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