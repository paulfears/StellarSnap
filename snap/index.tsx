//import { OnRpcRequestHandler } from '@metamask/snap-types';



/**
 * This file defines all entry points for the snap.
 * this includes the onInstall, onRpcRequest, onUserInput, onCronJob and onHomePage functions
 * code cannot be executed without being called from one of these functions
 * 
 */

/*
  *Notes for KYR-01-004 (dApp origin not displayed in Snap UI)
  * The Origin is now stored in the InteractionHandler class, and is displayed in the UI when a user is prompted to sign a message
  * this is done because static class memebers have global scope and can be accessed from anywhere in the code
  * The interaction handler class has other uses as it helps to define button on:click interactions useing the new metamask snap-ui
  * This is bound to change as the snap-ui is still in development
  * 
  * primary mechanism for remediation is dialog replacement into the new tsx format. and where this is not possible or unnecessary,
  * the displayPanel function from the Utils class is used to display the origin
*/
import type { OnInstallHandler, OnUserInputHandler,  OnRpcRequestHandler, OnHomePageHandler} from '@metamask/snaps-sdk';

import { Wallet, ImportAccountUI, showQrCode} from './Wallet';
import { fund, Client } from './Client';
import { TxnBuilder } from './TxnBuilder';
import { WalletFuncs } from './WalletFuncs';
import { Screens } from './screens';
import {lookupAddress, lookupFedAccount} from './federation'
import { NotificationEngine } from './notificationEngine';
import { OnCronjobHandler } from '@metamask/snaps-types';
import Utils from './Utils';
import { StateManager } from './stateManager';
import {getAssets, getDataPacket} from './assets';
import { Auth } from './Auth';
import HomeScreen from './screens/home';
import { sendXLM } from './screens/sendXLM';
import { renameAccountDialog } from './screens/renameAccount';
import { InteractionHandler } from './InteractionHandler';

export const onCronjob: OnCronjobHandler = async ({ request }) => {


  //Will only show notifications when wallet is unlocked
  //This is a fix for Using manageState will fail in cronJob when the extension is locked #87
  //Ideally this will be updated to use unecrypted-storeage, but that requires changes to multiple files
    const { locked } = await snap.request({
      method: "snap_getClientStatus",
    })
    if(locked){
      return;
    }
  //END FIX_________________________
  
  const wallet = await Wallet.getCurrentWallet();
  const mainnet_client = new Client("mainnet");
  const engine = new NotificationEngine(mainnet_client, wallet);
  switch (request.method) {
    case 'NotificationEngine':{
      await engine.checkForNotifications();
      return null;
    }
    default:
      throw new Error('Method not found.');
  }
};

export const onInstall: OnInstallHandler = async () => {
  const wallet = await Wallet.getCurrentWallet(false);
  await Screens.installedScreen(wallet);
};

export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  //highlighted as KYR-01-004   (dApp origin not displayed in Snap UI) fix
  InteractionHandler.setRequestOrigin(origin);
  //This promotes the origin variable to a global scope, and can be accessed from dialog generators

  if(request.method === "clearState"){
    //KYR-01-006 (State clearing confirmation) fixed by confimation dialog
    let confirm = await Screens.clearStateConfirmation();
    if(confirm){
      await StateManager.clearState();
    }
    else{
      return false;
    }
  }
  const wallet = await Wallet.getCurrentWallet();
  const params = request.params as any;
  let wallet_funded = false;
  let baseAccount;
  let testnet = false;
  const keyPair = wallet.keyPair;
  const client = new Client();
  if(params?.testnet && params?.futurenet){
    throw new Error("cannot use testnet and futurenet at the same time");
  }
  if(params?.testnet){
    client.setNetwork('testnet');
    testnet = true;
  }
  else if(params?.futurenet){
    client.setNetwork('futurenet');
  }
  else{
    client.setNetwork('mainnet');
  }
  try{
    baseAccount = await wallet.getBaseAccount(client);
    wallet_funded = true;
  }
  catch(e){
    console.log("Account not funded yet")
  }
  let txnBuilder: TxnBuilder;
  let operations: WalletFuncs | null;
  if(wallet_funded && baseAccount !== undefined){
    txnBuilder = new TxnBuilder(baseAccount, client);
    operations = new WalletFuncs(baseAccount, keyPair, txnBuilder, client);
  }
  else{
    operations = null;
  }
  
  switch (request.method) {
    // ------------------------------- Methods That Do not Require A funded Account ---------------------------------
    case 'getAddress':
      return wallet.address;
    case 'getCurrentAccount':
      return wallet.address;
    case 'getDataPacket':
      return await getDataPacket(wallet, client);
    case 'setCurrentAccount':
      //highlighted as entry point 1 for KYR-01-002 (Markdown and control characters) fix
      return await Wallet.setCurrentWallet(params.address, wallet.currentState);
    case 'showAddress':
      return await showQrCode(wallet);
    case 'createAccount':
      //highlighted as entry point 2 for KYR-01-002 (Markdown and control characters) fix
      return await Wallet.CreateNewAccountDialog(params.name); //returns simpleAccount object {name:string, address:string} also sets the current account to the created account
    case 'listAccounts':
      return await Wallet.listAccounts();
    case 'renameAccount':
      //highlighted as entry point 3 for KYR-01-002 (Markdown and control characters) fix
      //highlighted as entry point 1 for KYR-01-003 (Accounts renamable without confirmation )
      /**
       * KYR-01-003 (Accounts renamable without confirmation ) notes
       * updated version uses new tsx file that requires user to confirm the change
       * dapps no longer get to set the name of the account, the user does
       * dapps can create new accounts, with a given name but they must use the createAccount method
       */
      return await renameAccountDialog(params.address);
    case 'importAccount':
      await ImportAccountUI(wallet.currentState);
      return true;
    case 'fund':
      return await fund(wallet);
    case 'getFederationName':
      const res = await lookupAddress(wallet.address);
      return res.stellar_address;
    case 'lookUpFedAccountByAddress':
        return await lookupAddress(params.address);
    case 'lookUpFedAccountByName':
        return await lookupFedAccount(params.url);
    case 'getBalance':
      if(!wallet_funded){
        return '0';
      }
      return await client.getBalance(wallet.address)
    case 'getAssets':
      return await getAssets(wallet, client);
    case 'sendAuthRequest':
      const auth_client = new Auth(wallet.keyPair);
      return await auth_client.signOnPost(params.url, params.data, params.challenge)
    case 'signStr':
      //highlighted as entry point 4 for KYR-01-002 (Markdown and control characters) fix
      const auth = new Auth(wallet.keyPair);
      return await auth.signData(params.challenge);
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
      if(operations !== null){
        return await operations.transfer(params.to, params.amount);
      }

    case 'signTransaction':
      if(!wallet_funded){
        await Screens.RequiresFundedWallet(request.method, wallet.address);
        throw new Error('Method Requires Account to be funded');
      }
      if(operations !== null){
        const txn = await operations.signArbitaryTxn(params.transaction);
        return txn.toXDR();
      }

    case 'signAndSubmitTransaction':
      if(!wallet_funded){
        await Screens.RequiresFundedWallet(request.method, wallet.address);
      }
      if(operations !== null){
        return await operations.signAndSubmitTransaction(params.transaction);
      }

    case 'createFederationAccount':
      return await Screens.setUpFedAccount(wallet);


    case 'openSendXLM':
      /**
       * Mainly a test for future expansion shouldn't be used often, not really insured to work, but it should be safe
       * 
       * 
       */
      let dataPacket = await getDataPacket(wallet, client);
      
      
      let interfaceId = await sendXLM(dataPacket, wallet, operations, testnet);
      let result = await Utils.openDialog(interfaceId);
      return result;
  

    default:
      throw new Error('Method not found.');
  }
};


export const onHomePage: OnHomePageHandler = async () => {
  return {
    content: await HomeScreen(),
  };
};




export const onUserInput: OnUserInputHandler = async ({id, event}) => { 
 

  if(event.name){


    InteractionHandler.handleCall(id, event.name);
    
  }
}; 
