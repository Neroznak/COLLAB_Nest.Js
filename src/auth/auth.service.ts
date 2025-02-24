import {BadRequestException, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {Response} from "express";
import {ConfigService} from "@nestjs/config";
import {CreateUserDto} from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
  EXPIRE_DAY_ACCESS_TOKEN = 3;
  ACCESS_TOKEN_NAME = "accessToken";

  constructor(private jwtService: JwtService,
              private userService: UserService,
              private configService: ConfigService) {
  }

  async register(dto?: CreateUserDto) {
    if (dto && dto.email) {
      const oldUser = await this.userService.getUserByEmail(dto.email);
      if (oldUser) throw new BadRequestException("Пользователь уже существует");

    }
    const user = await this.userService.createUser(dto);
    const accessToken = await this.generateNewToken(user.id);
    return {user, accessToken};
  }

  async generateNewToken(userId: number) {
    const data = {id: userId};
    return this.jwtService.sign(data, {
      expiresIn: "3d",
      secret: process.env.JWT_SECRET
    });
  }

  async addAccessTokenToResponse(res: Response, accessToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_ACCESS_TOKEN);
    res.cookie(this.ACCESS_TOKEN_NAME, accessToken, {
      httpOnly: true,
      domain: this.configService.get("SERVER_DOMAIN"),
      expires: expiresIn,
      secure: true,
      sameSite: "none"
    });
  }

  async removeAccessTokenFromResponse(res: Response) {
    res.cookie(this.ACCESS_TOKEN_NAME, "", {
      httpOnly: true,
      domain: this.configService.get("SERVER_DOMAIN"),
      expires: new Date(0),
      secure: true,
      sameSite: "none"
    });
  }

}

