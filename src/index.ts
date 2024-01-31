import { OnRpcRequestHandler } from '@metamask/snap-types';

import { Wallet, ImportAccountUI, showQrCode} from './Wallet';
import { fund, Client } from './Client';
import { TxnBuilder } from './TxnBuilder';
import { WalletFuncs } from './WalletFuncs';
import { Screens } from './screens';
import {createFederationAccount, lookupAddress, lookupFedAccount} from './federation'
import { NotificationEngine } from './notificationEngine';

import { OnCronjobHandler } from '@metamask/snaps-types';
import { parseRawSimulation } from './sorobanTxn';
import Utils from './Utils';
import { StateManager } from './stateManager';
import {getAssets, getDataPacket} from './assets';
import { Asset } from 'stellar-base';

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  const wallet = await Wallet.getCurrentWallet();
  const mainnet_client = new Client("mainnet");
  const engine = new NotificationEngine(mainnet_client, wallet);
  switch (request.method) {
    case 'NotificationEngine':{
      console.log("notification check");
      await engine.checkForNotifications();
      return null;
    }
    default:
      throw new Error('Method not found.');
  }
};

export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  if(request.method === "clearState"){
    await StateManager.clearState()
  }
  const wallet = await Wallet.getCurrentWallet();
  console.log("wallet is");
  console.log(wallet);
  const params = request.params as any;
  let wallet_funded = false;
  let baseAccount;

  const keyPair = wallet.keyPair;
  console.log("about to init client");
  const client = new Client();
  console.log("client init");
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
    console.log("attempting to get base account");
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
    txnBuilder = new TxnBuilder(baseAccount, client);
    operations = new WalletFuncs(baseAccount, keyPair, txnBuilder, client);
  }
  
  switch (request.method) {
    // ------------------------------- Methods That Do not Require A funded Account ---------------------------------
    case 'getAddress':
      return wallet.address;
    case 'getCurrentAccount':
      return wallet.address;
    case 'getDataPacket':
      return await getDataPacket(wallet, client);
    case 'clearState':
      return await StateManager.clearState();
    case 'setCurrentAccount':
      return await Wallet.setCurrentWallet(params.address, wallet.currentState, true);
    case 'showAddress':
      return await showQrCode(wallet.address)
    case 'createAccount':
      await Wallet.createNewAccount(params.name, wallet.currentState);
      return true;
    case 'listAccounts':
      return await Wallet.listAccounts();
    case 'renameAccount':
      return await Wallet.renameWallet(params.address, params.name, wallet.currentState)
    case 'importAccount':
      await ImportAccountUI(wallet.currentState);
      return true;
    case 'fund':
      console.log("fund called");
      return await fund(wallet);
    case 'getWalletName':
      const res = await lookupAddress(wallet.address);
      return res.stellar_address;
    case 'lookUpFedAddress':
        return await lookupAddress(params.address);
    case 'lookUpFedName':
        return await lookupFedAccount(params.url);
    case 'getBalance':
      if(!wallet_funded){
        return '0';
      }
      return await client.getBalance(wallet.address)
    case 'getAssets':
      return await getAssets(wallet, client);
    case 'signStr':
      return operations.signStr(params.str);
    case 'dispPrivateKey':
      return await Screens.revealPrivateKey(wallet);
    // -------------------------------- Methods That Require a funded Account ------------------------------------------
    case 'getAccountInfo':
      if(!wallet_funded){
        await Screens.RequiresFundedWallet(request.method, wallet.address);
        throw new Error('Method Requires Account to be funded');
      }
      return await client.getAccount(wallet.address)
    case 'transfer':
      if(!wallet_funded){
        await Screens.RequiresFundedWallet(request.method, wallet.address);
        throw new Error('Method Requires Account to be funded');
      }
      return await operations.transfer(params.to, params.amount);

    case 'sendAsset':
      if(!wallet_funded){
        await Screens.RequiresFundedWallet(request.method, wallet.address);
        throw new Error('Method Requires Account to be funded');
      }
      return await operations.transferAsset(params.to, params.amount, params.asset);

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
      //params.params
      //params.address
      return "null"

    case 'createFederationAccount':
      console.log("here")
      while(true){
        const name = await Screens.FedAccountName(wallet);
        if(name === null){
          break;
        }
        
        const result = await createFederationAccount(wallet.keyPair, name as string);
        if(result.error){
          if(result.error === "username is already in use"){
            await Screens.SameNameWarning(name);
            continue;
          }
          if(result.error === "address already has an account"){
            await Screens.AlreadyExistsError(wallet);
          }
        }
        break;
      }

    default:
      throw new Error('Method not found.');
  }
};
