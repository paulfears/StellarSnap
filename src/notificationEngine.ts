import { Asset } from "stellar-base";
import { Client } from "./Client";
import { Wallet } from "./Wallet";
import { StateManager, State } from "./stateManager";
import Utils from "./Utils";
export class NotificationEngine{
    client:Client
    wallet:Wallet

    constructor(client:Client, wallet:Wallet){
        this.client = client;
        this.wallet = wallet;
    }

    async checkForNotifications(){
        const mainNetBalances = await this.client.getAssets(this.wallet.address);
        this.client.setNetwork("testnet")
        const testNetBalances = await this.client.getAssets(this.wallet.address);
        let currentState:State = await StateManager.getState();
        const currentAccountAddr = currentState.currentAccount;
        let currentBalances = currentState.accounts[currentAccountAddr].assets;
        await this.handleAssetNotifications(currentBalances.testnet, testNetBalances, currentState, "testnet");
        await this.handleAssetNotifications(currentBalances.mainnet, mainNetBalances, currentState, "mainnet");
        
    }

    async handleAssetNotifications(prevAssets, currentAssets, currentState:State, network:"mainnet"|"testnet"){
      let outputItems = {}
      function findIncreasedBalanceOrNewObjects(prevAssets, currentAssets) {
        // Create a map of issuer to balance from the first array
        const balanceMap = new Map();
        prevAssets.forEach((item) => {
          console.log(item);
          if(item.asset_type === "native"){
            balanceMap.set("native", item.balance);
          }
          else{
            balanceMap.set(item.issuer, item.balance);
          }
        });
        console.log(balanceMap);
        
        // Filter the second array to find objects with increased balance or new objects
        currentAssets = Array.from(currentAssets);
        
        const result = currentAssets.filter((item) => {
          if(item.asset_type === "native"){
            item.issuer = "native";
          }
          const balanceInArray1 = balanceMap.get(item.issuer);
          if (balanceInArray1 === undefined) {
            // If the issuer is not in the first array, it's a new object
            outputItems[item.issuer] = {asset: item, "diff":item.balance}
            return true;
          }
          outputItems[item.issuer] = {asset:item, "diff":item.balance - balanceInArray1}
          return item.balance > balanceInArray1;
        });
        return Array.from(result);
      }
      const diffAssets:any = findIncreasedBalanceOrNewObjects(prevAssets, currentAssets);
      console.log(diffAssets);
      if(diffAssets.length === 0){
        return true;
      }
      currentState.accounts[currentState.currentAccount].assets[network] = currentAssets;
      await StateManager.setState(currentState)

      if(diffAssets.length < 4){
        for(let i = 0; i<diffAssets.length; i++){
          let itemInfo = outputItems[diffAssets[i].issuer]
          if(itemInfo.diff < 0){
            await Utils.notify(`spent ${itemInfo.diff} ${network} ${itemInfo.asset.asset_code}`)
          }
          else{
            await Utils.notify(`recived ${itemInfo.diff} ${network} ${itemInfo.asset.asset_code}`)
          }
        }
      }
      else{
        await Utils.notify(`${diffAssets.length} ${network} assets updated`);
      }
    }



 

}