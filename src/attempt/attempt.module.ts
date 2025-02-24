import { Module } from '@nestjs/common';
import { AttemptService } from './attempt.service';
import { AttemptController } from './attempt.controller';
import {PrismaService} from "../prisma.service";
import {CollabModule} from "../collab/collab.module";

@Module({
  controllers: [AttemptController],
  providers: [AttemptService, PrismaService],
  exports:[AttemptService],
  imports: [CollabModule],
})
export class AttemptModule {}
