<script lang='ts'>
	import svgLogo from '$lib/video/metastellar_Logo.svg';
	import ConnectButton from '$lib/components/connectButton.svelte';
	import {connected} from '$lib/wallet-store';
    import {Button} from 'flowbite-svelte';

	
	
	
	let burger = false;
	function handleResize(){
		if(window.innerWidth<768){
			burger = true;
		}
		else{
			burger = false;
		}
	
	}
	
</script>
<svelte:window on:resize={handleResize} />
<div id="header-container" class="uk-container">
	<nav class="uk-navbar-container uk-width-expand">
	  <div class="uk-navbar-center">
		{#if !burger}
		<ul class="uk-navbar-nav">
			
			<li id="logo" data-uk-hover class="uk-width-auto">
				<a href="/">
					<img class="uk-logo uk-width-2-3" src={svgLogo} alt="Metastellar Logo"/>
				</a>
			</li>
			<li data-uk-hover class="uk-width-1-6"><a href="/wallet">Wallet</a></li>
			<li data-uk-hover class="uk-width-1-6"><a href="/faq">FAQ</a></li>
			<li data-uk-hover class="uk-width-1-6"><a href="/docs">Docs</a></li>
			<li data-uk-hover class="uk-width-1-6">
				<br/>
				{#if !($connected)}
					<ConnectButton/>
				{:else}
					<Button color="yellow" >Connected</Button>
				{/if}
			</li>
		</ul>

		{:else}
		<ul class="uk-navbar-nav">
			<li id="logo" data-uk-hover class="uk-width-auto">
				<img class="uk-logo uk-width-1-2 uk-logo" src={svgLogo} alt="Metastellar Logo"/>
			</li>
			<li data-uk-hover class="uk-width-1-2"><div><ConnectButton/></div></li>
		</ul>
		{/if}
					
	</div>
					
	</nav>

</div>
<hr/>


<style>
	.uk-navbar-container{
		background-color: "white";
	}
	.uk-navbar-center{
		width: 100%;
		display: block;
		background-color: white;
	}
	#logo{
		width:50%;
		display: flex;
		justify-content: left;
		z-index: 5;
	}
	#logo *{
		max-width: 250px;
		min-width: 250px;
	}
	video{
		border:none;
		clip-path: inset(1px 1px);
	}
	.uk-container{
		background-color: white;
	}
	.uk-navbar-nav{
		background-color: white;
	}
	.uk-navbar-left{
		background-color: white;
	}
	.uk-navbar-container *{
		background-color: white;
	}
	.uk-width-expand{
		display: flex;
		justify-content: center;
	}
	hr{
		margin-top: 0px;
		
	}
	li a{
		font-size: larger;
	}
	.spaceApart{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.spaceApart li{
		margin-left: auto;
		margin-right: auto;
	}
	.spaceApart li *{
		float: right;
	}
	ul{
		width: 100%;
	}
</style>