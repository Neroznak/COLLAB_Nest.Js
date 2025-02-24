import {Controller, Body, Patch, Param, Get, Post, UsePipes, ValidationPipe, UseGuards} from '@nestjs/common';
import {CollabService} from './collab.service';
import {UpdateCollabDto} from './dto/update-collab.dto';
import {GetTaskDto} from "../task/dto/get-task.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {GetCollabDto} from "./dto/get-collab.dto";
import {LeaveCollabDto} from "./dto/leave-collab.dto";
import {JWTAuthGuard} from "../auth/guards/jwt-auth.guard";
import {GetCollabForUsersDto} from "./dto/get-collab-for-users.dto";

@Controller('collab')
export class CollabController {
    constructor(private readonly collabService: CollabService) {
    }

    @UsePipes(new ValidationPipe())
    @Post("join")
    async joinToCollab(@Body() body:{ createUserDto: CreateUserDto, getTaskDto: GetTaskDto }) {
        return await this.collabService.joinToCollab(body.createUserDto, body.getTaskDto);
    }

    @UsePipes(new ValidationPipe())
    @Post("get")
    async getCollabForUser(@Body() dto: GetCollabForUsersDto) {
        return await this.collabService.getCollabForUser(dto);
    }

    @UseGuards(JWTAuthGuard)
    @UsePipes(new ValidationPipe())
    @Patch('')
    update(@Body() getCollabDto: GetCollabDto,
           @Body() updateCollabDto: UpdateCollabDto) {
        return this.collabService.updateCollab(getCollabDto.collabHash, updateCollabDto);
    }

    @UseGuards(JWTAuthGuard)
    @UsePipes(new ValidationPipe())
    @Get(':collabHash')
    async getCollab(@Param('collabHash') collabHash: string) {
        return this.collabService.getCollabByHash(collabHash);
    }

    @UseGuards(JWTAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('/leave')
    async leave(@Body() dto: LeaveCollabDto) {
        return this.collabService.leaveUserFromCollab(dto.userId, dto.collabHash);
    }


    @UsePipes (new ValidationPipe())
    @Post ("add")
    async addUserToCollab (@Body() leaveCollabDto: LeaveCollabDto) {
        return await this.collabService.addUserToCollab(leaveCollabDto.userId, leaveCollabDto.collabHash);
    }


}
