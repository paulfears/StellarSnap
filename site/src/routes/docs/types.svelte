<script lang='ts'>

import Editor from "$lib/components/Editor/Editor.svelte";

let dataPacketString = `
export interface DataPacket{
    name:string,
    currentAddress:string,
    mainnetAssets?: walletAsset[],
    testnetAssets?: walletAsset[],
    accounts: Array<{name:String, address:String}>
    mainnetXLMBalance: string,
    testnetXLMBalance: string,
    fedName: string | null
}
`
</script>

<div id="datapacketType">
    <h2>DataPacket</h2>
    <p>this is the type returned from the getDataPacket method</p>
    <code>
        <pre>
            {`
            
            interface DataPacket{
                name:string,
                currentAddress:string,
                mainnetAssets?:`} <a>walletAsset[],</a>
                {`testnetAssets?: `} <a>walletAsset[],</a>
                {`accounts: Array< {name:string, address:string}  >
                mainnetXLMBalance: string,
                testnetXLMBalance: string,
                fedName: string | null
            }`}
        </pre>
    </code>
</div>


<div id="walletAssetType">
    <h2>WalletAsset</h2>
    <p>the type of the assets in the mainnetAssets and testnetAssets arrays</p>
    <code>
        <pre>
            {`
            type walletAsset = AssetBalance | NativeBalance
            `}
        </pre>
    </code>
</div>


<div id="NativeBalanceType">
    <h2>NativeBalance Type</h2>
    <p>Infomation about a given wallets XLM Balance</p>
    <code>
        <pre>
            {`
            interface NativeBalance{
                balance:string, // number or decimal number in string format (max 7 decimal places) may be big number
                liquidity_pool_id?:string,
                limit: string,
                buying_liabilites: string,
                selling_liabilites: string,
                sponser?: string,
                last_modified_ledger: number,
                is_authorized: boolean,
                is_authorized_to_maintain_liabilites: boolean,
                is_clawback_enabled: boolean,
                asset_type: "native",
                asset_issuer: "native"
                asset_code: "XLM"
            }
            `}
        </pre>
    </code>
</div>
<div id="AssetBalanceType">
    <h2>AssetBalance Type</h2>
    <p>Infomation about a given wallets balance of a specific asset</p>
    <code>
        <pre>
        {`
            interface AssetBalance{
                balance:string, // number or decimal number in string format (max 7 decimal places) may be big number
                liquidity_pool_id?:string, //number
                limit: string, //number
                buying_liabilites: string, //number
                selling_liabilites: string, //number
                sponser?: string, //address
                last_modified_ledger: number,
                is_authorized: boolean,
                is_authorized_to_maintain_liabilites: boolean,
                is_clawback_enabled: boolean,
                asset_type: "credit_alphanum4"|"credit_alphanum12"
                asset_code: string, // example: USDC, wBTC, wEth 
                asset_issuer: string, //address
            }
        `}
        </pre>
    </code>
</div>

<div id='SimpleAccountType'>
    <h2>SimpleAccount Type</h2>
    <p>Infomation about a given wallets balance of a specific asset</p>
    <code>
        <pre>
        {`
            interface SimpleAccount{
                name:string,
                address:string
            }
            type AccountList = SimpleAccount[]
        `}
        </pre>
    </code>
</div>
<style>
    a{
        color: #aaa;
        text-decoration: underline;
        
    }
    pre{
        background-color: #333;
        color: white;
        padding: 10px;
        border-radius: 5px;
    }
</style>