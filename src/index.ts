import { OnRpcRequestHandler } from '@metamask/snap-types';

import { getWallet } from './Wallet';
import { fund, Client } from './Client';
import { TxnBuilder } from './TxnBuilder';
import { WalletFuncs } from './WalletFuncs';
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  const wallet = await getWallet();
  const baseAccount = await wallet.getBaseAccount()
  const keyPair = wallet.keyPair;
  const client = new Client();
  const txnBuilder = new TxnBuilder((await wallet.getBaseAccount()));
  const operations = new WalletFuncs(baseAccount, keyPair, txnBuilder, client);
  const params = request.params;
  switch (request.method) {
    case 'getAddress':
      return wallet.address
    case 'fund':
      return await fund(wallet);
    case 'getAccountInfo':
      return await client.getAccount(wallet.address)
    case 'getBalance':
      return await client.getBalance(wallet.address)
    case 'transfer':
      return await operations.transfer(params.to, params.amount);
    default:
      throw new Error('Method not found.');
  }
};
