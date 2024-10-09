// export const snapId = import.meta.env.DEV
//   ? "local:http://localhost:8080/"
//   : "npm:stellar-snap";
export const snapId = "npm:stellar-snap";
// stellar_rpc_endpoint
export const stellar_rpc_endpoint = import.meta.env.VITE_STELLAR_RPC_ENDPOINT;
export const stellar_rpc_mainnet_endpoint = import.meta.env.VITE_STELLAR_RPC_MAINNET_ENDPOINT;

export const passpharase = import.meta.env.VITE_NETWORK_PASSPHRASE;

export const CLAIMABLE_BALANCE_ENDPOINT = `${stellar_rpc_endpoint}claimable_balances`;

export const friend_bot_url = import.meta.env.VITE_FRIEND_BOT_URL;

export const pinata = {
  baseURL: import.meta.env.VITE_PINATA_BASE_URL,
  url: import.meta.env.VITE_PINATA_UPLOAD_URL,
  api_key:
    import.meta.env.VITE_PINATA_API_KEY,
};

export const stellar_toml_server_url = import.meta.env.VITE_STELLAR_TOML_SERVER_API;

export const stellar_explorer_url =
  import.meta.env.VITE_STELLAR_EXPLORER_URL;

export const home_domain_url = import.meta.env.VITE_HOME_DOMAIN_URL;
