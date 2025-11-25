import {Inject, Injectable} from "@nestjs/common";
import type {ChatRepository} from "../domain/chat.interface";
import type {MessageRepository} from "../domain/message.interface";
import type {ConversationMemberRepository} from "../domain/conversationMembers.interface";
import type {ConversationRepository} from "../domain/conversation.interface";
import type {BotRepository} from "../domain/bot.interface";

@Injectable()
export class ChatUseCase {
    constructor(@Inject("BotRepository") private readonly IBotRepository: BotRepository,
    @Inject("MessageRepository") private readonly IMessageRepository: MessageRepository,
    @Inject("ConversationRepository") private readonly IConversationRepository: ConversationRepository,
    @Inject("ConversationMemberRepository") private readonly IConvMemberRepository: ConversationMemberRepository) {}
    async saveMessage(obj, userId:number) {
        let chat:boolean = await this.IConvMemberRepository.findByConversationId(userId, obj.toUserId, obj.roomId);
        if (!chat) {
            await this.IConvMemberRepository.save([userId, obj.toUserId], obj.roomId);
        }
        await this.IMessageRepository.save({ conversationId: obj.roomId, text: obj.message, senderId: userId });
        let content = "";
        if(obj.isBot){
             content = await this.IBotRepository.answer(obj.message);
            await this.IMessageRepository.save({ conversationId: obj.roomId, text:content, senderId: obj.toUserId })
        }
        return content;
    }

    async allMessagesOfChats(userId:number, user2Id: number) {
        const type = 'private';
        let chat = await this.IConvMemberRepository.findByIds(userId, user2Id, type);
       if (!chat) {
           chat = await this.IConversationRepository.save({ type });
           return { messages: [], roomId: chat.id }
       }
       return await this.IMessageRepository.findByUsesIds(userId, user2Id, chat);
    }
}