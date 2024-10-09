<script lang='ts'>
    import { Input, Dropdown, Search, DropdownItem, Checkbox, Button, Listgroup, ListgroupItem, Rating} from "flowbite-svelte";
    import {Asset} from 'stellar-sdk';
    export let ownedAssets:Array<displayAsset> = [];
    export let selectedAsset:Asset;
    export let network:'testnet'|'mainnet' = 'mainnet';
    const stellarImage = "https://upload.wikimedia.org/wikipedia/commons/5/56/Stellar_Symbol.png";
    let DropdownOpen = false;
    let assetSelected = false;
    let preventClose = false;
    let selectedAssetDisp:displayAsset;
    let currentSearch:string = "";
    type displayAsset = {image:string, asset:string|undefined, code:string, domain:string, score:number}
    const xlm_display = {image:stellarImage, asset:undefined, code:"XLM", domain:"stellar.org", score:10}
    let assetResults:Array<displayAsset> = [...ownedAssets, xlm_display]
    function getAssetDisp(asset:any){
        let image:string;
        let code:string;
        let domain:string;
        let assetId: string;
        if(asset.tomlInfo !== undefined){
            image = asset.tomlInfo.image;
            code = asset.tomlInfo.code;
        }
        else{
            image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQErufEdC325ECfUANYh7lzYRbsQxI67-xbjj3kfbovEQ&s"
            code = asset.asset.split('-')[0];
        }
        domain = asset.domain;
        assetId = asset.asset.split('-')[1];
        
        return {image, code, domain, asset:assetId, score:asset.rating.trustlines}
    }

    async function search_asset(search:string, network:"mainnet"|"testnet"|'public'){
        if(network === 'mainnet'){
            network = 'public';
        }
        const url = 'https://api.stellar.expert/explorer/';
        console.log("here");
        const res = await fetch(url+`${network}/asset?search=${search}&limit=8&sort=trustlines`);
        const results = []
        if(res.ok){
            const json =  await res.json();
            console.log(json);
            const asset_list = json._embedded.records as Array<any>;
            console.log(asset_list);
            results.push(...asset_list);
            console.log(results);
            return results;
        }
    }
    function handleSearchComplete(results:any){
        let outputArray = [xlm_display]
        for(let asset of results){
            outputArray.push(getAssetDisp(asset));
        }
        outputArray.push(...ownedAssets);
        console.log("search complete setting output array");
        DropdownOpen = true
        assetResults = outputArray;
        console.log(outputArray);
        console.log(assetResults);
    }
    function handleInputChange(){
        console.log("inputchange");
        search_asset(currentSearch, network).then(handleSearchComplete)
    }
    function assetSelectFactory(assetdisp:displayAsset){
        const handleAssetSelect =  function(e){
            console.log(e);
            e.preventDefault();
            e.stopPropagation();
            console.log("asset is: ");
            console.log(assetdisp.asset)
            console.log(assetdisp);
            selectedAsset = new Asset(assetdisp.code, assetdisp.asset)
            console.log(selectedAsset);
            assetSelected = true;
            selectedAssetDisp = assetdisp;
            DropdownOpen = false;
            console.log(selectedAsset);
        }
        return handleAssetSelect
    }
</script>
<div class="flex">
    <div style="flex:1;">
    <Search on:focus={()=>{assetSelected = false; DropdownOpen=true;}} on:keyup={handleInputChange} bind:value={currentSearch} on:blur={()=>preventClose?null:DropdownOpen=false}/>
    </div>
    {#if assetSelected}
    <div style="flex:3;">
    <Button color="light" style="width:100%;">
        <img height="20" width="20" alt={selectedAssetDisp.code+" logo"} src={selectedAssetDisp.image}/>
        <p>{selectedAssetDisp.code}</p>
    </Button>
    </div>
    {/if}
</div>
{#if DropdownOpen}
    <div class="h-36 overflow-y-scroll">
    <Listgroup>
    {#each assetResults as assetdisp}
        <ListgroupItem>
            <Button color="light" class="w-full" on:mouseenter={()=>preventClose=true} on:mouseleave={()=>preventClose=false} on:click={assetSelectFactory(assetdisp)}>
            <div class='flex-col'>
                <div class='flex'>
                    <img height="20" width="20" alt={assetdisp.code+" logo"} src={assetdisp.image}/>
                    <p>{assetdisp.code}</p>
                    <Rating id="example-1" total={10} count size={20} rating={assetdisp.score.toFixed(1)} />
                </div>
                <p>{assetdisp.domain}</p>
            </div>
            </Button>
        </ListgroupItem>
    {/each}
    </Listgroup>
    </div>
{/if}

