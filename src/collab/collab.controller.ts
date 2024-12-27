import {Controller, Body, Patch, Param, ParseIntPipe, Get} from '@nestjs/common';
import {CollabService} from './collab.service';
import {UpdateCollabDto} from './dto/update-collab.dto';

@Controller('collab')
export class CollabController {
    constructor(private readonly collabService: CollabService) {
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
