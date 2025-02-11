import {Controller, Body, Patch, Param, Get, Post} from '@nestjs/common';
import {CollabService} from './collab.service';
import {UpdateCollabDto} from './dto/update-collab.dto';
import {GetTaskDto} from "../task/dto/get-task.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {GetCollabDto} from "./dto/get-collab.dto";
import {LeaveCollabDto} from "./dto/leave-collab.dto";

@Controller('collab')
export class CollabController {
    constructor(private readonly collabService: CollabService,) {
    }

    @Post("join")
    async joinToCollab(@Body() body: { createUserDto: CreateUserDto; getTaskDto: GetTaskDto }) {
        return await this.collabService.joinToCollab(body);
    }

    @Patch('')
    update(@Body() getCollabDto: GetCollabDto,
           @Body() updateCollabDto: UpdateCollabDto) {
        return this.collabService.updateCollab(getCollabDto.collabId, updateCollabDto);
    }

    @Get('')
    async getCollab(@Body() dto: GetCollabDto) {
        return this.collabService.getCollabById(dto.collabId);
    }

    @Post('/leave')
    async leave(@Body() dto: LeaveCollabDto) {
        return this.collabService.leaveUserFromCollab(dto.collabId, dto.userId);
    }

    @Get('/invite/:hash')
    async getByHash(@Param('hash') hash: string) {
        return await this.collabService.inviteByHash(hash);
    }

    @Post("join/invite")
    async joinAfterInvite(@Body() body: {createUserDto: CreateUserDto, collabId: number}) {
        return await this.collabService.joinAfterInvite(body);
    }
}
