import {Controller, Post, Body} from '@nestjs/common';
import { ReferalService } from './referal.service';
import {CreateReferalDto} from "./dto/create-referal.dto";

@Controller('referal')
export class ReferalController {
  constructor(private readonly referalService: ReferalService) {}

  @Post()
  create(@Body() createReferalDto: CreateReferalDto) {
    return this.referalService.create(createReferalDto);
  }






}
