export interface nftModel {
  code: string;
  issuer: string;
}

export interface AssetStatistics {
  authorized: number;
  authorized_to_maintain_liabilities: number;
  unauthorized: number;
}

export interface AssetFlag {
  auth_required: boolean;
  auth_revocable: boolean;
  auth_immutable: boolean;
}
export interface Toml {
  href: string;
}
export interface links {
  toml: Toml;
}
export interface AssetRaw {
  asset_type: string; // This asset's type. Either credit_alphanum4 or credit_alphanum12.
  asset_code: string; // This asset's code
  asset_issuer: string; // The Stellar address of this asset’s issuer.
  paging_token: string; // The paging token code + address + type
  contract_id: string; // The contract id
  num_accounts: number; // The number of accounts that have issued a trustline to this asset. If the auth_required flag for this asset's issuer is set to true, this number only includes the accounts who have both set up a trustline to the asset and have been authorized to hold the asset. This will be deprecated in Horizon v3.
  accounts: AssetStatistics; // The number of accounts grouped by each trustline flag state.
  num_claimable_balances: number; // The current number of claimable_balances for this asset.
  num_contracts: number; // The current number of Soroban contracts holding this asset.
  num_liquidity_pools: number; // The current number of liquidity pools holding this asset.
  balances: AssetStatistics; // The number of units issued for this asset grouped by each trustline flag state.
  num_archived_contracts: number;
  claimable_balances_amount: string; // The number of units for this asset held by all claimable balances.
  contracts_amount: string; // The number of units for this asset held by all Soroban contracts.
  liquidity_pools_amount: string; // The number of units for this asset held by all liquidity pools.
  archived_contracts_amount: string;
  amount: string; // The number of authorized units issued for this asset. This will be deprecated in Horizon v3.
  flags: AssetFlag;
  _links: links;
}
export interface AssetAccount {
  code: string; // This asset's code
  issuer: string; // The Stellar address of this asset’s issuer.
}

export interface AssetMetaData {
  code: string;
  issuer: string;
  decimals?: string | undefined;
  anchored?: boolean | undefined;
  name: string;
  desc: string;
  image: string;
}

const xs = "xs";
const sm = "sm";
const md = "md";
const lg = "lg";
const xl = "xl";
export declare type SizeType =
  | typeof xs
  | typeof sm
  | typeof md
  | typeof lg
  | typeof xl;

export type OperationObject = {
  [key: string]: {
    type: string;
    params: {
      [key: string]: string;
    };
  };
};

export const OperationParams: OperationObject = {
  "": {
    type: "",
    params: {},
  },
  createAccount: {
    type: "createAccount",
    params: {
      destination: "string:address",
      startingBalance: "number",
    },
  },
  payment: {
    type: "payment",
    params: {
      destination: "string:address",
      asset: "asset",
      amount: "number",
    },
  },
  pathPaymentStrictReceive: {
    type: "pathPaymentStrictReceive",
    params: {
      sendAsset: "asset",
      sendMax: "number",
      destination: "string:address",
      destAsset: "asset",
      destAmount: "number",
      path: "array:asset",
    },
  },
  pathPaymentStrictSend: {
    type: "pathPaymentStrictSend",
    params: {
      sendAsset: "asset",
      sendAmount: "number",
      destination: "string:address",
      destAsset: "asset",
      destMin: "number",
      path: "array:asset",
    },
  },
  changeTrust: {
    type: "changeTrust",
    params: {
      asset: "asset",
      limit: "number",
    },
  },
  allowTrust: {
    type: "allowTrust",
    params: {
      trustor: "string:address",
      assetCode: "string:assetCode",
      authorize: "enum:0|1|2",
    },
  },
  setOptions: {
    type: "setOptions",
    params: {
      inflationDest: "optional:string:address",
      clearFlags: "number",
      setFlags: "number",
      masterWeight: "number",
      lowThreshold: "number",
      medThreshold: "number",
      highThreshold: "number",
      signer: "signer",
    },
  },
  // the next  intentionally falls through!
  manageOffer: {
    type: "manageOffer",
    params: {
      selling: "asset",
      buying: "asset",
      amount: "number",
      price: "price",
      offerId: "number:offerId",
    },
  },
  manageSellOffer: {
    type: "manageSellOffer",
    params: {
      selling: "asset",
      buying: "asset",
      amount: "number",
      price: "price",
      offerId: "optional:number:offerId",
    },
  },
  manageBuyOffer: {
    type: "manageBuyOffer",
    params: {
      selling: "asset",
      buying: "asset",
      buyAmount: "number",
      price: "price",
      offerId: "optional:number:offerId",
    },
  },

  createPassiveOffer: {
    type: "createPassiveOffer",
    params: {
      selling: "asset",
      buying: "asset",
      amount: "number",
      price: "price",
    },
  },
  createPassiveSellOffer: {
    type: "createPassiveSellOffer",
    params: {
      selling: "asset",
      buying: "asset",
      amount: "number",
      price: "price",
    },
  },
  accountMerge: {
    type: "accountMerge",
    params: {
      destination: "string:address",
    },
  },
  manageData: {
    type: "manageData",
    params: {
      name: "string",
      value: "string",
    },
  },
  inflation: {
    type: "inflation",
    params: {},
  },
  bumpSequence: {
    type: "bumpSequence",
    params: {
      bumpTo: "number",
    },
  },
  createClaimableBalance: {
    type: "createClaimableBalance",
    params: {
      asset: "asset",
      amount: "number",
      claimants: "array:claimant",
    },
  },
  claimClaimableBalance: {
    type: "claimClaimableBalance",
    params: {
      balanceId: "string:balanceId",
    },
  },
  beginSponsoringFutureReserves: {
    type: "beginSponsoringFutureReserves",
    params: {
      sponsoredId: "string",
    },
  },
  endSponsoringFutureReserves: {
    type: "endSponsoringFutureReserves",
    params: {},
  },
  revokeSponsorship: {
    type: "revokeSponsorship",
    params: "object",
  },
  revokeAccountSponsorship: {
    type: "revokeAccountSponsorship",
    params: {
      account: "string:accountId",
    },
  },
  revokeTrustlineSponsorship: {
    type: "revokeTrustlineSponsorship",
    params: {
      account: "string:accountId",
      asset: "asset",
    },
  },
  revokeOfferSponsorship: {
    type: "revokeOfferSponsorship",
    params: {
      seller: "string:accountId",
      offerId: "number:offerId",
    },
  },
  revokeDataSponsorship: {
    type: "revokeDataSponsorship",
    params: {
      account: "string:accountId",
      name: "string",
    },
  },
  revokeClaimableBalanceSponsorship: {
    type: "revokeClaimableBalanceSponsorship",
    params: {
      balanceId: "string:balanceId",
    },
  },
  revokeLiquidityPoolSponsorship: {
    type: "revokeLiquidityPoolSponsorship",
    params: {
      liquidityPoolId: "string:liquidityPoolId",
    },
  },
  revokeSignerSponsorship: {
    type: "revokeSignerSponsorship",
    params: {
      account: "string:accountId",
      signer: "signer",
    },
  },
  clawback: {
    type: "clawback",
    params: {
      amount: "number",
      from: "string:address",
      asset: "asset",
    },
  },
  clawbackClaimableBalance: {
    type: "clawbackClaimableBalance",
    params: {
      balanceId: "string:balanceId",
    },
  },
  setTrustLineFlags: {
    type: "setTrustLineFlags",
    params: {
      asset: "asset",
      trustor: "string:address",
      flags: "trustLineFlags",
    },
  },
  liquidityPoolDeposit: {
    type: "liquidityPoolDeposit",
    params: {
      liquidityPoolId: "string:liquidityPoolId",
      maxAmountA: "number",
      maxAmountB: "number",
      minPrice: "price",
      maxPrice: "price",
    },
  },
  liquidityPoolWithdraw: {
    type: "liquidityPoolWithdraw",
    params: {
      liquidityPoolId: "string:liquidityPoolId",
      amount: "number",
      minAmountA: "number",
      minAmountB: "number",
    },
  },
};

export type AlertType = "warning" | "error" | "success";
