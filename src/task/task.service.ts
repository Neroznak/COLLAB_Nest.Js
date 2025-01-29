import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {PrismaService} from "../prisma.service";


@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {
    }


    async create(createTaskDto: CreateTaskDto) {
        return this.prisma.task.create({
            data: {
                ...createTaskDto,
            }
        })
    }


    async findForCollab(difficulty: string, category: string, title: string) {
        console.log("В findForCollab приходит difficulty: " + difficulty);
        console.log("В findForCollab приходит category: " + category);
        console.log("В findForCollab приходит title: " + title);
        try {
             const tasks=  await this.prisma.task.findMany({
                where: {
                    difficulty: difficulty,
                    category: category,
                    title: title
                }
            })
            const randomIndex = Math.floor(Math.random() * tasks.length);
             console.log(tasks[randomIndex]);
            return tasks[randomIndex]
        } catch (error) {
            throw new BadRequestException(error.message())
        }
    }

    update(taskId: number, updateTaskDto: UpdateTaskDto) {
        return this.prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                ...updateTaskDto,
            }
        })
    }

    remove(taskId: number) {
        return this.prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                isDeleted: true,
            }
        })
    }


    getTask(taskId: number) {
        return this.prisma.task.findUnique({
            where: {
                id: taskId,
            },
            include: {
                TaskTheory:{
                    include: {
                        Theory: true
                    }
                }
            }

        })
    }
}
