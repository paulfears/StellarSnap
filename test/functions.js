
const supportedFunctions = [
{name:'getAddress', params:{}, desc:'Get the current account address'},
{name:'getDataPacket', params:{}, desc:'Get the data packet for the current account'},
{name:'setCurrentAccount', params:{address:'string'}, desc:'Set the current account to the address provided'},
{name:'showAddress', params:{}, desc:'Show the current account address'},
{name:'createAccount', params:{name:'string'}, desc:'Create a new account with the name provided'},
{name:'listAccounts', params:{}, desc:'List all accounts'},
{name:'renameAccount', params:{address:'string', name:'string'}, desc:'Rename an account'},
{name:'importAccount', params:{}, desc:'Import an account'},
{name:'fund', params:{}, desc:'Fund the current account with testnet lumens'},
{name:'getFederationName', params:{}, desc:'Get the federation name for the current account'},
{name:'lookUpFedAccountByAddress', params:{address:'string'}, desc:'Get the federation address for the current account'},
{name:'lookUpFedAccountByName', params:{url:'string'}, desc:'Get the federation address for an account by its name*metastellar.io fed name'},
{name:'getBalance', params:{testnet:'boolean'}, desc:'Get the balance of the current account'},
{name:'getAssets', params:{}, desc:'Get the assets of the current account'},
{name:'signStr', params:{challenge:'string'}, desc:'Sign a string'},
{name:'dispPrivateKey', params:{}, desc:'Display the private key of the current account'},
{name: 'getAccountInfo', params:{}, desc:'Get the account info of the current account from horizon'},
{name: 'transfer', params:{to:'string', amount:'string', testnet:'boolean'}, desc:'Transfer lumens to another account, will create an account if it does not exist'},
{name: 'signTransaction', params:{transaction:'XDR as string', testnet:'boolean'}, desc:'Sign a transaction'},
{name: 'signAndSubmitTransaction', params:{transaction:'XDR as string', testnet:'boolean'}, desc:'Sign and submit a transaction'},
{name: 'createFederationAccount', params:{}, desc:'Opens the create federation account dialog'},
{name: 'openSendXLM', params:{}, desc:'Opens the send XLM dialog'},
]