<script lang='ts'>
    import {Card, NftPoster, YoutubePoster} from '@metastellar/ui-library';
	import Greeting from "../components/greeting.svelte";
    import OfficeImg from "$lib/images/wallet.webp";
    import { onMount } from "svelte";
    import ChatBox from "./components/Chat/index.svelte";

    import video1 from '$lib/video/metastellar.mp4';
    import girlImg from '$lib/images/girl.jpg'
    import { env } from "$lib/env";
    import {stellar_rpc_mainnet_endpoint} from '$lib/constants'

    const mouse_movement_record_send_url = env.VITE_MOUSE_MOVEMENT_DATA_SEND_URL;

    let titles = {
        wallet: "Wallet",
        news: "News",
        docs: "Documentation",
        chat: "Chat"
    }
    let screen:'lg'|'md'|'sm'|'xs' = 'lg';
    let screens = {
        lg: 1200,
        md: 992,
        sm: 768,
        xs: 576
    }

    function handleResize(){
        if(window.innerWidth > screens.md){
            screen = 'lg';
            titles.docs = "Documentation";
        }
        if(window.innerWidth < screens.lg){
            screen = 'md';
            titles.docs = "Docs";
        }
        if(window.innerWidth < screens.md){
            screen = 'sm';
        }
        if(window.innerWidth < screens.sm){
            screen = 'xs';
        }
    }
    onMount(() => {
        handleResize();
    });

    interface AssetAccount {
        code: string, // This asset's code
        issuer: string, // The Stellar address of this asset’s issuer.
    }

    const assetInfo: AssetAccount = {
        code: "FBO2",
        issuer: "GBSUYFOI5SWH7MWA43MQGXH3CP6DMBU3AKAU7ZGTEN7EKCNSVQWJUXOL"
    }

</script>
<svelte:window on:resize={handleResize} />
<Greeting />

<div id="midContainer"  class="uk-container justify-center">
    <br/>
    <div style="max-width: 50rem" class="flex flex-wrap gap-4 justify-center">
        <a href="/wallet">
        <div>
            <Card class="py-7 px-5 w-80 h-80" shadow>
                <p>Wallet</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#434343"><path d="M240-160q-66 0-113-47T80-320v-320q0-66 47-113t113-47h480q66 0 113 47t47 113v320q0 66-47 113t-113 47H240Zm0-470h480q29 0 54.5 9t45.5 26v-45q0-42-29-71t-71-29H240q-42 0-71 29t-29 71v45q20-17 45.5-26t54.5-9Zm-97 136 477 115q7 2 14.5.5T647-385l160-134q-13-23-36-37t-51-14H240q-35 0-62 21.5T143-494Z"/></svg>
            </Card>
        </div>
        </a>
        <a href="/docs">
        <div>
            <Card class="py-7 px-5 w-80 h-80" shadow>
                <p>Docs</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#434343"><path d="M319-250h322v-60H319v60Zm0-170h322v-60H319v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"/></svg>
            </Card>
        </div>
        </a>
        <a href="/application">
            <div>
                <Card class="py-7 px-5 w-80 h-80" shadow>
                    <p>Application</p>
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#434343"><path d="M180-120q-24.75 0-42.37-17.63Q120-155.25 120-180v-600q0-24.75 17.63-42.38Q155.25-840 180-840h205q5-35 32-57.5t63-22.5q36 0 63 22.5t32 57.5h205q24.75 0 42.38 17.62Q840-804.75 840-780v600q0 24.75-17.62 42.37Q804.75-120 780-120H180Zm0-60h600v-600H180v600Zm100-100h273v-60H280v60Zm0-170h400v-60H280v60Zm0-170h400v-60H280v60Zm200-177q14 0 24.5-10.5T515-832q0-14-10.5-24.5T480-867q-14 0-24.5 10.5T445-832q0 14 10.5 24.5T480-797ZM180-180v-600 600Z"/></svg>
                </Card>
            </div>
        </a>
        <a href="/transactionBuilder">
            <div>
                <Card class="py-7 px-5 w-80 h-80" shadow>
                    <p>Stellar Lab 2.0</p>
                </Card>
            </div>
        </a>
    </div>
</div>

<style>
    a {
        text-decoration: none;
        color:black;

    }

	.uk-flex{
		gap: 10px;
    }
    .uk-card{
        cursor: pointer;
    }
    /* .uk-card:hover{
        animation: both 3s float infinite;
    } */

    @keyframes float {
	0% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px) scale(1);
	}
	50% {
		box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
		transform: translatey(-5px) scale(1.01);

	}
	100% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px) scale(1);
	}
}

    .uk-container:has(.ms-frame:hover) .ms-frame:not(:hover) {
        filter: blur(5px);
    }
</style>