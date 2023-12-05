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
        console.log(mainNetBalances);
        console.log(testNetBalances);
        let currentState:State = await StateManager.getState();
        console.log("current assets");
        console.log(currentState.assets.testnet);
        console.log("new assets");
        console.log(testNetBalances);
        await this.handleAssetNotifications(currentState.assets.testnet, testNetBalances, currentState, "testnet");
        await this.handleAssetNotifications(currentState.assets.mainnet, mainNetBalances, currentState, "mainnet");
        
    }

    async handleAssetNotifications(prevAssets, currentAssets, currentState:State, network:"mainnet"|"testnet"){
      let outputItems = {}
      function findIncreasedBalanceOrNewObjects(prevAssets, currentAssets) {
        // Create a map of issuer to balance from the first array
        console.log("here");
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
          console.log("inside filter function");
          const balanceInArray1 = balanceMap.get(item.issuer);
          if (balanceInArray1 === undefined) {
            // If the issuer is not in the first array, it's a new object
            outputItems[item.issuer] = {asset: item, "diff":item.balance}
            return true;
          }
          console.log("about to return bool");
          outputItems[item.issuer] = {asset:item, "diff":item.balance - balanceInArray1}
          return item.balance > balanceInArray1;
        });
        
        console.log("--------------------------------------------- asset diff ------------------------------------------");
        console.log(result);
        return Array.from(result);
      }
      const diffAssets = findIncreasedBalanceOrNewObjects(prevAssets, currentAssets);
      console.log(diffAssets);
      if(diffAssets.length === 0){
        return true;
      }
      currentState.assets[network] = currentAssets;
      await StateManager.setState(currentState)

      if(diffAssets.length < 4){
        for(let i = 0; i<diffAssets.length; i++){
          let itemInfo = outputItems[diffAssets[i].issuer]
          console.log(itemInfo.asset);
          console.log(itemInfo.asset.asset_code);
          await Utils.notify(`recived ${itemInfo.diff} ${network} ${itemInfo.asset.asset_code}`)
        }
      }
      else{
        await Utils.notify(`received ${diffAssets.length} ${network} assets`);
      }
    }



 

}