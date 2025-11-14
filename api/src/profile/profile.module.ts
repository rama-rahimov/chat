import {ProfileController} from "./profile.controller";
import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {DatabaseModule} from "../../database/database.module";
import {ProfileService} from "./profile.service";
import {ProfileUseCase} from "./application/profile.use-case";
import {UserInfrastructure} from "../domain/infrastructure/user.infrastructure";
import {AuthMiddleware} from "../common/middleware/auth.middleware";

@Module({
    imports: [DatabaseModule],
    providers: [DatabaseModule, ProfileService, ProfileUseCase,UserInfrastructure,
        {
            provide: "IUserRepository",
            useClass: UserInfrastructure,
        }],
    controllers: [ProfileController],
})

export class ProfileModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(ProfileController)
    }
}
