class Account{
    address:string;
    signedIn:boolean;
    messages:any;
    account:any;
    constructor(address:string){
        this.address = address;
        this.signedIn = false;
        this.messages = [];
        this.account = {};
    }
    async signIn(){

    };

    async loadMessages(){

    };

    async updateMessages(){

    };

    async sendMessage(message:string){

    };

    async updateAccount(){

    }

}