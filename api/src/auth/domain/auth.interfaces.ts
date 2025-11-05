import {Registration} from "./entity/entity.registration";

export interface IUserRepository {
    findByEmail(email:string):Promise<Registration>;
    save(user:Registration):Promise<Registration>;
}