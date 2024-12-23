import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    UsePipes,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Delete
} from '@nestjs/common';
import {CourseService} from './course.service';
import {CreateCourseDto} from './dto/create-course.dto';
import {UpdateCourseDto} from "./dto/update-course.dto";

// import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {
    }

    @Post("create")
    @UsePipes(new ValidationPipe())
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.courseService.create(createCourseDto);
    }

    @Get("findall")
    findAll() {
        return this.courseService.findAll();
    }

    @Get("findnew")
    findNew() {
        return this.courseService.findNew();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.courseService.findOne(id);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCourseDto: UpdateCourseDto) {
        return this.courseService.update(id, updateCourseDto);
    }


    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.courseService.remove(id);
    }
}
