import {Injectable} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {PrismaService} from "../prisma.service";
import {Difficulty} from "../enums/difficulty.enum";
import {Categories} from "../enums/categories.enum";
import {Task} from "../entities/task.entity";

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



    async findForCollab(difficulty: Difficulty, category: Categories, title: string): Promise<Task> {
        return await this.prisma.$queryRaw`
            SELECT * 
            FROM "Task"
            WHERE "difficulty" = ${difficulty} AND "category" = ${category} AND "title" = ${title}
            ORDER BY RANDOM()
            LIMIT 1
`;
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
}
