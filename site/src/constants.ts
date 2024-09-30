
const isDev = import.meta.env.DEV
let snapId = "npm:stellar-snap"
if(isDev){
    snapId = "local:http://localhost:8080/"
}

module.exports = {snapId};