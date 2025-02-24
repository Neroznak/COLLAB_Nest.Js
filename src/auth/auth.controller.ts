import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import {CreateUserDto} from "../user/dto/create-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  //Регистрация
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("register")
  async register(@Body() dto: CreateUserDto) {
    return await this.authService.register(dto);

  }

  //Выход из учётной записи (удаление token из cookie)
  @HttpCode(200)
  @Post("logout")
  async logout(@Res({passthrough: true}) res: Response) {
    await this.authService.removeAccessTokenFromResponse(res);
    return true;
  }

}




