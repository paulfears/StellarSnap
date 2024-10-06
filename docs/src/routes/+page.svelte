<script>
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import 'svelte-highlight/styles/atom-one-dark.css';
	import {
		AssetBalance,
		BuildingFromSource,
		callMetaStellar,
		connect,
		copy_the_metastellar_function,
		createAccount,
		createFederationAccount,
		DataPacket,
		dispPrivateKey,
		easily_signing_a_transaction,
		fund,
		get_wallet_data,
		getAccountInfo,
		getAddress,
		getAssets,
		getBalance,
		getDataPacket,
		importAccount,
		invoke_the_metastellar_function,
		listAccounts,
		NativeBalance,
		renameAccount,
		sendAsset,
		sendAuthRequest,
		setCurrentAccount,
		showAddress,
		signAndSubmitTransaction,
		signStr,
		signTransaction,
		Soroban,
		specify_a_network,
		transfer,
		WalletAsset
	} from '$lib/code-snippets/docs';
</script>

<svelte:head>
	<title>Docs | MetaStellar</title>
</svelte:head>

<div
	class="w-full flex flex-col justify-start items-start space-y-10 py-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
>
	<!-- Introduction -->
	<div
		class="bg-orange-50 border-r-8 border-b-8 border-orange-400 p-8 text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-zinc-800 w-full leading-loose pb-8"
	>
		Add <span class="text-orange-500">Metamask</span> to your 🪐stellar/<span class="font-normal"
			>soroban</span
		> application
	</div>
	<div class="text-md md:text-lg xl:text-xl p-8 font-bold text-zinc-800 w-full bg-zinc-100">
		<span class="font-normal">In one step</span> - copy📑
		<span class="bg-stone-800 text-lime-300 font-black p-0.5 text-sm">callMetaStellar</span> (method,
		params)
	</div>
	<div class="flex flex-row space-x-4 items-center justify-start">
		<i class="fal fa-info-circle text-xl text-orange-300"></i>
		<div class="text-sm font-normal text-stone-600">
			also install <a href="https://docs.metamask.io/snaps/get-started/install-flask" class="link"
				>metamask flask</a
			> (until offical launch)
		</div>
	</div>
	<div class="w-full flex flex-col space-y-3 items-start justify-start">
		<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
			<Highlight code={callMetaStellar} language={typescript} let:highlighted>
				<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
			</Highlight>
		</div>
		<button type="button" class="btn"> Run💡 </button>
		<p>
			The metastellar.io team manages and maintains the stellar wallet plugin for metamask. If
			implemented correctly, <b
				>the end user should be aware they are using the stellar chain, but the experence should
				never feel like they are using a 'plug-in'</b
			>
			hince the term <b>snap</b>.
		</p>

		<p>
			The <b>metastellar snap</b> is a piece of code that lives inside the metamask wallet, and is
			automatically installed when requested by a web app. Connecting to the Stellar network using
			the snap is covered in
			<a class="link" href="https://metastellar.io/docs/#/?id=%e2%9c%a8connect-and-install"
				>✨connect and install</a
			> portion of the docs.
		</p>
		<p>
			After the user installs the snap, a stellar wallet automatically created for them. This wallet
			can be accessed, using the standard metamask rpc api. This means that if you have experence
			developing with metamask in ethereum this shouldn't be too different. (sadly, no <del
				>web3.js</del
			> stellar3.js yet 🤞).
		</p>
		<p>
			As a developer basic idea, is you shouldn't have to focus on OUR wallet, you should focus on
			YOUR app. Ideally the flow would be.
		</p>
		<ul class="flex flex-col items-start justify-start space-y-2 w-full">
			<li class="w-full items-center justify-start space-x-4 flex flex-row">
				<div
					class="w-8 h-8 p-1 text-center text-lg font-black text-orange-100 bg-orange-500 flex-none mx-auto flex items-center justify-center"
				>
					1
				</div>
				<p>Connect Metamask</p>
			</li>
			<li class="w-full items-center justify-start space-x-4 flex flex-row">
				<div
					class="w-8 h-8 p-1 text-center text-lg font-black text-orange-100 bg-orange-500 flex-none mx-auto flex items-center justify-center"
				>
					2
				</div>
				<p>
					<a class="link" href="https://github.com/stellar/js-stellar-sdk">Create Stellar TXN</a>
				</p>
			</li>
			<li class="w-full items-center justify-start space-x-4 flex flex-row">
				<div
					class="w-8 h-8 p-1 text-center text-lg font-black text-orange-100 bg-orange-500 flex-none mx-auto flex items-center justify-center"
				>
					3
				</div>
				<p>
					Call <a class="link" href="https://metastellar.io/docs/#/?id=_39signtransaction39"
						>signTxn</a
					>
				</p>
			</li>
			<li class="w-full items-center justify-start space-x-4 flex flex-row">
				<div
					class="w-8 h-8 p-1 text-center text-lg font-black text-orange-100 bg-orange-500 flex-none mx-auto flex items-center justify-center"
				>
					4
				</div>
				<p>
					<a class="link" href="https://github.com/stellar/js-stellar-sdk">Submit signed txn</a>
					✅
				</p>
			</li>
		</ul>
	</div>
	<!-- happy hacking -->
	<div id="happy hacking" class="card">
		<div class="card-header">Happy Hacking!</div>
		<div class="card-body"></div>
	</div>
	<!-- quick start -->
	<div id="quick-start" class="card">
		<div class="card-header">Quick Start</div>
		<div class="card-body">
			<ol class="p-4">
				<li>- &nbsp; There is <b>NO npm package required!</b></li>
				<li>
					- &nbsp; The only thing required is that the users computer has metamask flask<br />(just
					normal metamask after launch)
				</li>
				<li>
					- &nbsp;
					<a href="https://docs.metamask.io/snaps/get-started/install-flask/" class="link"
						>install flask</a
					>
				</li>
			</ol>
		</div>
	</div>
	<!-- connect and install -->
	<div id="connect-and-install" class="card">
		<div class="card-header">✨ Connect and install</div>
		<div class="card-body">
			<p class="px-4">
				The <b>wallet_requestSnaps</b> method is used to <b>connect</b> to MetaMask
				<b>and installs</b> the Stellar Wallet if it's not already installed. This also generates the
				user's wallet.
			</p>
			<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
				<Highlight code={connect} language={typescript} let:highlighted>
					<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
				</Highlight>
			</div>
			<button type="button" class="btn"> Exec Connect() </button>
		</div>
	</div>
	<!-- calling stellar methods -->
	<div id="calling-stellar-methods" class="card">
		<div class="card-header">✨ Calling Stellar Methods</div>
		<div class="card-body">
			<p>
				After the snap is connected the <b>wallet_invokeSnap</b> method is used to call Stellar Methods
			</p>

			<h4 id="get-wallet-data">🟠 get wallet data</h4>

			<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
				<Highlight code={get_wallet_data} language={typescript} let:highlighted>
					<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
				</Highlight>
			</div>
			<button type="button" class="btn"> Retreve Standard Wallet INFO! </button>
			<a href="#getDataPacket-method" class="link">getDataPacket method</a>
		</div>
	</div>
	<!-- specify a network -->
	<div id="specify-a-network" class="card">
		<div class="card-header">🌐 Specify a Network</div>
		<div class="card-body">
			<p>
				by default all methods are treated as mainnet, but any method can be issued to the testnet
				by using the testnet param. The testnet parameter can be used with all methods. If it dosn't
				make since for a certain method it is simply ignored silently.
			</p>

			<p>Example:</p>

			<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
				<Highlight code={specify_a_network} language={typescript} let:highlighted>
					<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
				</Highlight>

				<template>
					<pre><code>
                          {`const result = await window.ethereum.request({
                              method: 'wallet_invokeSnap',
                              params: {
                                  snapId: 'npm:stellar-snap',
                                  request: {
                                      method: 'getBalance',
                                      params: {
                                          testnet: true
                                      }
                                  }
                              }
                          })`}
                        </code></pre>
				</template>
			</div>
		</div>
	</div>
	<!-- easily signing a transaction -->
	<div id="easily-signing-a-transaction" class="card">
		<div class="card-header">🔏 easily Signing a Transaction</div>
		<div class="card-body">
			<p>
				use with the <a
					href="https://github.com/stellar/js-stellar-sdk"
					target="_blank"
					class="link">Stellar-js-sdk</a
				>
			</p>

			<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
				<Highlight code={easily_signing_a_transaction} language={typescript} let:highlighted>
					<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
				</Highlight>
			</div>
		</div>
	</div>
	<!-- calling stellar rpc methods -->
	<div id="calling-stellar-rpc-methods" class="card">
		<div class="card-header">Calling Stellar RPC Methods</div>
		<div class="card-body">
			<p>The easiest way to interact with the wallet is by coping the metastellar function</p>

			<h4 id="copy-the-callmetastellar-function">📎 copy the callMetaStellar Function</h4>

			<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
				<Highlight code={copy_the_metastellar_function} language={typescript} let:highlighted>
					<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
				</Highlight>
			</div>
			<p>invoke the callMetaStellar function</p>
			<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
				<Highlight code={invoke_the_metastellar_function} language={typescript} let:highlighted>
					<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
				</Highlight>
			</div>

			<!-- getAddress -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="getAddress">'getAddress'</h4>
				<p>returns the accounts address as a string</p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={getAddress} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>

			<!-- getAccountInfo -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="getAccountInfo">'getAccountInfo'</h4>
				<p>grabs infomation related to the account requires account to be funded</p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={getAccountInfo} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
				<button type="button" class="btn">Get Account Info</button>
			</div>

			<!-- getBalance -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="getBalance">'getBalance'</h4>
				<p>gets the XLM balance of a wallet, returns 0 in unfunded wallets</p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={getBalance} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
				<button type="button" class="btn">Get Balance</button>
			</div>

			<!-- transfer -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="transfer">'transfer'</h4>
				<p>
					this method is used to transfer xlm and requires a funded account. after being called the
					wallet will generate a transaction, then prompt a user to accept if the user accepts the
					transaction it will be signed and broadcast to the network. will return transaction
					infomation. And send a notification stating whether the transaction was successful.
				</p>
				<p>returns: StellarSDK.TransactionResult</p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={transfer} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
				<button type="button" class="btn">Send XLM</button>
			</div>

			<!-- fund -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="fund">'fund'</h4>
				<p>this method funds the users wallet on the testnet,</p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={fund} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>

			<!-- signTransaction -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="signTransaction">'signTransaction'</h4>
				<p>This method signs an Arbitary Transaction</p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={signTransaction} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>

			<!-- signAndSubmitTransaction -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="signAndSubmitTransaction">signAndSubmitTransaction</h4>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={signAndSubmitTransaction} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>

			<!-- getDataPacket -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="getDataPacket">'getDataPacket'</h4>
				<p>retreves wallet info about the user, including names, addressess, and balances</p>
				<p>returns <a href="#DataPacket" class="link">DataPacket</a></p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={getDataPacket} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
				<button type="button" class="btn">Get Data Packet</button>
			</div>

			<!-- setCurrentAccount -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="setCurrentAccount">setCurrentAccount</h4>
				<p>changes the connected account</p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={setCurrentAccount} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>

			<!-- showAddress -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="showAddress">'showAddress'</h4>
				<p>displays the stellar address and a qr code in the extension</p>
				<p>returns: boolean</p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={showAddress} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
				<button type="button" class="btn">Show Address</button>
			</div>

			<!-- createAccount -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="createAccount">'createAccount'</h4>
				<p>creates a new Account on the wallet</p>

				<p>parameters: {@html '{name:<i class="text-sky-600 italic">string</i>}'}</p>

				<p>returns: <i class="text-sky-600 italic">bool</i></p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={createAccount} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
				<button type="button" class="btn">Create Account</button>
			</div>

			<!-- listAccounts -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="listAccounts">listAccounts</h4>
				<p>returns a list of all stellar accounts in the wallet</p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={listAccounts} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>

			<!-- renameAccount -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="renameAccount">renameAccount</h4>
				<p>selects an account by address and changes its name</p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={renameAccount} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>

			<!-- importAccount -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="importAccount">importAccount</h4>
				<p>opens a dialog where the user is prompted to import their private key, if they choose</p>

				<p>throws on error</p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={importAccount} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>

			<!-- getAssets -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="getAssets">getAssets</h4>
				<p>gets all assets for the current Wallet</p>
				<p>returns <a href="#wallet-asset" class="link">walletAsset[]</a></p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={getAssets} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>

			<!-- sendAuthRequest -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="sendAuthRequest">sendAuthRequest</h4>
				<p>sendAuthRequest is used to sign-in with</p>

				<p>returns: <i class="text-sky-600 italic">bool</i></p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={sendAuthRequest} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>

			<!-- signStr -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="signStr">signStr</h4>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={signStr} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>

			<!-- dispPrivateKey -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="dispPrivateKey">dispPrivateKey</h4>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={dispPrivateKey} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>

			<!-- sendAsset -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="sendAsset">sendAsset</h4>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={sendAsset} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>

			<!-- createFederationAccount -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="createFederationAccount">createFederationAccount</h4>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={createFederationAccount} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>

			<!-- Soroban -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="Soroban">'Soroban'</h4>
				<p>
					The Wallet also supports sorroban, To sign a SorobanCall futurenet must be set to true on
					the params object.
				</p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={Soroban} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>
		</div>
	</div>

	<!-- types -->
	<div id="types" class="card">
		<div class="card-header">types</div>
		<div class="card-body">
			<!-- DataPacket -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="DataPacket">DataPacket</h4>
				<p>this method DataPackets the users wallet on the testnet,</p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={DataPacket} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>
			<!-- WalletAsset -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="WalletAsset">WalletAsset</h4>
				<p>a type that represents a the balance of asset held by a wallet</p>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={WalletAsset} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>
			<!-- NativeBalance -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="NativeBalance">NativeBalance</h4>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={NativeBalance} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>
			<!-- AssetBalance -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="AssetBalance">AssetBalance</h4>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={AssetBalance} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
			</div>
			<!-- BuildingFromSource -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="BuildingFromSource">Building From Source</h4>
				<div class="w-full max-h-[480px] h-full overflow-auto scrollbar-hide">
					<Highlight code={BuildingFromSource} language={typescript} let:highlighted>
						<LineNumbers {highlighted} wrapLines --padding-left="1em" --padding-right="1em" />
					</Highlight>
				</div>
				<p>and just like that you should be good to go.</p>
			</div>
			<!-- KeyGenerationAndStorage -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="KeyGenerationAndStorage">Key Generation and Storage</h4>
				<p>
					keys are generated on the fly, anytime a method is invoked. This works by requesting
					private entropy from the metamask wallet inside of the snaps secure execution enviroment,
					and using that entropy to generate a users keys. This entropy is static, and based on the
					users ethereum account. This means that we at no point store keys, and the fissile
					material is handled by metamask.
				</p>
			</div>
			<!-- AccountRecovery -->
			<div class="w-full flex flex-col space-y-4 items-start justify-start py-4">
				<h4 id="AccountRecovery">Account Recovery</h4>
				<p>
					Because keys are handled in this way, when a user recovers their metamask account, they
					will also recover their stellar account, which means that there isn't another mnemonic to
					save.
				</p>
			</div>
		</div>
	</div>
</div>

