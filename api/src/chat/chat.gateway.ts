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

   @SubscribeMessage("joinRoom")
   handleJoinRoom(@MessageBody() roomId: number, @ConnectedSocket() client:Socket){
       client.join(String(roomId));
       console.log(`User ${client.data.user.id} joined room ${roomId}`);
   }

    @SubscribeMessage('send_message')
   async handleEvent(@MessageBody() data: ChatMessageDto,
     @ConnectedSocket() client: Socket) {
     this.server.to(String(data.roomId)).emit('message', {...data, senderId: client.data.user.id});
     let content = await this.chatService.saveChatUseCase(data, client.data.user.id);
      if(data.isBot){
          this.server.to(String(data.roomId)).emit('message', {...data, message:content, senderId: data.toUserId});
      }
    }
}