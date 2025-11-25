import {Inject, Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {JwtService} from "@nestjs/jwt";
import type {IUserRepository} from "../../domain/user/user.interface";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService,
    @Inject('IUserRepository')  private readonly userRepository: IUserRepository) {
    }
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization?.split(" ")[1]
            if (!token) {
                throw new UnauthorizedException("No token provided");
            }
            const verifyToken = await this.jwtService.verifyAsync(token);
            const user = await this.userRepository.findByEmail(verifyToken.email);
            if (!user) {
                throw new UnauthorizedException("User not found");
            }
            (req as any).user = user;
            next();
        }catch(err){
            res.status(401).json({error: true, message: "Invalid or expired token" });
        }
    }
}
