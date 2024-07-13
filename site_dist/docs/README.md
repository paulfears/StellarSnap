
<script>
  let connectButton = document.getElementById("connectButton");
  let connected = false;
  let testnet = true;
  let testnetFunded = true;
function bindCodeEditorShortcutKeys(textarea, highlighted) {
    function updateCode(){
      highlighted.textContent = textarea.value;
      setTimeout(function(){ textarea.selectionStart = textarea.selectionEnd = textarea.value.length }, 0);
      highlighted.scrollTop = textarea.scrollTop;
      hljs.highlightElement(highlighted);
    }

    console.log("binding shortcuts")
    console.log("to")
    console.log(textarea)
		// applying shortcut keys
    textarea.addEventListener('scroll', function(e){
      highlighted.scrollTop = textarea.scrollTop;
    })
    highlighted.addEventListener('scroll', function(e){
      highlighted.scrollTop = textarea.scrollTop;
    })
		textarea.addEventListener('keydown', function (e) {
      console.log("keypress");
			// [Enter] key pressed detected
			if (e.key === 'Enter') {
	
				// Prevent the default behavior (new line)
				e.preventDefault();
	
				// Get the cursor position
				var cursorPos = textarea.selectionStart;
	
				// Get the previous line
				var prevLine = textarea.value.substring(0, cursorPos).split('\n').slice(-1)[0];
	
				// Get the indentation of the previous line
				var indent = prevLine.match(/^\s*/)[0];
	
				// Add a new line with the same indentation
				textarea.setRangeText('\n' + indent, cursorPos, cursorPos, 'end');
	
				// remove focus
				textarea.blur();
	
				// regain focus (this is force the textarea scroll to caret position in case the caret falls out the textarea visible area)
				textarea.focus();
	      setTimeout(function(){textarea.selectionStart = textarea.selectionEnd = textarea.value.length}, 0);

				// copy the code from textarea to code block      
				updateCode();

			}
	
			// [Tab] pressed, but no [Shift]
			if (e.key === "Tab" && !e.shiftKey &&
	
				// and no highlight detected
				textarea.selectionStart == textarea.selectionEnd) {
	
				// suspend default behaviour
				e.preventDefault();
	
				// Get the current cursor position
				let cursorPosition = textarea.selectionStart;
	
				// Insert 4 white spaces at the cursor position
				let newValue = textarea.value.substring(0, cursorPosition) + "    " +
					textarea.value.substring(cursorPosition);
	
				// Update the textarea value and cursor position
				textarea.value = newValue;
				textarea.selectionStart = textarea.selectionEnd = cursorPosition + 4;
	
				// copy the code from textarea to code block      
				updateCode();
				return;
			}
	
			// [Tab] and [Shift] keypress presence
			if (e.key === "Tab" && e.shiftKey &&
	
				// no highlight detected
				textarea.selectionStart == textarea.selectionEnd) {
	
				// suspend default behaviour
				e.preventDefault();
	
				// Get the current cursor position
				let cursorPosition = textarea.selectionStart;
	
				// Check the previous characters for spaces
				let leadingSpaces = 0;
				for (let i = 0; i < 4; i++) {
					if (textarea.value[cursorPosition - i - 1] === " ") {
						leadingSpaces++;
					} else {
						break;
					}
				}
	
				if (leadingSpaces > 0) {
					// Remove the spaces
					let newValue = textarea.value.substring(0, cursorPosition - leadingSpaces) +
						textarea.value.substring(cursorPosition);
	
					// Update the textarea value and cursor position
					textarea.value = newValue;
					textarea.selectionStart = textarea.selectionEnd = cursorPosition - leadingSpaces;
				}
	
				// copy the code from textarea to code block
				updateCode();
				return;
			}
	
			// [Tab] key pressed and range selection detected
			if (e.key == 'Tab' & textarea.selectionStart != textarea.selectionEnd) {
				e.preventDefault();
	
				// split the textarea content into lines
				let lines = textarea.value.split('\n');
	
				// find the start/end lines
				let startPos = textarea.value.substring(0, textarea.selectionStart).split('\n').length - 1;
				let endPos = textarea.value.substring(0, textarea.selectionEnd).split('\n').length - 1;
	
				// calculating total removed white spaces
				// these values will be used for adjusting new cursor position
				let spacesRemovedFirstLine = 0;
				let spacesRemoved = 0;
	
				// [Shift] key was pressed (this means we're un-indenting)
				if (e.shiftKey) {
	
					// iterate over all lines
					for (let i = startPos; i <= endPos; i++) {
	
						// /^ = from the start of the line,
						// {1,4} = remove in between 1 to 4 white spaces that may existed
						lines[i] = lines[i].replace(/^ {1,4}/, function (match) {
	
							// "match" is a string (white space) extracted
	
							// obtaining total white spaces removed
	
							// total white space removed at first line
							if (i == startPos)
								spacesRemovedFirstLine = match.length;
	
							// total white space removed overall
							spacesRemoved += match.length;
	
							return '';
						});
					}
				}
	
				// no shift key, so we're indenting
				else {
					// iterate over all lines
					for (let i = startPos; i <= endPos; i++) {
						// add a tab to the start of the line
						lines[i] = '    ' + lines[i]; // four spaces
					}
				}
	
				// remember the cursor position
				let start = textarea.selectionStart;
				let end = textarea.selectionEnd;
	
				// put the modified lines back into the textarea
				textarea.value = lines.join('\n');
	
				// adjust the position of cursor start selection
				textarea.selectionStart = e.shiftKey ?
					start - spacesRemovedFirstLine : start + 4;
	
				// adjust the position of cursor end selection
				textarea.selectionEnd = e.shiftKey ?
					end - spacesRemoved : end + 4 * (endPos - startPos + 1);
	
				// copy the code from textarea to code block      
				updateCode();
				return;
			}
      
	
			// [Shift] + [Del]/[Backspace] = Delete entire line(s)
			if (e.shiftKey && (e.key === "Delete" || e.key === "Backspace")) {
	
				e.preventDefault();
	
				// find the start/end lines
				let startPos = textarea.value.substring(0, textarea.selectionStart).split('\n').length - 1;
				let endPos = textarea.value.substring(0, textarea.selectionEnd).split('\n').length - 1;
	
				// get the line and the position in that line where the cursor is
				// pop() = take out the last line (which is the cursor selection start located)
				let cursorLine = textarea.value.substring(0, textarea.selectionStart).split('\n').pop();
	
				// get the position of cursor within the last line
				let cursorPosInLine = cursorLine.length;
	
				// calculating total lines to be removed
				let totalLinesRemove = endPos - startPos + 1;
	
				// split the textarea content into lines
				let lines = textarea.value.split('\n');
	
				// calculate new cursor position
				let newStart = lines.slice(0, startPos).join('\n').length + (startPos > 0 ? 1 : 0);
				// add 1 if startPos > 0 to account for '\n' character
	
				// remove the selected lines
				lines.splice(startPos, totalLinesRemove);
	
				// get the new line where the cursor will be after deleting lines
				// if lines[startPos] is not existed, then the new line will be an empty string
				let newLine = lines[startPos] || '';
	
				// if the new line is shorter than the cursor position, put the cursor at the end of the line
				if (newLine.length < cursorPosInLine) {
					cursorPosInLine = newLine.length;
				}
	
				// adjuct the cursor's position in the line to the new cursor position
				newStart += cursorPosInLine;
	
				// put the modified lines back into the textarea
				textarea.value = lines.join('\n');
	
				// set the new cursor position
				// both cursor selection start and end will be at the same position
				textarea.selectionStart = textarea.selectionEnd = newStart;
	
				// copy the code from textarea to code block      
				updateCode();
	
				return;
			}
	
			// Move cursor to the first non-white space character
			if (e.key === "Home") {
	
				// get the line and the position in that line where the cursor is
				// pop() = take out the last line (which is the cursor selection start located)
				let line = textarea.value.substring(0, textarea.selectionStart).split('\n').pop();
	
				// get the position of cursor within the last line
				let cursorPosInLine = line.length;
	
				// Find the start of the current line
				let lineStartPos = textarea.value.substring(0, textarea.selectionStart).lastIndexOf('\n') + 1;
	
				// Find the first non-whitespace character on the line
				let firstNonWhitespacePos = line.search(/\S/);
	
				// the cursor's position is already in front of first non-whitespace character,
				// or it's position is before first none-whitespace character,
				// move the cursor to the start of line
				if (firstNonWhitespacePos >= cursorPosInLine) {
					// do nothing, perform default behaviour, which is moving the cursor to beginning of the line
					return true;
				}
				// If there's no non-whitespace character, this is an empty or whitespace-only line
				else if (firstNonWhitespacePos === -1) {
					// do nothing, perform default behaviour, which is moving the cursor to beginning of the line
					return true;
				}
	
				// Prevent the default Home key behavior
				e.preventDefault();
	
				// Move the cursor to the position of the first non-whitespace character
				setTimeout(function(){textarea.selectionStart = textarea.selectionEnd = lineStartPos + firstNonWhitespacePos}, 0);
				return;
			}
	
	
		});
	
	}
  function initEditor(){
    console.log("dom content loaded");
    const editor = document.getElementById('playground');
    const highlighted = document.getElementById('codeBlock');

    

    editor.addEventListener('input', () => {
      console.log("change playground");
      const code = editor.value;
        highlighted.textContent = code;
        hljs.highlightElement(highlighted);
      });
      
      
      
      editor.value = `
async function callMetaStellar(method, params){

  //You Can Delete this section after offical launch
  const isFlask = ( 
    await window.ethereum?.request({ method: "web3_clientVersion" })
  )?.includes("flask"); 
  if(!isFlask){
    alert("install Metamask Flask")
  }
  // ------------------------------------------------

  if(method === 'connect'){
  //This will also install stellar if the user has metamask
      return await window.ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
          ['npm:stellar-snap']: {}
        },
      });
  }
  const rpcPacket = {
    method: 'wallet_invokeSnap',
    params:{
      snapId:'npm:stellar-snap',
      request: {'method':method, params:params}
    }
  }
  return await window.ethereum.request(rpcPacket);
}


alert((await callMetaStellar('connect'))?'connected':'not connected');

//await callMetaStellar('showAddress');
//await callMetaStellar('fund');
//await callMetaStellar('getBalance', {testnet:true})
`
    highlighted.textContent = editor.value;  
    hljs.highlightElement(highlighted);
    bindCodeEditorShortcutKeys(editor, highlighted);
    }
  if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", initEditor);
  } else {
    // `DOMContentLoaded` has already fired
    initEditor();
  }

  function runPlayground(){
    let editor = document.getElementById('playground');
    console.log(editor.value);
    eval('(async ()=>{'+editor.value+'})()');
  }
  let runPlaygroundButton = document.getElementById('runplaygroundButton');
  runPlaygroundButton.addEventListener('click', runPlayground);

  

  console.log(connectButton)

  async function connectSnap(){
    try{
      console.log("here")
      connected = await callMetaStellar('connect');
      
      
      await fund();
      await alert("💸testnet account funded💸");
      console.log(connected)
      
    }catch(e){
      if (e.toString() === "ReferenceError: ethereum is not defined"){
         alert("Install metamask flask")
      }
      alert(e);
    }
  }
  connectButton.addEventListener('click', async ()=>await connectSnap());

  async function callMetaStellar(method, params){

  //You Can Delete this section after offical launch
  const isFlask = ( 
    await window.ethereum?.request({ method: "web3_clientVersion" })
  )?.includes("flask"); 
  if(!isFlask){
    alert("install Metamask Flask")
  }
  // ------------------------------------------------

  if(method === 'connect'){
  //This will also install stellar if the user has metamask
      return await window.ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
          ['npm:stellar-snap']: {}
        },
      });
  }
  const rpcPacket = {
    method: 'wallet_invokeSnap',
    params:{
      snapId:'npm:stellar-snap',
      request: {'method':method, params:params}
    }
  }
  return await window.ethereum.request(rpcPacket);
}







  function alertObject(obj){
    console.log(obj);
    function stringObj(obj){
      let outputString = '{';
      let keys = Object.keys(obj);
      for(let i = 0; i<keys.length; i++){
        if(typeof obj[keys[i]] === 'object'){
          obj[keys[i]] = JSON.stringify(obj[keys[i]]);
        }
        outputString+=`${keys[i]} : ${obj[keys[i]]},\n`
      }
      outputString+='}';
      return outputString;
    }

    alert(stringObj(obj));
  }

  async function fund(){
      testnetFunded = await callMetaStellar('fund');
      return testnetFunded;
  }

  const getAddress = async function(){
    console.log("here2")
    try{
        console.log("about to run request");
        const request = {
            method: 'wallet_invokeSnap',
            params: 
            
              {
                snapId:'npm:stellar-snap', 
                request:{
                  method: `${'getAddress'}`
                }
              }
            
        }
        
        console.log("request in memory")
        let address = await window.ethereum.request(request);
        console.log("request complete");
        console.log(address)
        // gets the stellar address
        address = await window.ethereum.request({
            method: 'wallet_invokeSnap',
            params: 
              {
                snapId:'npm:stellar-snap', 
                request:{
                    method: 'getAddress',
                }
              }
            
        });
        alert(address);
    }
    catch(e){
      console.log("error");
      console.log(e);
      alert(e);
    }
  }
  let execButton = window.document.getElementById("execAddressButton");
  console.log(execButton);
  execButton.addEventListener('click', getDataPacket);
  



  //methods 

  //'getAccountInfo'

  //fund

  //displayAddress
  //importAccount
  //exportAccount
  //transfer
  let sendXLMButton = document.getElementById('sendXLMButton');
  async function sendXLM(){
    
    console.log("connected is");
    console.log(connected);
    if(!connected){
      connected = await callMetaStellar('connect');
    }
    if(!testnetFunded){
      testnetFunded = await callMetaStellar('fund', {testnet:true})
    }
    const recipentAddress = await prompt("to (stellar Address): ");
    let balance = await callMetaStellar('getBalance', {testnet:true})
    console.log(`balance: ${balance}`);
    let amount = NaN;
    while(true){
      amount = Number(await prompt(`amount of xlm to send?\nyou have ${balance}`));
      console.log(amount);
      if(amount){
        break
      }
      if(amount === 0){
        return
      }
      else{
        alert(`${amount} is not a number`);
      }
    }
    amount = String(amount);
    
    const result = await callMetaStellar('transfer', {to:recipentAddress, amount:amount, testnet:true});
    console.log(result);

  }
  sendXLMButton.addEventListener('click', sendXLM);

  //listAccounts
  //showAddress
  let showAddressButton = document.getElementById('showAddressbtn')
  showAddressButton.addEventListener('click', ()=>callMetaStellar('showAddress'))


  let getDataPacketbtn = document.getElementById('getDataPacketbtn');

  async function getDataPacket(){
    let dataPacket = await callMetaStellar('getDataPacket');
    console.log(dataPacket);
    alertObject(dataPacket);
  }
  getDataPacketbtn.addEventListener('click', getDataPacket);

  let getAccountInfobtn = document.getElementById('getAccountInfobtn');
  async function getAccountInfo(){
   let result = await callMetaStellar('getAccountInfo', {testnet:true});
   alertObject(result);
  }
  getAccountInfobtn.addEventListener('click', getAccountInfo);
  

  const getBalancebtn = document.getElementById('getBalanceButton');
  getBalancebtn.addEventListener('click', async ()=>alert(`${await callMetaStellar('getBalance', {testnet:true})} testnet xlm`))

  const createAccountButton = document.getElementById('createAccountButton');
  async function createAccount(){
    let name = await prompt("account name");
    result = await callMetaStellar('createAccount', {name:name});
    console.log(result);
    alert(result);
  }

  createAccountButton.addEventListener('click', createAccount)











</script>
# Metastellar.io
<hr/>
<!-- Textarea, the code editor -->

  <!-- Textarea, the code editor -->
<div class="spacer"></div>
  <h1 style="font-size: 48pt;">Add <b style="color: orange;">Metamask</b><br/> to your 🪐stellar<b style="font-weight: 200;">/soroban</b> application</h1>
  <h2 style="margin-left:12pt;"><b style="font-weight: 200;">In one step</b> - copy📑 <b style="color:#00ff00; background-color:black;">callMetaStellar</b>(method, params)</h1>
  <p>also install <a href="https://docs.metamask.io/snaps/get-started/install-flask">metamask flask</a> (until offical launch)</p>
  
  <div id="divCodeWrapper">
      <pre v-pre id="preCode"><code id="codeBlock"  class="language-js"></code></pre>
      <textarea id="playground" wrap="soft" spellcheck="false">

  </textarea>
  </div>

  <button id="runplaygroundButton">Run💡</button>
  <div class="spacer"></div>
  <div class="spacer"></div>
  <div class="spacer"></div>
  <div class="spacer"></div>
  <!-- End of the code editor -->

<!-- End of the code editor -->


The metastellar.io team manages and maintains the stellar wallet plugin for metamask. If implemented correctly, <b>the end user should be aware they are using the stellar chain, but the experence should never
feel like they are using a 'plug-in'</b> hince the term <b>snap</b>.

The <b>metastellar snap</b> is a piece of code that lives inside the metamask wallet, and is automatically installed when requested by a web app.
Connecting to the Stellar network using the snap is covered in <a href="https://metastellar.io/docs/#/?id=%e2%9c%a8connect-and-install">✨connect and install</a> portion of the docs.

After the user installs the snap, a stellar wallet automatically created for them.
This wallet can be accessed, using the standard metamask rpc api. This means that if you have experence developing with metamask in ethereum this shouldn't be too different. (sadly, no ~~web3.js~~ stellar3.js yet 🤞).

As a developer basic idea, is you shouldn't have to focus on OUR wallet, you should focus on YOUR app.
Ideally the flow would be.

[connect Metamask] -> [<a href="https://github.com/stellar/js-stellar-sdk">create Stellar TXN</a>] -> [call <a href="https://metastellar.io/docs/#/?id=_39signtransaction39">signTxn</a>] -> [<a href="https://github.com/stellar/js-stellar-sdk">submit signed txn</a>] ✅ 

#### happy hacking

<span class="spacer"></span>
<hr>

# Quick Start
<span class="spacer"></span>
  <ol>
  <li>There is <b>NO npm package required!</b></li>
  <li>The only thing required is that the users computer has metamask flask<br/>(just normal metamask after launch)</li>
  <li><a href="https://docs.metamask.io/snaps/get-started/install-flask/">install flask</a></li>
  </ol>
<span class="spacer"></span>

  ## ✨ Connect and install
  The <b>wallet_requestSnaps</b> method is used to <b>connect</b> to MetaMask <b>and installs</b> the Stellar Wallet if it's not already installed. This also generates the user's wallet.
  ```typescript
  
  /* //request connection */
  async function connect(){
    const connected = await window.ethereum.request({
      method: 'wallet_requestSnaps',
      params: {
        [`npm:stellar-snap`]: {}
      },
    });
  }
  
  ```
<button id="connectButton">exec connect()</button>

<br>

<span class="spacer"></span>

  ## ✨ Calling Stellar Methods
  After the snap is connected the <b>wallet_invokeSnap</b> method is used to call Stellar Methods

  ### 🟠 get wallet data
```typescript 
  
      //invoke a stellar method without callMetaStellar()
      
      const request = {
          method: 'wallet_invokeSnap',
          params: {snapId:`npm:stellar-snap`, 
            request:{
              method: `${'getDataPacket'}`
            }
          }
      }
      let address = (await window.ethereum.request(request)).currentAddress;
  
  
      // retreives the stellar walletData
      const walletData = await window.ethereum.request({
          method: 'wallet_invokeSnap',
          params: {snapId:`npm:stellar-snap`, request:{
              method: `getDataPacket`,
          }}
      })
    
  ```
  
  <button id="execAddressButton">retreve standard wallet INFO!</button>
  <a href="/?id=_39getdatapacket39">getDataPacket method</a>
  <span class="spacer"></span>

  ### 🌐 Specify a Network

  by default all methods are treated as mainnet, but any method can be issued to the testnet
  by using the testnet param. The testnet parameter can be used with all methods. If it dosn't make
  since for a certain method it is simply ignored silently.

  example:
  ```typescript
      const result = await window.ethereum.request({
          method: 'wallet_invokeSnap',
          params: {snapId:`npm:stellar-snap`, request:{
              method: `getBalance`,
              params:{
                testnet: true
              }
          }}
      })
  ```

  ### 🔏 easily Signing a Transaction

  use with the <a href="https://github.com/stellar/js-stellar-sdk" target="_blank">Stellar-js-sdk</a>
  
  ```typescript 
        //invoke a stellar method with callMetaStellar

  let stellarTransactionXDR:string = endTransaction.build().toXDR();
  
  let signedTxnXDR:Promise<string> = callMetaStellar('signTransaction', {transaction : stellarTransactionXDR, testnet:true});
  ```
  
  


<span class="spacer"></span>




<div class='spacer'></div>
<div class='spacer'></div>
<div class='spacer'></div>
<div class='spacer'></div>

# Calling Stellar RPC Methods

The easiest way to interact with the wallet is by coping the metastellar function



## 📎  copy the callMetaStellar Function
```javascript 
async function callMetaStellar(method, params){

  //You Can Delete this section after offical launch
  const isFlask = ( 
    await window.ethereum?.request({ method: "web3_clientVersion" })
  )?.includes("flask"); 
  if(!isFlask){
    alert("install Metamask Flask")
  }
  // ------------------------------------------------

  if(method === 'connect'){
  //This will also install stellar if the user has metamask
      return await window.ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
          ['npm:stellar-snap']: {}
        },
      });
  }
  const rpcPacket = {
    method: 'wallet_invokeSnap',
    params:{
      snapId:'npm:stellar-snap',
      request: {'method':method, params:params}
    }
  }
  return await window.ethereum.request(rpcPacket);
}
```
invoke the callMetaStellar function

```typescript
//connect:
const connected:boolean = await callMetaStellar('connect');
//getAddress:
const address:string = await callMetaStellar('getAddress'); 
//signTransaction:
interface signTxnParams{
  transaction:string //StellarSDK.TransactionXDR as String)
  testnet:boolean
}
let params = {transaction:txn, testnet:true}
const signedTxn:string = await callMetaStellar('signTransaction', params)
//returns a signed stellar transaction in XDR as a string
```

<div class='spacer'></div>
<div class='spacer'></div>
<div class='spacer'></div>
<div class='spacer'></div>

## 'getAddress'
returns the accounts address as a string
```typescript
    const address = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {snapId:`npm:stellar-snap`, request:{
            method: `getAddress`,
        }}
    })
```

## 'getAccountInfo'
grabs infomation related to the account
requires account to be funded
```typescript
    const info = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {snapId:`npm:stellar-snap`, request:{
            method: `getAccountInfo`,
            params:{
                testnet?: true | false
            }
        }}
    })
```

<button id="getAccountInfobtn">getAccountInfo</button>


## 'getBalance'
gets the XLM balance of a wallet, returns 0 in unfunded wallets

```typescript
    const balance = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {snapId:`npm:stellar-snap`, request:{
            method: `getBalance`,
            params:{
                testnet?: true | false
            }
        }}
    })
```

<button id="getBalanceButton">getBalance</button>

## 'transfer'
this method is used to transfer xlm and requires a funded account.
after being called the wallet will generate a transaction, then prompt a user to accept
if the user accepts the transaction it will be signed and broadcast to the network.
will return transaction infomation. And send a notification stating whether the transaction was
successful.

returns: StellarSDK.TransactionResult
```typescript
const transactionInfomation = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {snapId:`npm:stellar-snap`, request:{
            method: `getBalance`,
            params:{
                to: 'stellarAddress' //string
                amount: '1000.45' //string represention of amount xlm to send
                testnet?: true | false
            }
        }}
    })

```

<button id="sendXLMButton">send xlm</button>

## 'fund'
this method funds the users wallet on the testnet,
```typescript
const success = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {snapId:`npm:stellar-snap`, 
        request:{
            method: 'fund'
        }
    }
    })
```

## 'signTransaction'
This method signs an Arbitary Transaction
```typescript
    async function signTransaction(){
      const transaction = new StellarSdk.TransactionBuilder(account, { fee, networkPassphrase: "Test SDF Network ; September 2015" });
      // Add a payment operation to the transaction
      console.log("transaction builder initilazed");
      await transaction.addOperation(StellarSdk.Operation.payment({
        destination: receiverPublicKey,
        // The term native asset refers to lumens
        asset: StellarSdk.Asset.native(),
        // Specify 350.1234567 lumens. Lumens are divisible to seven digits past
        // the decimal. They are represented in JS Stellar SDK in string format
        // to avoid errors from the use of the JavaScript Number data structure.
        amount: '350.1234567',
      }));
      console.log("operations added")
      // Make this transaction valid for the next 30 seconds only
      await transaction.setTimeout(30);
      console.log("timeout set");
      // Uncomment to add a memo (https://www.stellar.org/developers/learn/concepts/transactions.html)
      // .addMemo(StellarSdk.Memo.text('Hello world!'))
      const endTransaction = await transaction.build();
      const xdrTransaction = endTransaction.toXDR();
      console.log(xdrTransaction);
      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params:{snapId:snapId, request:{
          method: 'signTransaction',
          params:{
            transaction: xdrTransaction,
            testnet: testnet
          }
        }}
      })
      console.log(response);
    }
```

## signAndSubmitTransaction
      if(!wallet_funded){
        await Screens.RequiresFundedWallet(request.method, wallet.address);
      }
      return await operations.signAndSubmitTransaction(params.transaction);


## 'getDataPacket'

retreves wallet info about the user, including names, addressess, and balances

returns <a href="/#/?id=datapacket">DataPacket</a>

```typescript
    const walletInfo: DataPacket = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {`npm:stellar-snap`, request:{
            method: `getDataPacket`,
        }}
    })
```
<button id="getDataPacketbtn">get data packet</button>

## setCurrentAccount

changes the connected account

```typescript
  interface setCurrentAccountParams :{ 
    address:string
  }
  const switchAccountParams:setCurrentAccountParams = {
    address:`${WalletAddress}`
  }
  const result = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {`npm:stellar-snap`, 
      request:{
        method: switchAccountParams,
        params
      }
    }
  })
```

## showAddress

displays the stellar address and a qr code in the extension

returns: boolean
```typescript
    const result = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {`npm:stellar-snap`, 
          request:{
              method: `showAddress`,
          }
        }
    })
```
<button id="showAddressbtn">Show Address</button>

## 'createAccount'

creates a new Account on the wallet

parameters:
{name:<i>string</i>}

returns:
<i>bool</i>

```typescript
    interface createAccountParams{
      name: string
    }

    const createAccountResult = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {`npm:stellar-snap`, 
        request: {
            method: `createAccount`,
            params: {
              name: `${"Account-name"}`
            }
        }}
    })
    
```
<button id="createAccountButton">CreateAccount</button>

## listAccounts

  returns a list of all stellar accounts in the wallet

  ```typescript
    const accountList = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {`npm:stellar-snap`, 
        request: {
            method: `listAccounts`,
        }}
    })
  ```

## renameAccount

  selects an account by address and changes its name

  ```typescript

    const result = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {`npm:stellar-snap`, 
        request:{
            method: `renameAccount`,
            params:{
              address: `${accountAddress}`,
              name: `${"New-Account-Name"}`
            }
        }}
    })
  ```

## importAccount

  opens a dialog where the user is prompted to import their private key, if they choose

  throws on error

  ```typescript
    const success:boolean = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
        snapId:`npm:stellar-snap`, 
        request:{
            method: "importAccount",
        }}
    })
  ```



## getAssets

gets all assets for the current Wallet

returns <a href="#/?id=wallet-asset">walletAsset[]</a>

```typescript
  const assets: walletAsset[] = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
    snapId:`npm:stellar-snap`, 
    request:{
        method: `getAssets`,
        params:{
          testnet: true
        }
    }}
})
```

## sendAuthRequest

sendAuthRequest is used to sign-in with 

```typescript
    const result = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {`npm:stellar-snap`, request:{
            method: `sendAuthRequest`,
            params:{
              url: `${endpoint}`,
              data: Object(postData),
              challenge: `${toBeSigned}`
            }
        }}
    })
```

## signStr
      const auth = new Auth(wallet.keyPair);
      return await auth.signData(params.challenge);

## dispPrivateKey
      return await Screens.revealPrivateKey(wallet);
    // -------------------------------- Methods That Require a funded Account ------------------------------------------

## sendAsset
      if(!wallet_funded){
        await Screens.RequiresFundedWallet(request.method, wallet.address);
        throw new Error('Method Requires Account to be funded');
      }
      return await operations.transferAsset(params.to, params.amount, params.asset);



## createFederationAccount
      return await Screens.setUpFedAccount(wallet);


## 'Soroban'
The Wallet also supports sorroban, To sign a SorobanCall
futurenet must be set to true on the params object.
```javascript
    async function callContract() {
      console.log("here in callContract");
  const sourcePublicKey = await window.ethereum.request({
          method: 'wallet_invokeSnap',
          params: {snapId:snapId, request:{
            method: 'getAddress',
          }}
      })
  const server = new SorobanClient.Server('https://rpc-futurenet.stellar.org');

  console.log("getting account")
  const account = await server.getAccount(sourcePublicKey);
  console.log("account is: ")
  console.log(account);

  console.log(SorobanClient);

  const contract = new SorobanClient.Contract("CCNLUNUY66TU4MB6JK4Y4EHVQTAO6KDWXDUSASQD2BBURMQT22H2CQU7")
  console.log(contract)
  const arg = SorobanClient.nativeToScVal("world")
  console.log("arg is: ")
  console.log(arg)
  let call_operation = contract.call('hello', arg);
  console.log(call_operation)

  let transaction = new SorobanClient.TransactionBuilder(account, { fee: "150", networkPassphrase: SorobanClient.Networks.FUTURENET })
    .addOperation(call_operation) // <- funds and creates destinationA
    .setTimeout(30)
    .build();

  console.log(transaction)


    const preparedTransaction = await server.prepareTransaction(transaction, SorobanClient.Networks.FUTURENET);
    console.log("prepairedTxn: ");
    console.log(preparedTransaction);
    const tx_XDR = preparedTransaction.toXDR();
    const signedXDR = await window.ethereum.request(
      {method: 'wallet_invokeSnap',
          params: {
            snapId:snapId, 
            request:{
              method: 'signTransaction',
              params:{
                transaction: tx_XDR,
                futurenet: true
              }
            }
          }
      }
    )
  console.log(signedXDR)
  try{
    
    const transactionResult = await server.sendTransaction(signedXDR);
    console.log(JSON.stringify(transactionResult, null, 2));
    console.log('\nSuccess! View the transaction at: ');
    console.log(transactionResult)
  } catch (e) {
    console.log('An error has occured:');
    console.log(e);
  }
}



```

# types

## DataPacket
An interface that contains infomation about the wallet
```typescript

export interface DataPacket{
    name: string, //comment
    currentAddress: string,
    mainnetAssets?: walletAsset[],
    testnetAssets?: walletAsset[],
    accounts: Array<{name:String, address:String}>
    mainnetXLMBalance: string,
    testnetXLMBalance: string,
    fedName: string | null
}

```

## Wallet Asset

a type that represents a the balance of asset held by a wallet
```typescript

export type walletAsset = AssetBalance | NativeBalance

```

## NativeBalance

```typescript
export interface NativeBalance {
    balance:string,
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
```

## AssetBalance

```typescript
export interface AssetBalance {
    balance: string, //number
    liquidity_pool_id?: string, //number
    limit: string, //number
    buying_liabilites: string, //number
    selling_liabilites: string, //number
    sponser?: string, //address
    last_modified_ledger: number,
    is_authorized: boolean,
    is_authorized_to_maintain_liabilites: boolean,
    is_clawback_enabled: boolean,
    asset_type: "credit_alphanum4"|"credit_alphanum12"
    asset_code: string,
    asset_issuer: string, //address
}

```


## building from Source

```shell
foo@bar:~$ yarn
...

foo@bar:~$ npx mm-snap build

...
Build success: 'src\index.ts' bundled as 'dist\bundle.js'!
Eval Success: evaluated 'dist\bundle.js' in SES!

foo@bar:npx mm-snap serve

Starting server...
Server listening on: http://localhost:8080
```
and just like that you should be good to go.

## Key Generation and Storeage
keys are generated on the fly, anytime a method is invoked.
This works by requesting private entropy from the metamask wallet inside
of the snaps secure execution enviroment, and using that entropy to generate
a users keys. This entropy is static, and based on the users ethereum account.
This means that we at no point store keys, and the fissile material is handled
by metamask.

## Account Recovery
Because keys are handled in this way, when a user recovers their metamask account, they will also recover their stellar
account, which means that there isn't another mnemonic to save. 

