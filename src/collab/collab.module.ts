import { Module } from '@nestjs/common';
import { CollabService } from './collab.service';
import { CollabController } from './collab.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [CollabController],
  providers: [CollabService, PrismaService],
})
export class CollabModule {}
