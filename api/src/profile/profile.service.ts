import {Injectable} from "@nestjs/common";
import {ProfileUseCase} from "./application/profile.use-case";
import {User} from "../domain/user/user.entity";

@Injectable()
export class ProfileService {
  constructor(private readonly profileUseCase:ProfileUseCase) {}
  allUsers(userId:number): Promise<User[]> {
     return  this.profileUseCase.allUsers(userId);
  }
  findByUsername(userName: string, userId: number):Promise<User[] | null> {
     return  this.profileUseCase.findByUsername(userName, userId);
  }
}