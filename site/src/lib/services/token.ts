import { snapId } from "$lib/constants";
import { MetaStellarWallet } from "metastellar-sdk";
import { assetType, getWalletData } from "$lib/utils";

export const signTxn = async (txnXDR: any) => {
  console.log("here in sign transaction");
  const signTransactionResult = await window.ethereum.request({
    method: "wallet_invokeSnap",
    params: {
      snapId: snapId,
      request: {
        method: "signAndSubmitTransaction",
        params: {
          transaction: txnXDR,
          testnet: true,
        },
      },
    },
  });

  return signTransactionResult;
};

export const getTokenList = async () => {
  const wallet = MetaStellarWallet.loadFromState(getWalletData());
  const assets = await wallet.getAssets();
  return assets.filter((asset: any) => assetType(asset) == "token");
};
