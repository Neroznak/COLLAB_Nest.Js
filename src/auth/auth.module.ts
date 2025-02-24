import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { getJwtConfig } from "../config/jwt.config";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {PrismaService} from "../prisma.service";

@Module({
    imports: [
        forwardRef(() => UserModule), // forwardRef для UserModule
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig,
        }),
        PassportModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtService, JwtStrategy, PrismaService],
    exports: [AuthService],
})
export class AuthModule {}
