import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @Length(10, 35)
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(10, 35)
    password: string;
}