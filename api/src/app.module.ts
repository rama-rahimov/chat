import { Module } from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {AuthModule} from "./auth/auth.module";
import {ConfigModule} from "@nestjs/config";
import {ChatModule} from "./chat/chat.module";
import {ProfileModule} from "./profile/profile.module";
import {LlamaModule} from "./Llama/Llama.module";

@Module({
  imports: [DatabaseModule, AuthModule,
    ProfileModule, ChatModule, LlamaModule,
    ConfigModule.forRoot({isGlobal: true})],
  providers: [DatabaseModule]
})
export class AppModule {}
