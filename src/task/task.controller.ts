import {Controller, Post, Body, Patch, Param, Delete, Get} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post("create")
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get(":id")
  getTask(@Param('id') taskId: string) {
    return this.taskService.getTask(+taskId);
  }


  // @Get('')
  // findForCollab(@Query('difficulty') difficulty: Difficulty,
  //               @Query('category') category: Categories,) {
  //   return this.taskService.findForCollab(difficulty, category);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
