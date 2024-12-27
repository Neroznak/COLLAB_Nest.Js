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
import {CurrentUser} from "../user/decorators/user.decorator";
import {CollabService} from "../collab/collab.service";
import {Auth} from "../auth/decorators/auth.decorator";

// import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService,
                private readonly collabService: CollabService) {
    }

    @Post("create")
    @Auth()
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
    @Auth()
    @UsePipes(new ValidationPipe()) // Здесь нужно добавить проверку: кто может редактировать курс? Админ и сам создатель
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCourseDto: UpdateCourseDto) {
        return this.courseService.update(id, updateCourseDto);
    }


    @Delete(':id') // Здесь нужно добавить проверку: кто может удалять курс? Админ и сам создатель
    @Auth()
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.courseService.remove(id);
    }

    @Post("/joincourse/:courseId")
    @Auth()
    @UsePipes(new ValidationPipe())
    async add(@Param("courseId", ParseIntPipe) courseId: number,
              @CurrentUser("id") userId: number) {
        const check = await this.collabService.findFreeCollab(courseId);
        if (!check) {
            this.collabService.create(courseId);
        }
        const freeCollab = await this.collabService.findFreeCollab(courseId);
        return this.collabService.addUserToCollab(userId, freeCollab.id);
    }

}
