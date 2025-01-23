import {Controller, Body, Patch, Param, ParseIntPipe, Get, Post} from '@nestjs/common';
import {CollabService} from './collab.service';
import {UpdateCollabDto} from './dto/update-collab.dto';
import {CurrentUser} from "../user/decorators/user.decorator";
import {FindTaskDto} from "../task/dto/find-task.dto";
import {TaskService} from "../task/task.service";

@Controller('collab')
export class CollabController {
    constructor(private readonly collabService: CollabService,
                private readonly taskService: TaskService) {
    }


    @Post("join")
    async join(@Body() findTaskDto: FindTaskDto,
         @CurrentUser('id') userId: number) {
        const collab = await this.collabService.findFreeCollab(findTaskDto.difficulty, findTaskDto.category, findTaskDto.title);
        if (collab) {
            this.collabService.addUserToCollab(userId, collab.id)
        } else {
            const task = await this.taskService.findForCollab(findTaskDto.difficulty, findTaskDto.category, findTaskDto.title);
            await this.collabService.create(task.id, userId)
        }
    }

    @Patch(':id') // Редактировать параметры collab'а могут его члены и администрация
    // Ещё плохо что collabId передаю через Param, нужно делать это иначе
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCollabDto: UpdateCollabDto) {
        return this.collabService.update(id, updateCollabDto);
    }

    @Get(':collabId') // Редактировать параметры collab'а могут его члены и администрация
    // Ещё плохо что collabId передаю через Param, нужно делать это иначе
    getCollabers(@Param('collabId', ParseIntPipe) collabId: number) {
        return this.collabService.getCollabers(collabId);
    }


}
