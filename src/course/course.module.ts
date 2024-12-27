import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import {PrismaService} from "../prisma.service";
import {CollabService} from "../collab/collab.service";

@Module({
  controllers: [CourseController],
  providers: [CourseService, PrismaService, CollabService],
})
export class CourseModule {}
