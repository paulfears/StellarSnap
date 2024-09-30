
const isDev = import.meta.env.DEV
let snap_Id = "npm:stellar-snap"
if(isDev){
    snap_Id = "local:http://localhost:8080/"
}
export const snapId = snap_Id;