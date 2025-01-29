import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { TheoryService } from './theory.service';
import { CreateTheoryDto } from './dto/create-theory.dto';
import { UpdateTheoryDto } from './dto/update-theory.dto';
import {Categories} from "@prisma/client";

@Controller('theory')
export class TheoryController {
  constructor(private readonly theoryService: TheoryService) {}

  @Post()
  create(@Body() createTheoryDto: CreateTheoryDto) {
    return this.theoryService.create(createTheoryDto);
  }

  @Get(":taskId")
  findByTask(@Param('taskId') taskId: string) {
    return this.theoryService.findByTask(+taskId);
  }

  @Get('')
  findOne(@Query('category') category: Categories) {
    return this.theoryService.findByCategory(category);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTheoryDto: UpdateTheoryDto) {
    return this.theoryService.update(+id, updateTheoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.theoryService.remove(+id);
  }
}
