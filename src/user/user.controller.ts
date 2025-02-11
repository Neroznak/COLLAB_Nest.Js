import {Body, Controller, Get, Param, Patch, Post, Query,} from '@nestjs/common';
import { UserService } from './user.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {CollabService} from "../collab/collab.service";


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,
              private readonly collabService: CollabService,) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }


  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  @Get('')
  getByEmail(@Query('email') email: string) {
    return this.userService.getUserByEmail(email);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }


}
