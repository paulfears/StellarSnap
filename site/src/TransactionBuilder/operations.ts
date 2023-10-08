
export type price = {n:number, d:number};
export type offerId = 0 | number;
export type result = {type:string, params:any};
export type TrustLineFlags = {
    authorized?:boolean,
    authorizedToMaintainLiabilities?:boolean,
    clawbackEnabled?:boolean,
}
let result:any = {params:{}}
export const possibleValues = [
  'number',
  'number:offerId',
  'optional:offerId',
  'string:address',
  'optional:string:address',
  'string:accountId',
  'string:balanceId',
  'asset',
  'array:asset',
  'enum:0|1|2',
  'price',
  'string:liquidityPoolId',
  'string:assetCode',
  'claimant',
  'array:claimant',
  'signer',
  'trustLineFlags',
]
export type OperationObject = {
  [key: string]: {
    type: string,
    params: {
      [key:string]:string
    }
  }
}
export const OperationParams:OperationObject = {
    '':{
      type:"",
      params:{}
    },
     'createAccount': {
      type : 'createAccount',
      params: {
        destination : "string:address",
        startingBalance: "number"
      }
    },
     'payment': {
      type : 'payment',
      params: {
      destination : "string:address",
      asset : "asset",
      amount : "number"
      }
    },
     'pathPaymentStrictReceive': {
      type:'pathPaymentStrictReceive',
      params:{
      sendAsset : "asset",
      sendMax : "number",
      destination : "string:address",
      destAsset : "asset",
      destAmount : "number",
      path : "array:asset"
      },
    },
     'pathPaymentStrictSend': {
      type : 'pathPaymentStrictSend',
      params:{
      sendAsset:"asset",
      sendAmount:"number",
      destination:"string:address",
      destAsset:"asset",
      destMin:"number",
      path:"array:asset"
      }
    },
    'changeTrust': {
      type:'changeTrust',
      params:{
        asset:"asset",
        limit:"number"
      }
    },
    'allowTrust': {
      type:'allowTrust',
      params:{
        trustor : "string:address",
        assetCode : "string:assetCode",
        authorize : "enum:0|1|2"
      }
    },
     'setOptions': {
      type : 'setOptions',
      params:{
        inflationDest:'optional:string:address',
        clearFlags:"number",
        setFlags:"number",
        masterWeight:"number",
        lowThreshold:"number",
        medThreshold:"number",
        highThreshold: "number",
        signer : "signer"
      },
     },
    // the next  intentionally falls through!
     'manageOffer': {
      type:'manageOffer',
      params:{
        selling:"asset",
        buying:"asset",
        amount:"number",
        price:"price",
        offerId:"number:offerId"
      }
    },
    'manageSellOffer': {
      type:'manageSellOffer',
      params:{
        selling:"asset",
        buying:"asset",
        amount:"number",
        price:"price",
        offerId:"optional:number:offerId"
      }
    },
     'manageBuyOffer': {
      type:'manageBuyOffer',
      params:{
        selling : "asset",
        buying : "asset",
        buyAmount : "number",
        price : "price",
        offerId : "optional:number:offerId"
      }
    },
    
     'createPassiveOffer':{
      type : 'createPassiveOffer',
      params:{
        selling:"asset",
        buying:"asset",
        amount:"number",
        price:"price",
      }
    },
     'createPassiveSellOffer': {
      type:'createPassiveSellOffer',
      params:{
        selling:"asset",
        buying:"asset",
        amount:"number",
        price:"price"
      }
    },
     'accountMerge': {
      type:'accountMerge',
      params:{
        destination:"string:address"
      }
    },
    'manageData': {
      type:'manageData',
      params:{
        name:"string",
        value:"string"
      }
    },
    'inflation':{
      type:'inflation',
      params:{}
    },
    'bumpSequence': {
      type:'bumpSequence',
      params:{
        bumpTo:"number"
      }
    },
     'createClaimableBalance': {
      type:'createClaimableBalance',
      params:{
        asset:"asset",
        amount:"number",
        claimants:"array:claimant"
      }
    },
     'claimClaimableBalance': {
      type:'claimClaimableBalance',
      params:{
        balanceId:"string:balanceId"
      }
    },
     'beginSponsoringFutureReserves': {
      type:'beginSponsoringFutureReserves',
      params:{
        sponsoredId:"string"
      }
    },
    'endSponsoringFutureReserves': {
      type:'endSponsoringFutureReserves',
      params:{}
    },
     'revokeSponsorship': {
      type:'revokeSponsorship',
      params:'object'
    },
    'revokeAccountSponsorship' : {
        type:"revokeAccountSponsorship",
        params:{
          account:"string:accountId"
        }
    },
    'revokeTrustlineSponsorship' :{
        type:'revokeTrustlineSponsorship',
        params:{
        account:"string:accountId",
        asset:'asset'
        }
    },
     'revokeOfferSponsorship' :{
        type:'revokeOfferSponsorship',
        params:{
          seller:'string:accountId',
          offerId:'number:offerId'
        }
    },
     'revokeDataSponsorship' : {
        type:'revokeDataSponsorship',
        params:{
          account:'string:accountId',
          name:'string'
        }
    },
    'revokeClaimableBalanceSponsorship': {
        type:'revokeClaimableBalanceSponsorship',
        params:{
          balanceId:'string:balanceId'
        }
    },
    'revokeLiquidityPoolSponsorship': {
        type:'revokeLiquidityPoolSponsorship',
        params:{
          liquidityPoolId:'string:liquidityPoolId'
        }
    },
     'revokeSignerSponsorship':{
        type:'revokeSignerSponsorship',
        params:{
          account:'string:accountId',
          signer:'signer',
        }
    },
     'clawback': {
      type:'clawback',
      params:{
      amount:"number",
      from:"string:address",
      asset:"asset"
      }
    },
     'clawbackClaimableBalance': {
      type:'clawbackClaimableBalance',
      params:{
      balanceId:"string:balanceId"
      }
    },
     'setTrustLineFlags': {
      type:'setTrustLineFlags',
      params:{
      asset:'asset',
      trustor:'string:address',
      flags:'trustLineFlags'
      }
    },
     'liquidityPoolDeposit': {
      type:'liquidityPoolDeposit',
      params:{
      liquidityPoolId:"string:liquidityPoolId",
      maxAmountA:'number',
      maxAmountB:'number',
      minPrice:'price',
      maxPrice:'price'
      }
    },
     'liquidityPoolWithdraw': {
      type:'liquidityPoolWithdraw',
      params:{
        liquidityPoolId:'string:liquidityPoolId',
        amount:'number',
        minAmountA:'number',
        minAmountB:'number'
      }
    }
}

