import {IsEmail, IsOptional, IsString, MinLength} from 'class-validator';

export class AuthDto {

    @IsOptional()
    @IsString()
    userName: string;

    @IsString({
        message: 'Почта должна быть строкой'
    })
    @IsEmail()
    @IsOptional()
    email: string;

    @MinLength(6, {
        message: 'Пароль должен содержать не менее 6 символов!'
    })
    @IsString({
        message: 'Пароль должен быть строкой'
    })
    @IsOptional()
    password: string;

}
