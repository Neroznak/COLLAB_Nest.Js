import {IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword} from "class-validator";
import {Role} from "../../enums/roles.enum";
import {subscriptionPlane} from "../../enums/subscription.enum";

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





}
