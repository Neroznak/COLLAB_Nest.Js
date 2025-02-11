import { Module } from '@nestjs/common';
import { AttemptService } from './attempt.service';
import { AttemptController } from './attempt.controller';
import {PrismaService} from "../prisma.service";
import {CollabService} from "../collab/collab.service";
import {TaskService} from "../task/task.service";
import {UserService} from "../user/user.service";

@Module({
  controllers: [AttemptController],
  providers: [AttemptService, PrismaService, CollabService, TaskService, UserService],
})
export class AttemptModule {}
