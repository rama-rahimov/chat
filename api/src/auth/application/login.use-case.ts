import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "jsonwebtoken";
import crypto from 'bcrypt'
import {User} from "../../domain/user/user.entity";
import type {IUserRepository} from "../../domain/user/user.interface";
import {Inject} from "@nestjs/common";

export class LoginUseCase {
    constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository,
                private readonly jwtService: JwtService) {}
    async login(input):Promise<any>{
        try {
            const user: User | null = await this.userRepository.findByEmail(input.email);
            if (!user){
                throw new Error('User not found');
            }
            const check = await crypto.compare(input.password, user.password);
            if (!check){
                throw new Error('Passwords not correct');
            }
            const payload: JwtPayload = { id:user.id, email:user.email };
            const token =  await this.jwtService.signAsync(payload);
            return { token }
        }catch(error){
            return { error: true, message: error.message };
        }
    }
}