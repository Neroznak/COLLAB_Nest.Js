import { Module } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {ReferalService} from "./referal.service";
import {ReferalController} from "./referal.controller";

@Module({
  controllers: [ReferalController],
  providers: [ReferalService, PrismaService],
  exports: [ReferalService]
})
export class ReferalModule {}
