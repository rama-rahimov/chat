export interface MessageRepository {
    findBySenderAndChat(senderId:number, chatId:number):Promise<any>;
    save(obj:any):Promise<void>;
    findByUsesIds(userId:number,user2Id:number,conversationId:number):Promise<any>;
}