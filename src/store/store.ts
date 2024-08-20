import { Injectable } from "@nestjs/common";

@Injectable()
export class Store {
    constructor(){
        console.log('store initialized');
        
    }
    private store = []

    addUser(user) {
        this.store.push(user)
    }

    getUser(id:number) {
        return this.store.find((u)=>u.id === id)
    }

}