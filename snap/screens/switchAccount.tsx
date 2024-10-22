import { Heading, Text, Divider, Box, Copyable,  } from "@metamask/snaps-sdk/jsx";
import { InteractionHandler } from "../InteractionHandler";
import Utils from "../Utils";
import { Wallet } from "../Wallet";
import { SimpleAccount } from "types";

export async function switchAccountDialog(address:string): Promise<boolean>{
    let account = await Wallet.getAccount(address) as SimpleAccount
    let ui = (
        <Box>
            <Heading>Switch Accounts</Heading>
            <Divider/>
            <Copyable value={InteractionHandler.requestOrigin}/>
            <Text>would like to change the current wallet to</Text>
            <Box>
                <Copyable value={account.name}/>
                <Copyable value={account.address}/>
            </Box>
            <Divider/>
            <Text>this will change the active account on all tabs</Text>
        </Box>
    )
    return await Utils.openDialogWithContent(ui, "confirmation") as boolean;
}