import { Module } from '@nestjs/common';
import { TheoryService } from './theory.service';
import { TheoryController } from './theory.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [TheoryController],
  providers: [TheoryService, PrismaService],
})
export class TheoryModule {}
