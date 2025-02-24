import { Controller, Get, Post, Body } from '@nestjs/common';
import { AttemptService } from './attempt.service';
import {CreateAttemptDto} from "./dto/create-attempt.dto";
import {GetAttemptDto} from "./dto/get-attempt.dto";

@Controller('attempt')
export class AttemptController {
  constructor(private readonly attemptService: AttemptService) {}

  @Post("/")
  execute(@Body() dto: CreateAttemptDto) {
    return this.attemptService.execute(dto);
  }

  @Get("/")
  getAllAttemptsByCollab(@Body() dto: GetAttemptDto) {
    return this.attemptService.getAllAttemptsByCollab(dto.collabHash);
  }





}
