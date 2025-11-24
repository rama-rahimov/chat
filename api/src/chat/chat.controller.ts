import {Controller, Get, Param, Req} from "@nestjs/common";
import {ChatService} from "./chat.service";

@Controller('api/chat')
export class ChatController {
   constructor(private readonly chatService: ChatService) {}
   @Get(":user2Id")
   async allMessagesOfChat(@Param("user2Id") user2Id: string, @Req() req: Request): Promise<any> {
    return this.chatService.allChatMessagesOfChat((req as any).user.id, +user2Id)
    }
}