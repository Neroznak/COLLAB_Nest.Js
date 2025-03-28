import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {AttemptService} from './attempt.service';
import {CreateAttemptDto} from "./dto/create-attempt.dto";
import {ApiBody, ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {JWTAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('attempt')
export class AttemptController {
  constructor(private readonly attemptService: AttemptService) {
  }

  @ApiOperation({summary: 'Проверить выполнение задания userом'})
  @ApiBody({schema: {example: {referal: '6fa9e00c1c633595'}}})
  @ApiResponse({status: 201, description: 'Пользователь приглашён'})
  @UseGuards(JWTAuthGuard)
  @Post("/")
  execute(@Body() dto: CreateAttemptDto) {
    return this.attemptService.execute(dto);
  }

  @ApiOperation({summary: 'Return all attemtps for collab, but Not for user! Bug'})
  @ApiParam({name: "collabHash", required: true, description: "Хеш collab", example: "40bc23e8"})
  @ApiResponse({status: 200, description: 'Данные возвращены успешно'})
  @UseGuards(JWTAuthGuard)
  @Get(":collabHash")
  getAllAttemptsByCollab(@Param("collabHash") collabHash: string) {
    return this.attemptService.getAllAttemptsByCollab(collabHash);
  }
}
