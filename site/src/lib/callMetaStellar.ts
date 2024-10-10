export const env = import.meta.env

declare global {
  interface Window {
    ethereum: any;
  }
}
const snapId = (env.DEV?"local:http://localhost:8080":'npm:stellar-snap')
export async function callMetaStellar(method:string, params:any){
    if (typeof window !== 'undefined' && typeof window.ethereum !== undefined) {
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
            [snapId]: {}
          },
        });
    }
    const rpcPacket = {
      method: 'wallet_invokeSnap',
      params:{
        snapId: snapId,
        request: {'method':method, params:params}
      }
    }
    return await window.ethereum.request(rpcPacket);
    }
}
  