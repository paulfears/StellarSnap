# Stellar Wallet MetaMask Snap

This guide is on how to integrate Stellar-wallet functions into other MetaMask snaps. This approach allows Stellar applications to launch and interact with

## Installation

First, you must install the Stellar Wallet Snap into your MetaMask instance by creating a non-custodial wallet built directly into metamask.

There is NO npm package required currently.

The only thing required is that the users computer has metamask flask.

[Install flask](https://docs.metamask.io/snaps/get-started/install-flask/)

To install the Stellar Wallet Snap in MetaMask:

- Ensure you have MetaMask installed and updated to the latest version.

- The `wallet_requestSnaps` method is used to connect to MetaMask and installs the Stellar Wallet if it's not already installed. This also generates the user's wallet.

```bash
/* //request connection */
async function connect(){
  const connected = await window.ethereum.request({
    method: 'wallet_requestSnaps',
    params: {
      [`npm:stellar-snap`]: {}
    },
  });
}
```

Following the installation prompts will help you to complete the setup.

## Usage

After installation, you can access the Stellar Wallet Snap through the MetaMask interface:

First, open MetaMask and click on the puzzle piece icon to view installed snaps.
Then Select "Stellar Wallet" from the list of snaps.
You can now manage your Stellar accounts, send transactions, and view your balance.

#### Using Stellar-Wallet Functions

- Calling Stellar-Wallet Functions from Other Snaps

Several other MetaMask Snaps can also invoke Stellar-Wallet Snap functions. After the snap is connected the `wallet_invokeSnap` method is used to call Stellar Methods

```bash
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

- Checking Stellar Account Balance

You can use the code below to invoke the Stellar Wallet Snap to check the balance of a Stellar account:

```bash
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

- Creating a Stellar Transaction

Lastly for creating a Stellar Transaction, This method is used to transfer `XLM` and requires an account with sufficient funds. Upon invocation, the wallet generates a transaction and prompts the user for approval. If the user accepts, the transaction is signed and broadcast to the network. It returns transaction details and sends a notification indicating whether the transaction was successful.

```bash
const transactionInfomation = await ethereum.request({
        method: 'wallet_invokeSnap',
        params: {snapId:`npm:stellar-snap`, request:{
            method: `getBalance`,
            params:{
                to: 'stellarAddress' //string
                amount: '500' //This is an arbitrary representation of the XLM to be sent
                testnet?: true | false
            }
        }}
    })

```

## Universal Standard for Interactions

To have a Universal Standard for Interactions, all Stellar applications integrating with MetaMask should follow the following principles:

- `Compatibility:` Test each interaction across different environments (e.g., testnets and mainnet).

- `Modular Snap Functions:` All interactions should be modular and based on `wallet_invokeSnap` method calls.

- `Security:` It is required to perform sensitive actions securely through signed requests on Metamask.
