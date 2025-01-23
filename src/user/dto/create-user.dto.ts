import {IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword} from "class-validator";
import {Role} from "../../enums/roles.enum";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword()
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role:Role

    @IsString()
    @IsOptional()
    profilePictureUrl: string;

    @IsString()
    @IsOptional()
    language: string;





}
