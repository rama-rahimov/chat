import {Injectable} from "@nestjs/common";
import {ConversationRepository} from "../domain/conversation.interface";
import {DatabaseService} from "../../../database/database.service";

@Injectable()
export class ConversationInfrastructure implements ConversationRepository{
    constructor(private readonly dataBase:DatabaseService) {}
    async save(obj):Promise<any>{
    return (await this.dataBase.conversations.create({data:obj}));
    }
}