import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res, UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {JWTAuthGuard} from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  //Регистрация
  @UsePipes(new ValidationPipe())
  @ApiOperation({summary: 'Регистрация нового userа'})
  @ApiResponse({status: 201, description: 'Пользователь приглашён'})
  @Post("register")
  async register(@Body() dto: CreateUserDto) {
    return await this.authService.register(dto);
  }

  //Выход из учётной записи (удаление token из cookie)
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  @ApiOperation({summary: 'Выход из аккаунта'})
  @ApiResponse({status: 200, description: 'Пользователь вышел'})
  @Post("logout")
  async logout(@Res({passthrough: true}) res: Response) {
    await this.authService.removeAccessTokenFromResponse(res);
    return true;
  }

}




