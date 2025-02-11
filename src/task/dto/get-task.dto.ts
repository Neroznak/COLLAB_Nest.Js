import { CreateTaskDto } from './create-task.dto';
import {PickType} from "@nestjs/mapped-types";

export class GetTaskDto extends PickType(CreateTaskDto, ['category','difficulty','title']) {}
