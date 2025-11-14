import {Inject, Injectable} from "@nestjs/common";
import type {IUserRepository} from "../../domain/user/user.interface";
import {User} from "../../domain/user/user.entity";

@Injectable()
export class ProfileUseCase {
    constructor(@Inject("IUserRepository") private readonly IUserRepository: IUserRepository) {}
    async allUsers(userId:number): Promise<User[]> {
      return  await this.IUserRepository.allUsers(userId);
    }
}