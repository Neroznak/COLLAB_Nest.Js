
import {PickType} from "@nestjs/mapped-types";
import {CreateUserDto} from "./create-user.dto";

export class CreateUserMvpDto extends PickType(CreateUserDto, ['userName']) {}
