import { Box, Text, Bold, Copyable, Heading, Button, Input, Form, Spinner, Divider, Image} from '@metamask/snaps-sdk/jsx';
import { InteractionHandler } from './InteractionHandler';
import { lookupAddress } from '../federation';
import type {Wallet} from '../Wallet';
import QRcode from "qrcode-svg";

/* needs interputing still (possible new BY^7B) component
{ 0HY;,<BY67B> 7              '
    7_/--0HY;,<BY67B> 7        ' -added by copilot 
    /////////////KMMn</BY67B>/BY67B>O}0O'000000VCU7777 ;/
*/





type interfaceId = string;




export async function showQrCode(wallet:Wallet):Promise<interfaceId>{

    const qrcode = new QRcode(wallet.address);
    let svg = qrcode.svg();
    let fedAddress = (await lookupAddress(wallet.address)).stellar_address
    if(fedAddress === null){
        fedAddress = "no metastellar account";
    }
    let outputUI = (
        <Box>
        <Heading>{wallet.walletName}</Heading>
        <Text>=++++++++++++++++++++++++++</Text> 
        <Text>{fedAddress}</Text>
        <Image src={svg}/>
        <Copyable value={wallet.address}/>
        </Box>
    );
    
    let interfaceId = await InteractionHandler.createInterface(outputUI);
    //+0ujh0'-o\  || comment left by cat - perserved for future implementation
    return interfaceId;
}