
# Stellar Snap

This guide provides detailed instructions on integrating Stellar wallet functionalities into MetaMask Snaps, enabling seamless interaction with Stellar applications. This integration aims to create a universal standard for integrating Stellar wallet functionalities across different applications.

---
## full documentation

[full documentation](https://stellar-snap-paulfears-projects.vercel.app/docs)

## Table of Contents
- [Quick Start](#quick-start)
  - [✨ Connect and Install](#connect-and-install)
  - [✨ Calling Stellar Methods](#calling-stellar-methods)
    - [🟠 Get Wallet Data](#get-wallet-data)
    - [🌐 Specify a Network](#specify-a-network)
    - [🔏 Easily Signing a Transaction](#easily-signing-a-transaction)
- [Calling Stellar RPC Methods](#calling-stellar-rpc-methods)
- [Stellar Methods](#stellar-methods)
- [Conclusion](#conclusion)

## Quick Start

Follow these steps to get started with integrating Stellar-Wallet functionalities into your MetaMask Snaps.

### ✨ Connect and Install

1. **Set Up MetaMask Flask**: Ensure you have MetaMask Flask installed, which is a version tailored for developers to create and integrate Snaps.
  
2. **Install Metastellar Snap**: Follow the installation instructions provided in the [Metastellar Documentation](#) to connect your MetaMask to the Stellar network.

3. **Create Your Snap**: Use the MetaMask Snaps CLI to initialize a new Snap project. Refer to the MetaMask Snaps documentation for detailed guidance on setting up your environment.
Installation
To install Stellar Snap, clone the repository and install the necessary dependencies:

```javascript
git clone https://github.com/yourusername/stellar-snap.git
cd stellar-snap
yarn install
```
To run the application, execute:
```
yarn start
```
This command starts the application and opens the user interface for interaction.

### Connecting to MetaMask
To connect Stellar Snap to MetaMask, use the following method:

```javascript
const result = await ethereum.request({
  method: 'wallet_requestSnaps',
  params: {
    [`npm:stellar-snap`]: {}
  },
});
```
### Invoking Stellar Wallet Methods
You can invoke Stellar wallet methods using the following structure:

```javascript

const result = await ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: `npm:stellar-snap`,
    request: {
      method: `${methodName}`,
      params: {
        paramName: `${paramValue}`
      }
    }
  }
});
```


### Calling Stellar Wallet Functions from Other MetaMask Snaps
To call Stellar-Wallet functions from other MetaMask snaps, you need to ensure that the Snap containing the Stellar wallet is installed and running. You can then use the wallet_invokeSnap method to access its functions.

**Example**
Assuming you have another Snap that needs to call the getBalance method from Stellar Snap, you can do this:

```javascript
const balance = await ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: `npm:stellar-snap`,
    request: {
      method: 'getBalance',
      params: {
        address: 'your-stellar-address', // replace with the actual Stellar address
        testnet: false // optional; true for testnet
      }
    }
  }
});
console.log('Balance:', balance);
```
#### Important Notes
1. Error Handling: Always implement error handling for network requests to manage any exceptions or issues that may arise.

2. Snap ID: Ensure that you are using the correct Snap ID (e.g., npm:stellar-snap) when invoking methods.

3. Asynchronous Calls: The requests to the Snap are asynchronous, so make sure to use async/await or .then() for handling promises.

### ✨ Calling Stellar Methods

Integrating Stellar functionalities allows applications to leverage important wallet features. Below are key methods for interaction:


#### 🟠 Get Wallet Data

Retrieve essential information related to the user's Stellar wallet.

```javascript
const address = await callMetaStellar('getAddress');
console.log(`Current Address: ${address}`);
```

#### 🌐 Specify a Network

Set the network environment for transactions, ensuring users connect to the appropriate Stellar network (Mainnet or Testnet).
this can be done by passing a boolean into the testnet parameter to any call. This is optional, and method calls will be treated
as mainnet if this parameter is omitted. If the testnet parameter is not relevant to a method call it is simply ignored

```javascript
const balance = await ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: `npm:stellar-snap`,
    request: {
      method: 'getBalance',
      params: {
        testnet: false // optional; true for testnet
      }
    }
  }
});

```

#### 🔏 Easily Signing a Transaction

Enable users to securely sign transactions to ensure authorized actions.

```javascript
const signedTransaction = await callMetaStellar('signTransaction', { transaction:xdr });
console.log(`Signed Transaction: ${signedTransaction}`);
```

### Calling Stellar RPC Methods

#### Copy the `callMetaStellar` Function

The easiest way to interact with the wallet is by copying the `callMetaStellar` function. This function acts as a bridge to make calls to the Stellar RPC methods defined in your Snap.

```javascript


async function callMetaStellar(method, params){
    if (typeof window !== 'undefined' && typeof window.ethereum !== undefined) {
        //You Can Delete this section after offical launch
        const isFlask = ( 
        await window.ethereum?.request({ method: "web3_clientVersion" })
        )?.includes("flask"); 
        if(!isFlask){
        alert("install Metamask Flask")
        }
        // ------------------------------------------------
        try{
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
        catch(e){
            alert(e.message);
        }
    }
}

    
```

**Invoke the `callMetaStellar` function:**

```javascript
// Connect
const connected = await callMetaStellar('connect');

// Get Address
const address = await callMetaStellar('getAddress'); 

// Sign Transaction
const params = { transaction: txn, testnet: true };
const signedTxn = await callMetaStellar('signTransaction', params);
// Returns a signed Stellar transaction in XDR as a string
```

### Stellar Methods

Here’s a comprehensive list of Stellar methods available for invocation via the `callMetaStellar` function. Each function includes a brief description of its purpose and a sample implementation.

1. **getAddress**
   - **Description**: Fetch the current Stellar address.
   - **Implementation**:
   ```javascript
   async function getAddress() {
       return await callMetaStellar('getAddress');
   }
   ```

2. **getAccountInfo**
   - **Description**: Retrieve detailed information about a specific account.
   - **Implementation**:
   ```javascript
   async function getAccountInfo(accountId) {
       return await callMetaStellar('getAccountInfo', { address:accountId });
   }
   ```

3. **getBalance**
   - **Description**: Get the current balance of a specific account.
   - **Implementation**:
   ```javascript
   async function getBalance(accountId) {
       return await callMetaStellar('getBalance', {testnet:true});
   }
   ```

4. **transfer**
   - **Description**: Initiate an XLM transfer to another account.
   - **Implementation**:
   ```javascript
   async function transfer(destination, amount) {
        gAddress = destination //stellar address
        xlmAmount = amount //decimal amount of xlm as a string ex. '2.146'
        return await callMetaStellar('transfer', {to:`${gAddress}`, amount:`${xlmAmount}`, testnet?:true});
   }
   ```

5. **fund**
   - **Description**: Fund a testnet account with Stellar Lumens (XLM).
   - **Implementation**:
   ```javascript
   async function fund(accountId, amount) {
       return await callMetaStellar('fund');
   }
   ```

6. **signTransaction**
   - **Description**: Sign a transaction using the provided XDR.
   - **Implementation**:
   ```javascript
   async function signTransaction(xdr) {
       return await callMetaStellar('signTransaction', { transaction:`${xdr} as a string` });
   }
   ```

7. **signAndSubmitTransaction**
   - **Description**: Sign a transaction and submit it to the Stellar network.
   - **Implementation**:
   ```javascript
   async function signAndSubmitTransaction(xdr) {
       return await callMetaStellar('signAndSubmitTransaction', { transaction:`${xdr} as a string` });
   }
   ```

8. **getDataPacket**
   - **Description**: Retrieve a data packet for off-chain storage or processing.
   - **Implementation**:
   ```javascript
   async function getDataPacket() {
       return await callMetaStellar('getDataPacket');
   }
   ```

9. **setCurrentAccount**
   - **Description**: Set the currently selected account.
   - **Implementation**:
   ```javascript
   async function setCurrentAccount(accountId) {
       return await callMetaStellar('setCurrentAccount', { address:'G-address' });
   }
   ```

10. **showAddress**
    - **Description**: Display the current Stellar address to the user. Including QR code
    - **Implementation**:
    ```javascript
    async function showAddress() {
        return await callMetaStellar('showAddress');
    }
    ```

11. **createAccount**
    - **Description**: Create a new Stellar account.
    - **Implementation**:
    ```javascript
    async function createAccount() {
        return await callMetaStellar('createAccount', {name:'accountname-string'});
    }
    ```

12. **listAccounts**
    - **Description**: List all accounts associated with the wallet.
    - **Implementation**:
    ```javascript
    async function listAccounts() {
        return await callMetaStellar('listAccounts');
    }
    ```

13. **renameAccount**
    - **Description**: Rename an existing account. This is done by the user using a pop-up
    - **Implementation**:
    ```javascript
    async function renameAccount(address) {
        return await callMetaStellar('renameAccount', {address:`${address}`});
    }
    ```

14. **importAccount**
    - **Description**: Import an account using a secret key.
    - **Implementation**:
    ```javascript
    async function importAccount(secretKey) {
        return await callMetaStellar('importAccount');
    }
    ```

15. **getAssets**
    - **Description**: Retrieve a list of assets held in the wallet.
    - **Implementation**:
    ```javascript
    async function getAssets() {
        return await callMetaStellar('getAssets');
    }
    ```

16. **sendAuthRequest**
    - **Description**: Send an authentication request to a specific address.
    - **Implementation**:
    ```javascript
    async function sendAuthRequest(destination) {
        return await callMetaStellar('sendAuthRequest', { destination });
    }
    ```

17. **signStr**
    - **Description**: Sign a string message for verification.
    - **Implementation**:
    ```javascript
    async function signStr(message) {
        return await callMetaStellar('signStr', { message });
    }
    ```

18. **dispPrivateKey**
    - **Description**: Display the private key for an account.
    - **Implementation**:
    ```javascript
    async function dispPrivateKey(accountId) {
        return await callMetaStellar('dispPrivateKey', { accountId });
    }
    ```



These functions form the core of your Stellar wallet integration within MetaMask Snaps. By utilizing these methods, you enable smooth interaction with Stellar features, fostering a cohesive user experience across applications.

## Conclusion

By following this guide, you can effectively integrate Stellar wallet functionalities into your MetaMask Snaps. This modular approach enhances your application while establishing a universal standard for Stellar wallet integration, allowing other developers to easily adopt the framework.
