import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { CollabModule } from "../collab/collab.module";
import { TaskModule } from "../task/task.module";
import { AuthModule } from "../auth/auth.module";
import { ReferalModule } from "../referal/referal.module";

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService, JwtService, ConfigService],
    imports: [
        TaskModule,
        forwardRef(() => CollabModule), // forwardRef для CollabModule
        forwardRef(() => AuthModule), // forwardRef для AuthModule
        ReferalModule,
    ],
    exports: [UserService],
})
export class UserModule {}
