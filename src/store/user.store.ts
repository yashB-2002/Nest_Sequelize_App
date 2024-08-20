import { Injectable } from "@nestjs/common";

@Injectable()
export class UserStore {

    constructor(){
        console.log('user store initialized');
        
    }
    private store = []

    addUser(user) {
        this.store.push(user)
    }

    getUser(id:number) {
        return this.store.find((u)=>u.id === id)
    }

}