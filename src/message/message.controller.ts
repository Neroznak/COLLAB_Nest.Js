import {Controller, Get, Param, Delete, UseGuards, Query, ParseIntPipe} from "@nestjs/common";
import { MessageService } from "./message.service";
import { JWTAuthGuard } from "../auth/guards/jwt-auth.guard";
import {CurrentUser} from "../user/decorators/user.decorator";

@Controller("messages")

export class MessageController {
  constructor(private readonly messageService: MessageService) {
  }

  @UseGuards(JWTAuthGuard) // Применение защитного механизма
  @Get(":collabId")
  async getMessagesByChat(@Param("collabId") collabId: string) {
    return this.messageService.getMessagesByCollab(+collabId);
  }

  @UseGuards(JWTAuthGuard) // Применение защитного механизма
  @Delete(":messageId")
  async deleteMessage(@Param("messageId", ParseIntPipe) messageId: number,
                      @CurrentUser("id") userId: number,
                      @Query ('forAnyOne') forAnyOne: boolean,) {
    return this.messageService.deleteMessage(messageId, userId, forAnyOne);
  }

  @UseGuards(JWTAuthGuard) // Применение защитного механизма
  @Get('search/:chatId')
  async searchMessages(@Param("chatId", ParseIntPipe) chatId: number,
                       @CurrentUser("id") userId: number,
                       @Query('query') query: string) {
    return this.messageService.searchMessages(chatId, userId, query);
  }
}