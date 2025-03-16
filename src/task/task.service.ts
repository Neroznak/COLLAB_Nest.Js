import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {PrismaService} from "../prisma.service";
import {GetTaskDto} from "./dto/get-task.dto";


@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {
    }


    async create(createTaskDto: CreateTaskDto) {
        const testCasesJson = JSON.stringify(createTaskDto.testCases);

        return this.prisma.task.create({
            data: {
                ...createTaskDto,
                testCases: testCasesJson
            }
        })
    }


    async getTaskForCollab(getTaskDto: GetTaskDto) {
        try {
             const tasks=  await this.prisma.task.findMany({
                where: {
                    ...getTaskDto
                }
            })
            const randomIndex = Math.floor(Math.random() * tasks.length);
            return tasks[randomIndex]
        } catch (error) {
            throw new BadRequestException(error.message())
        }
    }

    update(taskId: number, updateTaskDto: UpdateTaskDto) {
        const testCasesJson = JSON.stringify(updateTaskDto.testCases);
        return this.prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                ...updateTaskDto,
                testCases: testCasesJson
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
            }
        })
    }
}
