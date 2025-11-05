import { hash, genSaltSync } from 'bcrypt-ts';

export class Registration{
    constructor(
       public readonly name:string,
       public readonly  lastName:string,
       public readonly  phone:string|null,
       public readonly email:string,
       public readonly  password:string,
       public readonly  birthDate:string,
       public readonly  genderId:number
        ) {}
    hashPassword(password:string){
        const salt = genSaltSync(10);
        return hash(password,salt);
    }
}