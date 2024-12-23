import {Controller, Post, Body, Patch, Param, ParseIntPipe, UsePipes, ValidationPipe} from '@nestjs/common';
import {CollabService} from './collab.service';
import {UpdateCollabDto} from './dto/update-collab.dto';

@Controller('collab')
export class CollabController {
    constructor(private readonly collabService: CollabService) {
    }

    @Post("/course/:courseId/user/:userId")
    @UsePipes(new ValidationPipe())
    async create(@Param("courseId", ParseIntPipe) courseId: number,
                 @Param("userId", ParseIntPipe) userId: number,) {
        const check = await this.collabService.findFreeCollab(courseId);
        if (!check) {
            this.collabService.create(courseId);
        }
        const freeCollab = await this.collabService.findFreeCollab(courseId);
        return this.collabService.addUserToCollab(userId, freeCollab.id);
    }


    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCollabDto: UpdateCollabDto) {
        return this.collabService.update(id, updateCollabDto);
    }


}
