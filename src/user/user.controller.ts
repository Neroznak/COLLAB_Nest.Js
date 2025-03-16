import {Body, Controller, Get, Param, Patch, Post, Query, UseGuards,} from '@nestjs/common';
import {UserService } from './user.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {CollabService} from "../collab/collab.service";
import {CurrentUser} from "./decorators/user.decorator";
import {JWTAuthGuard} from "../auth/guards/jwt-auth.guard";


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,
              private readonly collabService: CollabService,) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('')
  getByEmail(@Query('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @UseGuards(JWTAuthGuard)
  @Get("profile")
  async getProfile(@CurrentUser("id") id: number) {
    return this.userService.getUserById(id);
  }

  @UseGuards(JWTAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }


}
