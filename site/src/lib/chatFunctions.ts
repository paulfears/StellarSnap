class chatFunctions{
    address:string;
    signedIn:boolean;
    constructor(address:string){
        this.address = address;
        this.signedIn = false;
    }
    async loadUserData(){

    }
    getMessages(){
        return null;
    }
    sendMessage(message:string){
        return null;
    }
}