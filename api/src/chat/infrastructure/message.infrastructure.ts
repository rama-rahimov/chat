import {Injectable} from "@nestjs/common";
import {MessageRepository} from "../domain/message.interface";
import {DatabaseService} from "../../../database/database.service";

@Injectable()
export class MessageInfrastructure implements MessageRepository {
    constructor(private readonly database: DatabaseService) {}
    async findBySenderAndChat(senderId:number, chatId:number): Promise<any> {
        return this.database.message.findMany({
            where: { senderId, chatId }
        });
    }

    async save(obj: any) {
       await this.database.message.create({data:obj});
    }

    async findByUsesIds(user1Id:number, user2Id:number):Promise<any> {
      return this.database.chat.findFirst({
          where: {
              OR: [
                  { user1Id, user2Id },
                  { user1Id: user2Id, user2Id: user1Id },
              ]
          },
          select:{
              Message:{
                  select:{
                      senderId:true,
                      text:true
                  }
              }
          }
      })
    }
}