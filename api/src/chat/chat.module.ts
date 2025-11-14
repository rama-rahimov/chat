import {MiddlewareConsumer, Module, NestMiddleware, NestModule} from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import {ChatService} from "./chat.service";
import {ChatUseCase} from "./application/chat.use-case";
import {DatabaseModule} from "../../database/database.module";
import {ChatInfrastructure} from "./infrastructure/chat.infrastructure";
import {MessageInfrastructure} from "./infrastructure/message.infrastructure";
import {ChatController} from "./chat.controller";
import {AuthMiddleware} from "../common/middleware/auth.middleware";
import {UserInfrastructure} from "../domain/infrastructure/user.infrastructure";

@Module({
    imports:[DatabaseModule],
    controllers:[ChatController],
    providers: [DatabaseModule, ChatGateway,
        ChatService, ChatUseCase,
        ChatInfrastructure,MessageInfrastructure,
        {
            provide: "ChatRepository",
            useClass: ChatInfrastructure
        },{
            provide: "MessageRepository",
            useClass: MessageInfrastructure
        },{
            provide:"IUserRepository",
            useClass: UserInfrastructure
        }]
})
export class ChatModule implements NestModule{
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(AuthMiddleware).forRoutes(ChatController)
    }
}