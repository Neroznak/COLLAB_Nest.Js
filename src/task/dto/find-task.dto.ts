import { CreateTaskDto } from './create-task.dto';
import {PickType} from "@nestjs/mapped-types";

export class FindTaskDto extends PickType(CreateTaskDto, ['difficulty','title','category']) {}
