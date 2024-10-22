import { Box, Text, Bold, Copyable, Heading, Button} from '@metamask/snaps-sdk/jsx';
import { Wallet } from '../Wallet';
import { Client } from '../Client';
import {getDataPacket} from '../assets';
import type {DataPacket} from '../assets';
import { InteractionHandler } from '../InteractionHandler';
import {showQrCode} from './receiveXLM';
import {sendXLM} from './sendXLM';

const HomeScreen = async ()=>{
    console.log("getting wallet");
    const wallet = await Wallet.getCurrentWallet();
    console.log("got wallet");
    console.log(wallet);
    let wallet_funded = false;
    let baseAccount;
    
  
    const keyPair = wallet.keyPair;
    console.log("about to init client");
    const client = new Client();

    const walletData = await getDataPacket(wallet, client);
    console.log(walletData);
    const openReceive = async ()=>{ showQrCode(wallet); }
    //const openSend = async ()=>{ SendXLM(walletData, wallet, client, false); }
    let screenUI = (
        <Box>
            <Heading>
                {walletData.name} - {walletData.mainnetXLMBalance} XLM
            </Heading>
           <Copyable value={walletData.currentAddress}/>
            <Button name="receive">Receive</Button>
        </Box>
    );
    let interfaceId = await InteractionHandler.createInterface(screenUI);
    InteractionHandler.registerButton(interfaceId, "receive", openReceive, []);
    
    //InteractionHandler.registerButton(interfaceId, "send", openSend, []);
    return screenUI;

};

export default HomeScreen;