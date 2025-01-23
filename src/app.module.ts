import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CollabModule } from './collab/collab.module';
import { MessageModule } from './message/message.module';
import { TaskModule } from './task/task.module';
import { QuoteModule } from './quote/quote.module';
import { TheoryModule } from './theory/theory.module';
@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, CollabModule, MessageModule, TaskModule, TheoryModule, QuoteModule]
})
export class AppModule {}