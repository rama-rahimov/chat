import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import {ChatMessageDto} from "./dto/chat-message.dto";
import {ChatService} from "./chat.service";
import {JwtService} from "@nestjs/jwt";
@WebSocketGateway({
    cors: true,
    namespace: 'chat'
})
export class ChatGateway {
    constructor(private readonly chatService: ChatService,
                private readonly jwtService: JwtService) {}
    @WebSocketServer()
    server: Server;

   async handleConnection(client: Socket) {
        try {
            const token = client.handshake.auth.token;
            if(!token) throw new Error("Missing token");
            console.log({ token });
            const payload = await this.jwtService.verifyAsync(token);
            client.data.user = payload;
            console.log('✅ Connected user:', payload.username || payload.id);
        }catch (error) {
            console.error({error});
            client.disconnect();
        }
   }

    @SubscribeMessage('send_message')
    handleEvent(@MessageBody() data: ChatMessageDto,
     @ConnectedSocket() client: Socket) {
      this.chatService.saveChatUseCase(data, client.data.user.id);
      this.server.emit('message', {...data, senderId: client.data.user.id});
    }
}