import {Box, Heading, Text, Copyable, Divider} from '@metamask/snaps-sdk/jsx';
import { InteractionHandler } from '../InteractionHandler';
import Utils from '../Utils';
import {Wallet} from '../Wallet';
import { SimpleAccount } from 'types';
export async function renameAccountDialog(address:string): Promise<boolean>{
    let account = (await Wallet.getAccount(address)) as SimpleAccount
    
    let ui = (
        <Box>
            <Heading>Rename Account</Heading>
            <Text>{InteractionHandler.requestOrigin}</Text>
            <Divider/>
            <Box>
                <Heading>{account.name}</Heading>
                <Copyable value={account.address}/>
            </Box>
            <Divider/>
            
        </Box>
    )
    let newName = await Utils.openDialogWithContent(ui, "prompt");
    if(newName === null){
        Utils.throwError(400,"User Rejected Request");
        return false;
    }
    
    return await Wallet.renameWallet(address, newName as string);
}