import { OnRpcRequestHandler } from '@metamask/snaps-types';
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
