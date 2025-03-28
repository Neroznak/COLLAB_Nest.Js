import {IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword} from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsOptional()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    @IsStrongPassword()
    password: string;

    @IsString()
    @IsOptional()
    language: string;





}
