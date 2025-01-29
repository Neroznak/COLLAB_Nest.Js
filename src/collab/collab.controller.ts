import {Controller, Body, Patch, Param, Get, Post} from '@nestjs/common';
import {CollabService} from './collab.service';
import {UpdateCollabDto} from './dto/update-collab.dto';
import {FindTaskDto} from "../task/dto/find-task.dto";
import {TaskService} from "../task/task.service";
import {CreateUserMvpDto} from "../user/dto/create-user-mvp.dto";
import {UserService} from "../user/user.service";

@Controller('collab')
export class CollabController {
    constructor(private readonly collabService: CollabService,
                private readonly taskService: TaskService,
                private readonly userService: UserService,
                ) {
    }


    @Post("join")
        async join(@Body() body: { userDto: CreateUserMvpDto; findTaskDto: FindTaskDto }) {
        const {userDto, findTaskDto} = body;
        const user = await this.userService.createMvp(userDto);
        const collab = await this.collabService.findFreeCollab(findTaskDto.difficulty, findTaskDto.category, findTaskDto.title);
        if (collab) {
            await this.collabService.addUserToCollab(user.id, collab.id)
        } else {
            const task = await this.taskService.findForCollab(findTaskDto.difficulty, findTaskDto.category, findTaskDto.title);
            await this.collabService.create(task.id, user.id)
        }
        return collab;
    }

    @Patch(':collabId') // Редактировать параметры collab'а могут его члены и администрация
    // Ещё плохо что collabId передаю через Param, нужно делать это иначе
    update(@Param('collabId') collabId: string, @Body() updateCollabDto: UpdateCollabDto) {
        return this.collabService.update(+collabId, updateCollabDto);
    }

    @Get(':collabId') // Редактировать параметры collab'а могут его члены и администрация
    // Ещё плохо что collabId передаю через Param, нужно делать это иначе
    async getCollab(@Param('collabId') collabId: string) {
        return this.collabService.getCollab(+collabId);
    }


}
