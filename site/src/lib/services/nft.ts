import * as StellarSdk from "@stellar/stellar-sdk";
import { MetaStellarWallet } from "metastellar-sdk";
import { Toast as toast, getWalletData, assetType } from "$lib/utils";
import {
  friend_bot_url,
  pinata,
  stellar_toml_server_url,
  passpharase,
  stellar_rpc_endpoint,
  home_domain_url,
} from "$lib/constants";
import type {
  NFTRegistrationParams,
  NFTFileUploadParams,
  GenerateNFTOnStellarParams,
} from "$lib/types/nft";

export const getNFTList = async () => {
  const wallet = MetaStellarWallet.loadFromState(getWalletData());
  const assets = await wallet.getAssets();
  return assets.filter((asset: any) => assetType(asset) == "nft");
};

export async function funding(account: any) {
  console.log("==============funding==============");
  try {
    let response = await fetch(`${friend_bot_url}?addr=${account}`);
    if (response.ok) {
      console.log(`Account ${account} successfully funded.`);
      toast({ type: "info", desc: `Account ${account} successfully funded.` });
      return {
        ok: true,
        error: null,
      };
    } else {
      console.log(`Something went wrong funding account: ${account}`);
      toast({
        type: "error",
        desc: `Funding error: Something went wrong funding account: ${account}`,
      });
      return {
        ok: false,
        error: "funding failed",
      };
    }
  } catch (error) {
    console.log(`Something went wrong funding account: ${account}`);
    toast({
      type: "error",
      desc: `Funding error: Something went wrong funding account: ${account}`,
    });
    return {
      ok: false,
      error: error,
    };
  }
}

export const uploadNFTFile = async ({
  files,
  itemName,
}: NFTFileUploadParams) => {
  //  const body = { data: JSON.stringify(mouseTrackData) };
  console.log("==============upload==============");
  const formData = new FormData();
  formData.append("file", files[0]);

  const pinataMetadata = JSON.stringify({
    name: itemName,
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);

  try {
    const res = await fetch(pinata.url, {
      method: "post",
      headers: {
        Authorization: `Bearer ${pinata.api_key}`,
      },
      body: formData,
    });

    if (res.ok) {
      const responseData = await res.json();
      if (responseData.isDuplicate) {
        // isMinting = false;
        return { ok: false, data: "", error: "duplicated" };
      }
      return { ok: true, data: responseData.IpfsHash, error: null };
    } else {
      return { ok: false, data: "", error: "parse error" };
    }
  } catch (e) {
    return { ok: false, data: "", error: e };
  }
};

export const resigterNFT = async ({
  code,
  issuer,
  name,
  desc,
  imageURL,
}: NFTRegistrationParams) => {
  console.log("==============register==============");
  const req = {
    code: code,
    issuer: issuer,
    name: name,
    desc: desc,
    image: `${pinata.baseURL}/${imageURL}`,
    display_decimals: 7,
  };
  try {
    const res = await fetch(`${stellar_toml_server_url}insert_nft`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    if (res.ok) {
      return {
        ok: true,
        error: null,
      };
    } else {
      console.log("register error");
      toast({ type: "error", desc: "register error" });
      return {
        ok: false,
        error: "register error",
      };
    }
  } catch (e: any) {
    console.log("register error", e);
    toast({ type: "error", desc: "register error" });
    return {
      ok: false,
      error: e,
    };
  }
};

export const generateNFTOnStellar = async ({
  code,
  issuerKeypair,
}: GenerateNFTOnStellarParams) => {
  console.log("==============generate nft==============");
  // console.log(`Issuer Public Key: ${issuerKeypair.publicKey()}`);
  // console.log(`Issuer Secret Key: ${issuerKeypair.secret()}`);

  // Create the Asset so we can issue it on the network.
  const nftAsset = new StellarSdk.Asset(code, issuerKeypair.publicKey());

  // Connect to the testnet with the StellarSdk.
  const server = new StellarSdk.Horizon.Server(stellar_rpc_endpoint);
  const receiverPuplicKey = await ethereum.request({
    method: "wallet_invokeSnap",
    params: {
      snapId: "npm:stellar-snap",
      request: {
        method: "getAddress",
      },
    },
  });
  const issuer = await server.loadAccount(issuerKeypair.publicKey());
  // const receiver = await server.loadAccount(receiverPuplicKey);
  // Build a transaction that mints the NFT.
  let transaction = new StellarSdk.TransactionBuilder(issuer, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: passpharase,
  })
    .addOperation(
      StellarSdk.Operation.setOptions({
        homeDomain: home_domain_url,
      })
    )
    // Add the NFT metadata to the issuer account using a `manageData` operation.
    // .addOperation(StellarSdk.Operation.manageData({
    //   name: 'ipfshash',
    //   value: "QmQwPAxDLYRN4zRuMn3H9ZocmNNSSUWw2pdS5RdoV5vuHM" as CIDString,
    //   source: issuerKeypair.publicKey(),
    // }))
    // Perform a `changeTrust` operation to create a trustline for the receiver account.
    .addOperation(
      StellarSdk.Operation.changeTrust({
        asset: nftAsset,
        limit: "0.0000001",
        source: receiverPuplicKey,
      })
    )
    // Add a `payment` operation to send the NFT to the receiving account.
    .addOperation(
      StellarSdk.Operation.payment({
        destination: receiverPuplicKey,
        asset: nftAsset,
        amount: "0.0000001",
        source: issuerKeypair.publicKey(),
      })
    );

  transaction.setTimeout(30);

  const endTransaction = transaction.build();

  endTransaction.sign(issuerKeypair);

  const xdrTransaction = endTransaction.toXDR();
  console.log(xdrTransaction);

  let response = null;

  try {
    response = await ethereum.request({
      method: "wallet_invokeSnap",
      params: {
        snapId: "npm:stellar-snap",
        request: {
          method: "signAndSubmitTransaction",
          params: {
            transaction: xdrTransaction,
            testnet: true,
          },
        },
      },
    });
    console.log("nft minting result", response);
    console.log("The asset has been issued to the receiver", response.hash);
    toast({
      type: "info",
      desc: `The asset has been issued to the receiver. ${response.hash}`,
    });

    return {
      ok: true,
      error: null,
      data: response.hash,
    };
  } catch (error: any) {
    console.log(`${error}. More details: \n${error.response.data}`);
    toast({ type: "error", desc: "generate error" });
    return {
      ok: false,
      error: error,
      data: null,
    };
  }
};
