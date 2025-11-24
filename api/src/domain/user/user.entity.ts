export class User{
    constructor(
        public readonly id:number|null,
        public readonly name:string,
        public readonly  lastName:string|null,
        public readonly  phone:string|null,
        public readonly email:string|null,
        public password:string|null,
        public readonly  birthDate:string | null,
        public readonly  genderId:number|null
    ) {}
}