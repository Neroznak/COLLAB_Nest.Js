import {Controller, Post, Body} from '@nestjs/common';
import {ReferalService} from './referal.service';
import {CreateReferalDto} from "./dto/create-referal.dto";
import {ApiBody, ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('referal')
export class ReferalController {
    constructor(private readonly referalService: ReferalService) {
    }

    @Post()
    @ApiOperation({summary: 'Создать реферальную ссылку'})
    @ApiBody({schema: {example: {collabHash: '40bc23e8', userId: 1}}})
    @ApiResponse({status: 201, description: 'Ссылка создана'})
    create(@Body() createReferalDto: CreateReferalDto) {
        return this.referalService.create(createReferalDto);
    }


}
