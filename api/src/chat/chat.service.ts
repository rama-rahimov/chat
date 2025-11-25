import {Injectable} from "@nestjs/common";
import {ChatUseCase} from "./application/chat.use-case";
import {ChatMessageDto} from "./dto/chat-message.dto";

@Injectable()
export class ChatService {
constructor(private readonly chatUseCase: ChatUseCase) {}
  async saveChatUseCase(obj: ChatMessageDto, userId:number) {
  return await this.chatUseCase.saveMessage(obj, userId)
  }

  async allChatMessagesOfChat(userId:number, user2Id:number) {
    return this.chatUseCase.allMessagesOfChats(userId,user2Id)
  }
}