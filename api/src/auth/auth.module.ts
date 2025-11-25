import {Module} from "@nestjs/common";
import {DatabaseModule} from "../../database/database.module";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {RegistrationUseCase} from "./application/registration.use-case";
import {UserInfrastructure} from "../domain/infrastructure/user.infrastructure";
import {LoginUseCase} from "./application/login.use-case";
import {JwtModule} from "@nestjs/jwt";
import dotenv from "dotenv";
dotenv.config();

@Module({
    imports: [DatabaseModule, JwtModule.register({
     global:true,
     secret: process.env.JWT_SECRET,
     signOptions: { expiresIn: '30days' }
    })],
    controllers: [AuthController],
    providers: [DatabaseModule, AuthService,
        RegistrationUseCase, UserInfrastructure, LoginUseCase,
        {
            provide: "IUserRepository",
            useClass: UserInfrastructure,
        }],
    exports: [RegistrationUseCase, LoginUseCase],

})
export class AuthModule {}