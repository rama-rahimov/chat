import {Injectable} from "@nestjs/common";
import {MessageRepository} from "../domain/message.interface";
import {DatabaseService} from "../../../database/database.service";

@Injectable()
export class MessageInfrastructure implements MessageRepository {
    constructor(private readonly database: DatabaseService) {}
    async findBySenderAndChat(senderId:number, chatId:number): Promise<any> {
        return this.database.messages.findMany({
            where: { senderId }
        });
    }

    async save(obj: any) {
       await this.database.messages.create({data:obj});
    }

    async findByUsesIds(user1Id:number, user2Id:number, conversationId:number):Promise<any> {
      const messages = await this.database.messages.findMany({
          where: {
          OR:[
              {senderId:user1Id},
              {senderId: user2Id}
          ],
          conversationId:conversationId
          },
          select:{
            text:true,
            senderId:true
          }
      });
      return { messages, roomId:conversationId };
    }
}