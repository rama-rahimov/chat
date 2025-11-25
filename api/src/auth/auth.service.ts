import { Injectable } from "@nestjs/common";
import { RegistrationUseCase } from "./application/registration.use-case";
import { RegisterDto } from "./dto/registration.dto";
import {LoginDto} from "./dto/login.dto";
import {LoginUseCase} from "./application/login.use-case";

@Injectable()
export class AuthService {
    constructor(private readonly registrationUseCase: RegistrationUseCase,
     private readonly loginUseCase: LoginUseCase,) {}
   async registration(user:RegisterDto){
      return await this.registrationUseCase.registration(user);
    }

   async login(user:LoginDto){
     return await this.loginUseCase.login(user);
    }
}