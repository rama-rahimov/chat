import {Injectable} from "@nestjs/common";
import {ConversationMemberRepository} from "../domain/conversationMembers.interface";
import {DatabaseService} from "../../../database/database.service";

@Injectable()
export class ConversationMemberInfrastructure implements ConversationMemberRepository {
    constructor(private readonly dataBase: DatabaseService) {}
   async save(arrObj: any, id:number): Promise<any> {
      await this.dataBase.conversationMembers.createMany({data:arrObj.map(elem => ({userId: elem, conversationId: id}))});
   }
   async findByConversationId(user1Id:number, user2Id:number, conversationId:number): Promise<any> {
    return (await this.dataBase.conversationMembers.findMany({
         where:{
             conversationId,
             OR:[
                 {userId: user1Id},
                 {userId: user2Id}
             ]
         }
     })).length === 2 ;
   }
   async findByIds(user1Id: number, user2Id: number, type:string): Promise<any> {
       console.log({ user1Id, user2Id });
        const conversation = await this.dataBase.conversationMembers.findMany({
            select:{
                conversationId:true
            },
            where:{
                userId:user1Id,
                conversation:{
                    type
                }
            }
        });
        if (!conversation) {
            return null;
        }
        return ((await this.dataBase.conversationMembers.findFirst({
            select: {
                conversationId:true
            },
            where:{
                userId:user2Id,
                conversationId:{
                    in:conversation.map(elem=> elem.conversationId)
                }
            }
        })) || {}).conversationId ;
   }
}