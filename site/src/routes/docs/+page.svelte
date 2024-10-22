<script>
	
	
	
    import {Tabs, TabItem, P} from 'flowbite-svelte';
    import QuickStart from './QuickStart.svelte';
    import Methods from './methods.svelte';
    import Soroban from './soroban.svelte';
    import Types from './types.svelte';
    import Playground from './playground.svelte';
    
</script>
<div class="uk-container justify-center">
    <br/><br/>
    <div >
        <P size="4xl">MetaStellar.io/Docs</P>
        Metamask Wallet Support For your Stellar Application
    </div>
    <br/><br/>
    <Tabs>
        <TabItem title='quickStart' open>
            <QuickStart/>
        </TabItem>
        <TabItem title='soroban'>
            <Soroban/>
        </TabItem>
        <TabItem title='methods'>
            <Methods/>
        </TabItem>
        <TabItem title='types'>
            <Types/>
        </TabItem>
        <TabItem title='playground'>
            <Playground/>
        </TabItem>
    </Tabs>
</div>