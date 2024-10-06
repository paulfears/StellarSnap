<script>
	import '../app.css';
	$: show_menu = false;
</script>

<main class="w-full min-h-screen bg-white relative">
	<header class="lg:pl-[320px] z-[9998] w-full pl-0 border-b border-zinc-200 py-4 bg-white fixed h-[60px]">
		<nav
			class="w-full flex flex-row items-center h-full relative justify-start space-x-0 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
		>
			<button
				type="button"
				on:click={() => (show_menu = !show_menu)}
				class="bg-transparent flex flex-none items-center justify-center lg:hidden cursor-pointer hover:bg-zinc-100 border border-transparent hover:border-zinc-200 p-2 mr-3"
			>
				<i class="fal fa-bars text-zinc-600"></i>
			</button>
			<div class="text-xl font-medium text-zinc-600">Metastellar.io</div>
		</nav>
	</header>
	<div
		class="bg-white top-0 left-0 fixed z-[9999] max-w-[320px] {show_menu
			? 'flex'
			: 'hidden'} lg:flex flex-col items-start px-4 py-8 border-r border-zinc-200 min-h-screen w-full h-full"
	>
		<div class="flex flex-row items-center justify-between w-full mb-6">
			<div class="text-lg font-medium text-zinc-600">Metastellar.io</div>

			<button
				type="button"
				on:click={() => (show_menu = false)}
				class="bg-transparent flex flex-none items-center justify-center lg:hidden cursor-pointer hover:bg-zinc-100 border border-transparent hover:border-zinc-200 py-2 px-3.5"
			>
				<i class="fal fa-times text-zinc-600"></i>
			</button>
		</div>

		<ul
			class="w-full flex flex-col items-start justify-start space-y-2.5 scrollbar-hide h-auto overflow-auto"
		>
			<li class="w-full">
				<a href="#happy-hacking" class="nav-link" on:click={() => (show_menu = false)}
					>happy hacking</a
				>
			</li>
			<li class="w-full">
				<a href="#quick-start" class="nav-link" on:click={() => (show_menu = false)}>Quick Start</a>
				<ul class="nav-submenu">
					<li class="w-full">
						<a href="#connect-and-install" class="nav-link" on:click={() => (show_menu = false)}
							>✨ Connect and install</a
						>
					</li>
					<li class="w-full">
						<a href="#calling-stellar-methods" class="nav-link" on:click={() => (show_menu = false)}
							>✨ Calling Stellar Methods</a
						>
						<ul class="nav-submenu">
							<li class="w-full">
								<a href="#get-wallet-data" class="nav-link" on:click={() => (show_menu = false)}
									>🟠 get wallet data</a
								>
							</li>
							<li class="w-full">
								<a href="#specify-a-network" class="nav-link" on:click={() => (show_menu = false)}
									>🌐 Specify a Network</a
								>
							</li>
							<li class="w-full">
								<a
									href="#easily-signing-a-transaction"
									class="nav-link"
									on:click={() => (show_menu = false)}>🔏 easily Signing a Transaction</a
								>
							</li>
						</ul>
					</li>
				</ul>
			</li>
			<li class="w-full">
				<a
					href="#calling-stellar-rpc-methods"
					class="nav-link"
					on:click={() => (show_menu = false)}
				>
					Calling Stellar RPC Methods</a
				>
				<ul class="nav-submenu">
					<li class="w-full">
						<a
							href="#copy-the-callmetastellar-function"
							class="nav-link"
							on:click={() => (show_menu = false)}>📎 copy the callMetaStellar Function</a
						>
					</li>

					<li class="w-full">
						<a href="#getAddress" class="nav-link" on:click={() => (show_menu = false)}
							>'getAddress'</a
						>
					</li>

					<li class="w-full">
						<a href="#getAccountInfo" class="nav-link" on:click={() => (show_menu = false)}
							>'getAccountInfo'</a
						>
					</li>

					<li class="w-full">
						<a href="#getBalance" class="nav-link" on:click={() => (show_menu = false)}
							>'getBalance'</a
						>
					</li>

					<li class="w-full">
						<a href="#transfer" class="nav-link" on:click={() => (show_menu = false)}>'transfer'</a>
					</li>

					<li class="w-full">
						<a href="#fund" class="nav-link" on:click={() => (show_menu = false)}>'fund'</a>
					</li>

					<li class="w-full">
						<a href="#signTransaction" class="nav-link" on:click={() => (show_menu = false)}
							>'signTransaction'</a
						>
					</li>

					<li class="w-full">
						<a
							href="#signAndSubmitTransaction"
							class="nav-link"
							on:click={() => (show_menu = false)}>signAndSubmitTransaction</a
						>
					</li>

					<li class="w-full">
						<a href="#getDataPacket" class="nav-link" on:click={() => (show_menu = false)}
							>'getDataPacket'</a
						>
					</li>

					<li class="w-full">
						<a href="#setCurrentAccount" class="nav-link" on:click={() => (show_menu = false)}
							>setCurrentAccount</a
						>
					</li>

					<li class="w-full">
						<a href="#showAddress" class="nav-link" on:click={() => (show_menu = false)}
							>showAddress</a
						>
					</li>

					<li class="w-full">
						<a href="#createAccount" class="nav-link" on:click={() => (show_menu = false)}
							>'createAccount'</a
						>
					</li>

					<li class="w-full">
						<a href="#listAccounts" class="nav-link" on:click={() => (show_menu = false)}
							>listAccounts</a
						>
					</li>

					<li class="w-full">
						<a href="#renameAccount" class="nav-link" on:click={() => (show_menu = false)}
							>renameAccount</a
						>
					</li>

					<li class="w-full">
						<a href="#importAccount" class="nav-link" on:click={() => (show_menu = false)}
							>importAccount</a
						>
					</li>

					<li class="w-full">
						<a href="#getAssets" class="nav-link" on:click={() => (show_menu = false)}>getAssets</a>
					</li>

					<li class="w-full">
						<a href="#sendAuthRequest" class="nav-link" on:click={() => (show_menu = false)}
							>sendAuthRequest</a
						>
					</li>

					<li class="w-full">
						<a href="#signStr" class="nav-link" on:click={() => (show_menu = false)}>signStr</a>
					</li>

					<li class="w-full">
						<a href="#dispPrivateKey" class="nav-link" on:click={() => (show_menu = false)}
							>dispPrivateKey</a
						>
					</li>

					<li class="w-full">
						<a href="#sendAsset" class="nav-link" on:click={() => (show_menu = false)}>sendAsset</a>
					</li>

					<li class="w-full">
						<a href="#createFederationAccount" class="nav-link" on:click={() => (show_menu = false)}
							>createFederationAccount</a
						>
					</li>

					<li class="w-full">
						<a href="#Soroban" class="nav-link" on:click={() => (show_menu = false)}>'Soroban'</a>
					</li>
				</ul>
			</li>

			<li class="w-full">
				<a href="#types" class="nav-link" on:click={() => (show_menu = false)}>types</a>
				<ul class="nav-submenu">
					<li class="w-full">
						<a href="#DataPacket" class="nav-link" on:click={() => (show_menu = false)}
							>DataPacket</a
						>
					</li>
					<li class="w-full">
						<a href="#WalletAsset" class="nav-link" on:click={() => (show_menu = false)}
							>Wallet Asset</a
						>
					</li>
					<li class="w-full">
						<a href="#NativeBalance" class="nav-link" on:click={() => (show_menu = false)}
							>NativeBalance</a
						>
					</li>
					<li class="w-full">
						<a href="#AssetBalance" class="nav-link" on:click={() => (show_menu = false)}
							>AssetBalance</a
						>
					</li>
					<li class="w-full">
						<a href="#BuildingFromSource" class="nav-link" on:click={() => (show_menu = false)}
							>Building From Source</a
						>
					</li>
					<li class="w-full">
						<a href="#KeyGenerationAndStorage" class="nav-link" on:click={() => (show_menu = false)}
							>Key Generation and Storage</a
						>
					</li>
					<li class="w-full">
						<a href="#AccountRecovery" class="nav-link" on:click={() => (show_menu = false)}
							>Account Recovery</a
						>
					</li>
				</ul>
			</li>
		</ul>
	</div>
	<div class="lg:pl-[320px] w-full pl-0 bg-white z-0 py-[72px]">
		<slot />
	</div>
</main>
