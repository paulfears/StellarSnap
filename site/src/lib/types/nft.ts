import * as StellarSdk from "@stellar/stellar-sdk";

export interface NFTFileUploadParams {
  files: any;
  itemName: string;
}

export interface NFTRegistrationParams {
  code: string;
  issuer: string;
  name: string;
  desc: string;
  imageURL: string;
}

export interface GenerateNFTOnStellarParams {
  code: string;
  issuerKeypair: StellarSdk.Keypair;
}
