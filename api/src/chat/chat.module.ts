import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import {ChatService} from "./chat.service";
import {ChatUseCase} from "./application/chat.use-case";
import {DatabaseModule} from "../../database/database.module";
import {ChatInfrastructure} from "./infrastructure/chat.infrastructure";
import {MessageInfrastructure} from "./infrastructure/message.infrastructure";
import {ChatController} from "./chat.controller";
import {AuthMiddleware} from "../common/middleware/auth.middleware";
import {UserInfrastructure} from "../domain/infrastructure/user.infrastructure";
import {ConversationMemberInfrastructure} from "./infrastructure/conversationMember.infrastructure";
import {ConversationInfrastructure} from "./infrastructure/conversation.infrastructure";
import {LlamaModule} from "../Llama/Llama.module";
import {LlamaInfrastructure} from "../Llama/infrastructure/Llama.infrastructure";

@Module({
    imports:[DatabaseModule, LlamaModule],
    controllers:[ChatController],
    providers: [DatabaseModule, ChatGateway,
        ChatService, ChatUseCase,{
            provide:"LlamaRepository",
            useClass:LlamaInfrastructure,
        },
        {
            provide: "ChatRepository",
            useClass: ChatInfrastructure
        },{
            provide: "MessageRepository",
            useClass: MessageInfrastructure
        },{
            provide:"IUserRepository",
            useClass: UserInfrastructure
        },{
            provide:"ConversationMemberRepository",
            useClass:ConversationMemberInfrastructure
        },{
            provide:"ConversationRepository",
            useClass:ConversationInfrastructure
        }]
})
export class ChatModule implements NestModule{
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(AuthMiddleware).forRoutes(ChatController)
    }
}