import { Box, Text, Bold, Copyable, Heading, Button, Input, Form, Spinner} from '@metamask/snaps-sdk/jsx';

import type {Wallet} from '../Wallet';
import type { Client } from '../Client';
import {getDataPacket} from '../assets';
import type {DataPacket} from '../assets';
import type { WalletFuncs } from 'WalletFuncs';
import { InteractionHandler } from './InteractionHandler';


export const SendXLM = async (dataPacket:DataPacket, wallet:Wallet, operations:WalletFuncs, testnet:boolean)=>{
    console.log("getting wallet");
    console.log("got wallet");
    console.log(wallet);
    let balance = testnet? dataPacket.testnetXLMBalance: dataPacket.mainnetXLMBalance;
    
    const sendCallback = async (interfaceId:string, operations:WalletFuncs)=>{
        console.log("send callback");
        let state = await InteractionHandler.getState(interfaceId);
        let address = state.sendForm.sendXLMAddress;
        let amount = state.sendForm.XLMAmmount;
        let loadingUI = (
        <Box>
            <Heading>Sending {amount} XLM</Heading>
            <Spinner/>
        </Box>);
        await InteractionHandler.updateInterface(interfaceId, loadingUI);
        let result = await operations.transfer(address, amount, false);
        await InteractionHandler.updateInterface(interfaceId, <Text>{JSON.stringify(result)}</Text>);

    };

    const addressCallback = async (interfaceId:string, dataPacket:DataPacket)=>{
        console.log("address callback");
        let state = await InteractionHandler.getState(interfaceId);
        let address = state.sendForm.sendXLMAddress;
        console.log("current address is: " + address);
        
        let uiUpate = (
        <Box>
            <Heading>
                {dataPacket.name} - {balance} XLM
            </Heading>
            <Form name="sendForm">
                <Input name="sendXLMAddress" placeholder="Recipient Address"/>
                <Input name="XLMAmmount" placeholder="Amount"/>
                <Text>{address}</Text>
                <Button name="sendXLM">Send</Button>
            </Form>
        </Box>
        );
        await InteractionHandler.updateInterface(interfaceId, uiUpate);
    };

    const ui = (
        <Box>
            <Heading>
                {dataPacket.name} - {balance} XLM
            </Heading>
            <Form name="sendForm">
                <Input name="sendXLMAddress" placeholder="Recipient Address"/>
                <Input name="XLMAmmount" placeholder="Amount"/>
                <Button name="sendXLM">Send</Button>
            </Form>
        </Box>
    );

    const interfaceId = await InteractionHandler.createInterface(ui);
    InteractionHandler.registerButton(interfaceId, "sendForm", sendCallback, [operations]);
    InteractionHandler.registerInput(interfaceId, "sendXLMAddress", addressCallback, [dataPacket]);
    await snap.request({
        method: "snap_dialog",
        params: {
          type: "alert",
          id: interfaceId
        }
    });
    
};