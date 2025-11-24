export interface ConversationMemberRepository {
    save(obj:any, id:number):Promise<any>;
    findByIds(user1Id:number,user2Id:number, type:string):Promise<any>;
    findByConversationId(user1Id:number, user2Id:number, conversationId:number):Promise<boolean>;
}