import {Controller, Get, Post, Body, Patch, Param, UseGuards} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import {JWTAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @UseGuards(JWTAuthGuard) // Применение защитного механизма
  @Post()
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quoteService.create(createQuoteDto);
  }

  @Get()
  findRandom() {
    return this.quoteService.findRandom();
  }


  @UseGuards(JWTAuthGuard) // Применение защитного механизма
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quoteService.update(+id, updateQuoteDto);
  }

}
