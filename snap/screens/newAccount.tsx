import {Box, Heading, Text, Copyable, Divider} from '@metamask/snaps-sdk/jsx';
import { InteractionHandler } from '../InteractionHandler';

export async function CreateNewAccountConfimation(name:string): Promise<boolean>{
    const ui = (
        <Box>
            <Heading>Create Account</Heading>
            <Divider/>
            <Copyable value={InteractionHandler.requestOrigin}/>
            <Text>Would Like to Create An Account Named:</Text>
            <Copyable value={name}/>
        </Box>
    );
    let result = await snap.request({
        method: 'snap_dialog',
        params: {
            type: 'confirmation',
            content: ui,
        },
    }) as boolean;
    return result;
}
