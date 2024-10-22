import { Box, Text, Bold, Copyable, Heading, Button, Input, Form, Spinner, Divider} from '@metamask/snaps-sdk/jsx';

import type {Wallet} from '../Wallet';
import type { Client } from '../Client';
import {getDataPacket} from '../assets';
import type {DataPacket} from '../assets';
import type { WalletFuncs } from 'WalletFuncs';
import { InteractionHandler } from '../InteractionHandler';
import Utils from '../Utils';
type interfaceId = string;
export const sendXLM = async (dataPacket:DataPacket, wallet:Wallet, operations:WalletFuncs|null, testnet:boolean):Promise<interfaceId> => 
{
    console.log("getting wallet");
    console.log("got wallet");
    console.log(wallet);
    let balance = testnet? dataPacket.testnetXLMBalance: dataPacket.mainnetXLMBalance;
    
    const sendCallback = async (interfaceId:string, operations:WalletFuncs|null)=>{
        if(operations === null){
            let errorUI = (
                <Box>
                    <Heading>Sending Funds Requires a Funded Account</Heading>
                    <Divider/>
                    <Text>You Need To Add XLM to your Account Before You Can Send Funds</Text>
                </Box>
            );
            await InteractionHandler.updateInterface(interfaceId, errorUI);
            return Utils.throwError(400, "Account Not Funded");
        }
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
        let memoString = state.sendForm.Memo;
        if(memoString === ""){
            memoString = null;
        }
        let result = await operations.transfer(address, amount, false, memoString);
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
                <Input name="Memo" placeholder="Memo"/>
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
                <Input name="Memo" placeholder="Memo"/>
                <Button name="sendXLM">Send</Button>
            </Form>
        </Box>
    );

    const interfaceId = await InteractionHandler.createInterface(ui);
    InteractionHandler.registerButton(interfaceId, "sendForm", sendCallback, [operations]);
    InteractionHandler.registerInput(interfaceId, "sendXLMAddress", addressCallback, [dataPacket]);
    return interfaceId;
    
};