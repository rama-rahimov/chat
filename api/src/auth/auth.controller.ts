import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {RegisterDto} from "./dto/registration.dto";
import {LoginDto} from "./dto/login.dto";

@Controller('api/auth')
export class AuthController {
   constructor(private authService: AuthService) {}
    @Post('registration')
    registration(@Body() user:RegisterDto){
       return this.authService.registration(user);
    }

    @Post('login')
    login(@Body() user:LoginDto){
       return this.authService.login(user);
    }
}