// export const snapId = import.meta.env.DEV
//   ? "local:http://localhost:8080/"
//   : "npm:stellar-snap";
export const snapId = "npm:stellar-snap";

export const VITE_STELLAR_RPC_ENDPOINT = import.meta.env.DEV
  ? "https://horizon-testnet.stellar.org/"
  : "https://horizon.stellar.org/";
