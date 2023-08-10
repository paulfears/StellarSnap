import { OnRpcRequestHandler } from '@metamask/snap-types';

import { getWallet } from './Wallet';
import { fund, Client } from './Client';
import { TxnBuilder } from './TxnBuilder';
import { WalletFuncs } from './WalletFuncs';
import { Screens } from './screens';
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  const wallet = await getWallet();
  const params = request.params;
  let wallet_funded = false;
  let baseAccount;
  try{
    baseAccount = await wallet.getBaseAccount();
    wallet_funded = true;
  }
  catch(e){
    console.log("Account not funded yet")
  }
  const keyPair = wallet.keyPair;
  const client = new Client();
  let txnBuilder: TxnBuilder;
  let operations: WalletFuncs;
  if(wallet_funded){
    txnBuilder = new TxnBuilder((await wallet.getBaseAccount()));
    operations = new WalletFuncs(baseAccount, keyPair, txnBuilder, client);
  }
  
  switch (request.method) {
    // ------------------------------- Methods That Do not Require A funded Account ---------------------------------
    case 'getAddress':
      return wallet.address
    case 'fund':
      return await fund(wallet);
    // -------------------------------- Methods That Require a funded Account ------------------------------------------
    case 'getAccountInfo':
      if(!wallet_funded){
        Screens.RequiresFundedWallet(request.method, wallet.address);
        throw new Error('Method Requires Account to be funded');
      }
      return await client.getAccount(wallet.address)
    case 'getBalance':
      if(!wallet_funded){
        return '0';
      }
      return await client.getBalance(wallet.address)
    case 'transfer':
      if(!wallet_funded){
        Screens.RequiresFundedWallet(request.method, wallet.address);
        throw new Error('Method Requires Account to be funded');
      }
      return await operations.transfer(params.to, params.amount);
    default:
      throw new Error('Method not found.');
  }
};
