import {Controller, Body, Post, UsePipes, ValidationPipe, UseGuards, Get, Param, Delete} from '@nestjs/common';
import {CollabService} from './collab.service';
import {GetTaskDto} from "../task/dto/get-task.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {JWTAuthGuard} from "../auth/guards/jwt-auth.guard";
import {ApiBody, ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {GetReferalDto} from "../referal/dto/get-referal.dto";
import {CurrentUser} from "../user/decorators/user.decorator";
import {User} from "@prisma/client";

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
    @ApiOperation({summary: 'Добавить приглашённого userа в collab. Проверка referal, получение collabHash,' +
            'регистрация пользователя, добавление его в collab, вернуть collab'})
    @ApiBody({schema: {example: {referal: '6fa9e00c1c633595'}}})
    @ApiResponse({status: 201, description: 'Пользователь приглашён'})
    @Post("invite")
    async invite(@Body() GetReferalDto: GetReferalDto) {
        return await this.collabService.invite(GetReferalDto);
    }


    @UseGuards(JWTAuthGuard)
    @ApiOperation({summary: 'Вернуть данные о collab'})
    @ApiParam({ name: "collabHash", required: true, description: "Хеш collab", example: "40bc23e8" })
    @ApiResponse({status: 200, description: 'Данные получены'})
    @Get(":collabHash")
    async getCollab(@Param("collabHash") collabHash: string, @CurrentUser() user:User) {
        return await this.collabService.getCollab(collabHash, user.id);
    }


    @UseGuards(JWTAuthGuard)
    @UsePipes(new ValidationPipe())
    @ApiOperation({summary: 'Выход usera из collaba'})
    @ApiBody({schema: {example: {referal: '40bc23e840bc23e8'}}})
    @ApiResponse({status: 201, description: 'Пользователь приглашён'})
    @Delete(':coll  abHash/leave')
    async leave(@Param("collabHash") collabHash: string, @CurrentUser() user:User) {
        return this.collabService.leaveUserFromCollab(user.id, collabHash);
    }


}
