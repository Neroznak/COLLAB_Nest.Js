import { forwardRef, Module } from '@nestjs/common';
import { CollabService } from './collab.service';
import { CollabController } from './collab.controller';
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { CollabGateway } from "./collab.gateway";
import { TaskModule } from "../task/task.module";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";
import { ReferalModule } from "../referal/referal.module";

@Module({
  controllers: [CollabController],
  providers: [CollabService, PrismaService, JwtService, ConfigService, CollabGateway],
  exports: [CollabService, CollabGateway],
  imports: [
    TaskModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    ReferalModule
  ],
})
export class CollabModule {}
