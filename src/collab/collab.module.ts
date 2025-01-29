import { Module } from '@nestjs/common';
import { CollabService } from './collab.service';
import { CollabController } from './collab.controller';
import {PrismaService} from "../prisma.service";
import {TaskService} from "../task/task.service";
import {UserService} from "../user/user.service";

@Module({
  controllers: [CollabController],
  providers: [CollabService, PrismaService, TaskService, UserService],
})
export class CollabModule {}
