import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {CollabModule} from './collab/collab.module';
import {MessageModule} from './message/message.module';
import {TaskModule} from './task/task.module';
import {AttemptModule} from "./attempt/attempt.module";
import {ReferalModule} from "./referal/referal.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [ConfigModule.forRoot(), AuthModule, UserModule,
      CollabModule, MessageModule, TaskModule, AttemptModule, ConfigModule, ReferalModule, JwtModule]
})
export class AppModule {
}