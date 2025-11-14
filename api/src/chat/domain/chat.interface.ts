import {ChatDto} from "../dto/chat.dto";

export interface ChatRepository{
    findByIds(user1Id:number, user2Id:number):Promise<any>;
    save(obj:{user1Id:number, user2Id:number}):Promise<ChatDto>;
}