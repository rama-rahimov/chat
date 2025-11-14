import {Inject, Injectable} from "@nestjs/common";
import type {ChatRepository} from "../domain/chat.interface";
import type {MessageRepository} from "../domain/message.interface";

@Injectable()
export class ChatUseCase {
    constructor(@Inject("ChatRepository") private readonly IChatRepository: ChatRepository,
    @Inject("MessageRepository") private readonly IMessageRepository: MessageRepository) {}
    async saveMessage(obj, userId:number) {
        console.log({obj, userId});
        let chat = await this.IChatRepository.findByIds(userId, obj.id);
        if (!chat) {
          chat = await this.IChatRepository.save({user1Id: userId, user2Id: obj.id});
        }
        await this.IMessageRepository.save({chatId: chat.id, text: obj.message, senderId: userId});
    }

    async allMessagesOfChats(user1Id:number,user2Id:number) {
       const messages = await this.IMessageRepository.findByUsesIds(user1Id, user2Id);
       if (!messages) {
           return [];
       }else {
           return messages;
       }
    }
}