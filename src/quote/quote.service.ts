import { Injectable } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import {PrismaService} from "../prisma.service";


@Injectable()
export class QuoteService {

  constructor(private prisma: PrismaService) {
  }

    async create(createQuoteDto: CreateQuoteDto) {
    return this.prisma.quotes.create({
      data: {
        ...createQuoteDto,
      }
    });
  }

  async findRandom() {
    return await this.prisma.$queryRaw`
            SELECT * 
            FROM "Quotes"
            ORDER BY RANDOM()
            LIMIT 1
`;
  }



  async update(quotesId: number, updateQuoteDto: UpdateQuoteDto) {
    return this.prisma.quotes.update({
      where: {id: quotesId},
      data : {
        ...updateQuoteDto
      }
    });
  }


}
