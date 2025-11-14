import {Injectable} from "@nestjs/common";
import {ChatUseCase} from "./application/chat.use-case";
import {ChatMessageDto} from "./dto/chat-message.dto";

@Injectable()
export class ChatService {
constructor(private readonly chatUseCase: ChatUseCase ) {}
  async saveChatUseCase(obj: ChatMessageDto, userId:number) {
   await this.chatUseCase.saveMessage(obj, userId)
  }

  async allChatMessagesOfChat(user1Id:number, user2Id:number) {
    return this.chatUseCase.allMessagesOfChats(user1Id,user2Id)
  }
}