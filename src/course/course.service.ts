import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateCourseDto} from './dto/create-course.dto';
import {PrismaService} from "../prisma.service";
import {UpdateCourseDto} from "./dto/update-course.dto";

@Injectable()
export class CourseService {

    constructor(protected readonly prisma: PrismaService) {
    }

    async create(createCourseDto: CreateCourseDto) {
        const existedCourse = await this.prisma.course.findMany({
            where: {
                OR: [
                    {description: createCourseDto.description},
                    {structure: createCourseDto.structure},
                ],
            }
        })
        if (existedCourse.length > 0) {
            throw new BadRequestException({message: 'Course already exists'});
        }
        try {
            return this.prisma.course.create({
                data: {
                    ...createCourseDto,
                }
            });
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async findAll() {
        const courses = await this.prisma.course.findMany();
        if (!courses) throw new NotFoundException("На сайте нет курсов");
        return courses;
    }

    async findNew() {
        const newCourses = await this.prisma.course.findMany({
            where: {
                status: "New"
            }
        });
        if (!newCourses) throw new NotFoundException("На сайте нет новых курсов");
        return newCourses;
    }

    async findOne(id: number) {
        const course = await this.prisma.course.findUnique({
            where: {
                id: id
            }
        })
        if (!course) throw new NotFoundException("Course didn't exist")
        return course;
    }

    async update(id: number, updateCourseDto: UpdateCourseDto) {
        try {
            return await this.prisma.course.update({
                where: {
                    id: id
                },
                data: {
                    ...updateCourseDto
                }
            })
        } catch (error) {
            throw new BadRequestException(error.meta.cause)
        }
    }

    async remove(id: number) {
        const course = await this.prisma.course.findUnique({where: {id}});
        if (!course) {
            throw new NotFoundException(`Course with ID ${id} not found`);
        }
        try {
            await this.prisma.course.delete({
                where: {
                    id: id
                }
            });
            return {message: 'Course was deleted successfully'};
        } catch (error) {
            throw new Error(error)
        }
    }




}