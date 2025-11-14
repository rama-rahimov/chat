import {Inject, Injectable} from "@nestjs/common";
import { User } from "../../domain/user/user.entity";
import * as bcrypt from "bcrypt";
import type {IUserRepository} from "../../domain/user/user.interface";

@Injectable()
export class RegistrationUseCase {
   constructor(@Inject("IUserRepository")
    private readonly userRepository: IUserRepository) {}
   async registration(input){
       try {
        const user: User | null = await this.userRepository.findByEmail(input.email);
        if ((user || {}).id){
          throw new Error('User already exists');
        }else {
          input.password = await bcrypt.hash(input.password, 10);
          const fullResult:User|void = await this.userRepository.save(input);
          if (fullResult && fullResult.password){
              const {password, ...result } = fullResult;
              return result;
          }
        }
       }catch(error){
         console.log({ error });
         return { error: true, message: error.message };
       }
   }
}