import { Box, Text, Bold, Copyable, Heading,} from '@metamask/snaps-sdk/jsx';
import { Wallet } from '../Wallet';
import { Client } from '../Client';
import {getDataPacket} from '../assets';
import type {DataPacket} from '../assets';
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
    return (
        <Box>
            <Heading>
                {walletData.name} - {walletData.mainnetXLMBalance} XLM
            </Heading>
           <Copyable value={walletData.currentAddress}/>
        </Box>
    );

};

export default HomeScreen;