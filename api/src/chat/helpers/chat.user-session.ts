import {Injectable} from "@nestjs/common";

@Injectable()
export class ChatUserSession {
    private users = new Map<number, string>();

    set(userId:number, socketId:string){
        this.users.set(userId, socketId);
    }

    get(userId:number){
        return this.users.get(userId);
    }

    delete(userId:number){
        this.users.delete(userId)
    }
}