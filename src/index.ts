import { OnRpcRequestHandler } from '@metamask/snap-types';

import { getWallet } from './Wallet';
import { fund, Client } from './Client';
import { TxnBuilder } from './TxnBuilder';
import { WalletFuncs } from './WalletFuncs';
import { Screens } from './screens';
import {createFederationAccount, lookupAddress, lookupFedAccount} from './federation'
import { NotificationEngine } from './notificationEngine';

import { OnCronjobHandler } from '@metamask/snaps-types';
import { parseRawSimulation } from './sorobanTxn';


export const onCronjob: OnCronjobHandler = async ({ request }) => {
  const wallet = await getWallet();
  const keyPair = wallet.keyPair;
  const mainnet_client = new Client("mainnet");
  const engine = new NotificationEngine(mainnet_client, wallet);
  switch (request.method) {
    case 'NotificationEngine':{
      console.log("notification check");
      await engine.checkForNotifications();
      return null;
      /*
      return snap.request({
        method: 'snap_notify',
        params: {
          type: 'native',
          message: `Hello, world!`,
        },
      });
      */
    }


    default:
      throw new Error('Method not found.');
  }
};

export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  const wallet = await getWallet();
  const params = request.params;
  let wallet_funded = false;
  let baseAccount;

  const keyPair = wallet.keyPair;
  const client = new Client();
  console.log(request);
  console.log(params);
  if(params?.testnet && params?.futurenet){
    throw new Error("cannot use testnet and futurenet at the same time");
  }
  if(params?.testnet){
    console.log("testnet is true");
    client.setNetwork('testnet');
  }
  else if(params?.futurenet){
    console.log("futurenet is true");
    client.setNetwork('futurenet');
  }
  else{
    console.log("network is mainnet");
    client.setNetwork('mainnet');
  }
  try{
    console.log("attempting to fund wallet");
    baseAccount = await wallet.getBaseAccount(client);
    wallet_funded = true;
  }
  catch(e){
    console.log("Account not funded yet")
  }
  let txnBuilder: TxnBuilder;
  let operations: WalletFuncs;
  if(wallet_funded){
    console.log("wallet funded");
    txnBuilder = new TxnBuilder(baseAccount);
    operations = new WalletFuncs(baseAccount, keyPair, txnBuilder, client);
  }
  
  switch (request.method) {
    // ------------------------------- Methods That Do not Require A funded Account ---------------------------------
    case 'getAddress':
      return wallet.address
    case 'fund':
      return await fund(wallet);
    case 'getWalletName':
      const res = await lookupAddress(wallet.address);
      return res.stellar_address;
    case 'lookUpFedAddress':
        return await lookupAddress(params.address);
    case 'lookUpFedName':
        return await lookupFedAccount(params.url);
    // -------------------------------- Methods That Require a funded Account ------------------------------------------
    case 'getAccountInfo':
      if(!wallet_funded){
        await Screens.RequiresFundedWallet(request.method, wallet.address);
        throw new Error('Method Requires Account to be funded');
      }
      return await client.getAccount(wallet.address)
    case 'getBalance':
      if(!wallet_funded){
        return '0';
      }
      return await client.getBalance(wallet.address)
    case 'getAssets':
      return await client.getAssets(wallet.address);
    case 'transfer':
      if(!wallet_funded){
        await Screens.RequiresFundedWallet(request.method, wallet.address);
        throw new Error('Method Requires Account to be funded');
      }
      return await operations.transfer(params.to, params.amount);
    case 'signTransaction':
      if(!wallet_funded){
        await Screens.RequiresFundedWallet(request.method, wallet.address);
        throw new Error('Method Requires Account to be funded');
      }
      const txn = await operations.signArbitaryTxn(params.transaction);
      return txn.toXDR();
    case 'signAndSubmitTransaction':
      if(!wallet_funded){
        await Screens.RequiresFundedWallet(request.method, wallet.address);
      }
      return await operations.signAndSubmitTransaction(params.transaction);
    case 'callContract':
      //to do
      return "null"
    case 'createFederationAccount':
      return await createFederationAccount(wallet.keyPair, params.username);

    default:
      throw new Error('Method not found.');
  }
};
