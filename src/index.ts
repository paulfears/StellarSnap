import { OnRpcRequestHandler } from '@metamask/snap-types';

import { getWallet } from './accounts';
import { fund, Client } from './Client';
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  const wallet = await getWallet();
  const client = new Client(wallet)
  switch (request.method) {
    case 'getAddress':
      return wallet.address
    case 'fund':
      return await fund(wallet);
    case 'getAccountInfo':
      return await client.getAccount()
    default:
      throw new Error('Method not found.');
  }
};
