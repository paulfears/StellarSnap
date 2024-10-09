
import {
  TransactionBuilder,
  Operation,
  BASE_FEE,
  Horizon,
  Networks,
  Asset,
  Claimant,
} from "stellar-sdk";
import type {
  AssetAccount,
  AssetRaw,
  AssetStatistics,
  AssetFlag,
  AssetMetaData,
  links,
} from "$lib/types";
import { stellar_rpc_endpoint, passpharase, snapId } from "$lib/constants";
import { CLAIMABLE_BALANCE_ENDPOINT } from "$lib/constants";
import {
  getWalletData,
  Toast as toast,
  Alert,
  updateWalletData,
  callMetaStellar,
} from "$lib/utils";
import type { DataPacket } from "$lib/wallet-store";

function convertDataToAssetRaw(_data: any): AssetRaw {
  return {
    _links: _data?._links as links,
    asset_type: _data?.asset_type,
    asset_code: _data?.asset_code,
    asset_issuer: _data?.asset_issuer,
    paging_token: _data?.paging_token,
    contract_id: _data?.contract_id,
    num_accounts: _data?.num_accounts,
    accounts: _data?.accounts as AssetStatistics,
    num_claimable_balances: _data?.num_claimable_balances,
    num_contracts: _data?.num_contracts,
    num_liquidity_pools: _data?.num_liquidity_pools,
    balances: _data?.balances as AssetStatistics,
    num_archived_contracts: _data?.num_archived_contracts,
    claimable_balances_amount: _data?.claimable_balances_amount,
    contracts_amount: _data?.contracts_amount,
    liquidity_pools_amount: _data?.liquidity_pools_amount,
    archived_contracts_amount: _data?.archived_contracts_amount,
    amount: _data?.amount,
    flags: _data?.flags as AssetFlag,
  };
}

function convertDataToAssetMetadata(_data: any): AssetMetaData {
  return {
    code: _data?.code,
    issuer: _data?.issuer,
    decimals: _data?.decimals,
    anchored: _data?.anchored,
    name: _data?.name,
    desc: _data?.desc,
    image: _data?.image,
  };
}

async function fetchToml(request: string, code: string) {
  try {
    const res = await fetch(request);
    if (res.ok) {
      let result = await res.text();
      // result = result.replaceAll(" ", "");
      // console.log(result);
      const assetMetadataArray = result
        .split("[[CURRENCIES]]")
        .filter(Boolean) // Filter empty elements resulting from splitting
        .slice(1) // Slice away the first element, which includes VERSION and NETWORK_PASSPHRASE
        .map((entry) => ({
          code: entry.match(/code\s*=\s*['"]*([^'"]*)['"]*/)?.[1],
          issuer: entry.match(/issuer\s*=\s*['"]*([^'"]*)['"]*/)?.[1],
          anchored: entry.match(/is_asset_anchored\s*=\s*['"]*(\w*)['"]*/)?.[1],
          name: entry.match(/name\s*=\s*['"]*([^'"]*)['"]*/)?.[1],
          desc: entry.match(/desc\s*=\s*['"]*([^'"]*)['"]*/)?.[1],
          image: entry.match(/image\s*=\s*['"]*([^'"]*)['"]*/)?.[1],
          decimals: entry.match(/display_decimals\s*=\s*(\d*[.]*\d*)/)?.[1],
        }));
      // console.log(assetMetadataArray);
      const assetMetadata = assetMetadataArray.filter(
        (entry) => !code || entry.code?.includes(code)
      );
      console.log("assetMetadata", assetMetadata);
      if (assetMetadata == undefined || assetMetadata[0] == undefined) {
        return {
          result: false,
          data: null,
          error: null,
        };
      }
      return {
        result: true,
        data: assetMetadata[0],
        error: null,
      };
    }
  } catch (error) {
    return {
      result: false,
      data: null,
      error: error,
    };
  }
}
export async function getMetadata(baseURL: string, assetAccount: AssetAccount) {
  if (assetAccount == undefined) return;
  let request =
    baseURL +
    "assets?asset_code=" +
    assetAccount.code +
    "&asset_issuer=" +
    assetAccount.issuer;
  try {
    const res = await fetch(request);
    if (res.ok) {
      const result = await res.json();
      if (result?._embedded == undefined) {
        return {
          result: false,
          data: null,
          error: null,
        };
      }

      const data: AssetRaw = convertDataToAssetRaw(
        result?._embedded.records[0]
      );
      const metaDataInfo = await fetchToml(
        data?._links?.toml?.href,
        assetAccount?.code
      );
      console.log("metadata info", metaDataInfo);
      if (metaDataInfo?.result) {
        const metadata: AssetMetaData = convertDataToAssetMetadata(
          metaDataInfo.data
        );
        return {
          result: true,
          data: {
            asset_raw: data,
            metadata: metadata,
          },
          error: null,
        };
      }

      return {
        result: true,
        data: {
          asset_raw: data,
          metadata: null,
        },
        error: null,
      };
    }
  } catch (e) {
    // console.log('nft metadata request error', e);
    return {
      result: false,
      data: null,
      error: e,
    };
  }
}

export const getAirDropData = async () => {
  let walletData: any = getWalletData();
  try {
    const res = await fetch(
      `${CLAIMABLE_BALANCE_ENDPOINT}?claimant=${walletData.currentAddress}`
    );

    if (res.ok) {
      const data = res.json();
      return data;
    }
  } catch (e: any) {
    console.log("get airdrop error:", e.message);
    return null;
  }
};

const changeTrustTransaction = async ({
  code,
  issuer,
}: {
  code: string;
  issuer: string;
}) => {
  let walletData = await getWalletData();
  const server = new Horizon.Server(stellar_rpc_endpoint);
  const account = await server.loadAccount(walletData.currentAddress);
  const txnBuilder = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: passpharase,
  });
  const assets = new Asset(code, issuer);
  txnBuilder.addOperation(Operation.changeTrust({ asset: assets }));
  // }
  console.log(txnBuilder);
  txnBuilder.setTimeout(3600);
  const txn = txnBuilder.build().toXDR();
  console.log(txn);
  return signTxn(txn);
};

export const claimClaimableBalance = async ({
  asset,
  balanceID,
  amount,
  flag,
}: {
  asset: string;
  balanceID: string;
  amount: string;
  flag: boolean;
}) => {
  let walletData: DataPacket = await getWalletData();
  const server = new Horizon.Server(stellar_rpc_endpoint);
  const account = await server.loadAccount(walletData.currentAddress);
  const txnBuilder = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: passpharase,
  });

  const operationParam = {
    balanceId: balanceID,
  };

  try {
    if (flag) {
      const assets = new Asset(asset.split(":")[0], asset.split(":")[1]);
      txnBuilder.addOperation(Operation.changeTrust({ asset: assets }));
    }
    txnBuilder.addOperation(Operation.claimClaimableBalance(operationParam));
    console.log(txnBuilder);
    txnBuilder.setTimeout(3600);
    const txn = txnBuilder.build().toXDR();
    console.log(txn);
    const signRes = await signTxn(txn);

    console.log("sign res", signRes);
    if (signRes.status == 400) {
      const resultCode = signRes.extras.result_codes;
      if (resultCode.operations) {
        for (let err of resultCode.operations) {
          if ((err = "op_no_trust")) {
            Alert({
              type: "error",
              desc: "Destination does not have this asset, do you want to create a claimable balance instead (this requires 1 XLM locked until is claimed)?",
              successText: "success",
              errText: "error",
              callback: async () => {
                const res = await changeTrustTransaction({
                  code: asset.split(":")[0],
                  issuer: asset.split(":")[1],
                });
                updateWalletData();
                // claimClaimableBalance();
              },
            });
          }
        }
      }
      return;
    }
    toast({ type: "success", desc: "success received." });
  } catch (e: any) {
    toast({ type: "error", desc: e.message });
    console.log("error", e);
  }
};

export const signTxn = async (txnXDR: any) => {
  console.log("here in sign transaction");
  const signTransactionResult = await callMetaStellar('signAndSubmitTransaction', {transaction:txnXDR, testnet:true})
  return signTransactionResult;
};
