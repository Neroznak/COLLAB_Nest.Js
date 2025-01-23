import {IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword} from "class-validator";
import {Role} from "../../enums/roles.enum";
import {Optional} from "@nestjs/common";

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

    @IsNotEmpty()
    @IsEnum(Role)
    role:Role

    @IsString()
    @Optional()
    profilePictureUrl: string;

    @IsString()
    @Optional()
    language: string;





}
