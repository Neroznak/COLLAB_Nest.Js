import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CollabModule } from './collab/collab.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { MessageModule } from './message/message.module';
import { TaskModule } from './task/task.module';
@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, CollabModule, CourseModule, LessonModule, MessageModule, TaskModule]
})
export class AppModule {}