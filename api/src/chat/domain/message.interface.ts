export interface MessageRepository {
    findBySenderAndChat(senderId:number, chatId:number):Promise<any>;
    save(obj:any):Promise<void>;
    findByUsesIds(user1Id:number,user2Id:number):Promise<any>;
}