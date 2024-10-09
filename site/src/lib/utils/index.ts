import type { AlertType } from "$lib/types";
import { Toaster, toast } from "svelte-sonner";
import Swal from "sweetalert2";
import { dataPacket, isTestnet, connected } from "$lib/wallet-store";
import type { DataPacket } from "$lib/wallet-store";


type SonnerToastProps = {
  type: string;
  desc: string;
};
export const Toast = ({ type, desc }: SonnerToastProps) => {
  switch (type) {
    case "success":
      toast.success(desc);
      break;
    case "info":
      toast.info(desc);
      break;
    case "warning":
      toast.warning(desc);
      break;
    case "error":
      toast.error(desc);
      break;
  }
};

type AlertProps = {
  type: AlertType;
  desc: string;
  successText: string;
  errText: string;
  callback: () => void;
};

export const Alert = ({
  type,
  desc,
  successText,
  errText,
  callback,
}: AlertProps) => {
  Swal.fire({
    title: "Are you sure?",
    text: desc,
    icon: type,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.value) {
      // Swal.fire("Confirmed!", successText, "success");
      callback();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", errText, "error");
    }
  });
};


export async function updateWalletData(){
  let newDatapacket:DataPacket = await callMetaStellar('getDataPacket', {});
  dataPacket.set(newDatapacket);
}

export async function getWalletData():Promise<DataPacket>{
  return await callMetaStellar('getDataPacket', {});
}

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
}



export const assetType = (asset: any) => {
  if (asset.asset_code !== "XLM" && asset.limit === "0.0000001") {
    return "nft";
  } else if (asset.asset_code !== "XLM" && asset.limit !== "0.0000001") {
    return "token";
  } else {
    return "";
  }
};
