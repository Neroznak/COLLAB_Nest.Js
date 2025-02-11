import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from "../prisma.service";
import {CollabService} from "../collab/collab.service";
import {TaskService} from "../task/task.service";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, CollabService, TaskService]})
export class UserModule {}
