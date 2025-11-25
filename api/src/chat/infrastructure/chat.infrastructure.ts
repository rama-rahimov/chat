import {Injectable} from "@nestjs/common";
import {ChatRepository} from "../domain/chat.interface";
import {DatabaseService} from "../../../database/database.service";

@Injectable()
export class ChatInfrastructure implements ChatRepository{
    constructor(private readonly database: DatabaseService) {}
   async findByIds(user1Id: number, user2Id: number, type:string): Promise<any> {

   }
   async save(obj: {user1Id:number, user2Id:number}):Promise<any> {

   }
}