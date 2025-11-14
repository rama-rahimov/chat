export class User{
    constructor(
        public readonly id:number|null,
        public readonly name:string,
        public readonly  lastName:string,
        public readonly  phone:string|null,
        public readonly email:string,
        public password:string,
        public readonly  birthDate:string | null,
        public readonly  genderId:number
    ) {}
}