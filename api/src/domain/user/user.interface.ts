import {User} from "./user.entity";
export interface IUserRepository {
    findByEmail(email:string):Promise<User | null>;
    findByUsername(name:string, userId:number):Promise<User[] | null>;
    save(user:User):Promise<User | void>;
    allUsers(userId:number):Promise<User[]>;
}