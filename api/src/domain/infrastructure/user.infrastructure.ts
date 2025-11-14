import {IUserRepository} from "../user/user.interface";
import {User} from "../user/user.entity"
import {DatabaseService} from "../../../database/database.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserInfrastructure implements IUserRepository {
    constructor(private database: DatabaseService) {}
    async findByEmail(email: string): Promise<User | null> {
       const user = await this.database.user.findUnique({where: {email}});
       if (user && user.id) {
          return new User(user.id,user.name, user.lastName, user.phone,
             user.email, user.password, user.birthDate, user.genderId);
       }
       return null;
    }
    async save(user):Promise<User|void>{
       const getUser = await this.database.user.create({data:user});
       if(getUser && getUser.id) {
          return  new User(getUser.id,getUser.name,
           getUser.lastName, getUser.phone, getUser.email,
           getUser.password, getUser.birthDate, getUser.genderId);
       }
    }

    async allUsers(userId:number):Promise<User[]> {
      return  (await this.database.user.findMany({
          where: {
              id: {
                  not:userId
              }
          }
      }));
    }
}