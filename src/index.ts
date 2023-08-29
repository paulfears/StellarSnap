import { OnRpcRequestHandler } from '@metamask/snap-types';
import { Metamask } from './Metamask';
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  const params = request.params;
  switch (request.method) {
    case 'hello':
      return await Metamask.sendConfirmation("hello", "yes", "okay")
    default:
      throw new Error('Method not found.');
  }
};
/*
const account: {
  id: uuid(),
  name,
  options,
  address,
  supportedMethods: [
    'eth_sendTransaction',
    'eth_sign',
    'eth_signTransaction',
    'eth_signTypedData_v1',
    'eth_signTypedData_v2',
    'eth_signTypedData_v3',
    'eth_signTypedData_v4',
    'eth_signTypedData',
    'personal_sign',
  ],
  type: 'eip155:eoa',
};

await snap.request({
  method: 'snap_manageAccounts',
  params: {
    method: 'createAccount',
    params: { account },
  },
});
return account;
*/