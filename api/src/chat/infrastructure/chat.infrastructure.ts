import {Injectable} from "@nestjs/common";
import {ChatRepository} from "../domain/chat.interface";
import {DatabaseService} from "../../../database/database.service";

@Injectable()
export class ChatInfrastructure implements ChatRepository{
    constructor(private readonly database: DatabaseService) {}
   async findByIds(user1Id: number, user2Id: number): Promise<any> {
      return  this.database.chat.findFirst({where: {OR:[
          {user1Id, user2Id},
          {user1Id:user2Id, user2Id:user1Id}
      ]}});
   }
   async save(obj: {user1Id:number, user2Id:number}):Promise<any> {
    return this.database.chat.create({data:obj});
   }
}