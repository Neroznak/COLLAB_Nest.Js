import {Controller, Get, Post, Body, Param} from '@nestjs/common';
import {AttemptService} from './attempt.service';
import {CreateAttemptDto} from "./dto/create-attempt.dto";
import {ApiBody, ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";

@Controller('attempt')
export class AttemptController {
  constructor(private readonly attemptService: AttemptService) {
  }

  @ApiOperation({summary: 'Проверить выполнение задания userом'})
  @ApiBody({schema: {example: {referal: '6fa9e00c1c633595'}}})
  @ApiResponse({status: 201, description: 'Пользователь приглашён'})
  @Post("/")
  execute(@Body() dto: CreateAttemptDto) {
    return this.attemptService.execute(dto);
  }

  @ApiOperation({summary: 'Return all attemtps for collab, but Not for user! Bug'})
  @ApiParam({name: "collabHash", required: true, description: "Хеш collab", example: "40bc23e8"})
  @ApiResponse({status: 200, description: 'Данные отправлены успешно'})
  @Get(":collabHash")
  getAllAttemptsByCollab(@Param("collabHash") collabHash: string) {
    return this.attemptService.getAllAttemptsByCollab(collabHash);
  }
}
