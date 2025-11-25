import {IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length} from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 15)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 15)
    lastName: string;

    @IsOptional()
    phone: string;

    @IsNotEmpty()
    @Length(10, 35)
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(10, 35)
    password: string;

    @IsOptional()
    birthDate?: string;

    @IsNotEmpty()
    @IsNumber()
    genderId: number;
}