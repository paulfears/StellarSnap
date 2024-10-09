import { w as writable } from "./index2.js";
const nullDataPacket = {
  name: "null Packet",
  currentAddress: "null",
  accounts: [],
  mainnetXLMBalance: "0",
  testnetXLMBalance: "0",
  fedName: null
};
const dataPacket = writable(nullDataPacket);
const isTestnet = writable(true);
const connected = writable(false);
export {
  connected as c,
  dataPacket as d,
  isTestnet as i
};
