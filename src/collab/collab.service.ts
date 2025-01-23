import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {UpdateCollabDto} from "./dto/update-collab.dto";
import {Categories} from "../enums/categories.enum";
import {Difficulty} from "../enums/difficulty.enum";

@Injectable()
export class CollabService {

    constructor(protected readonly prisma: PrismaService) {
    }

    async findFreeCollab(difficulty: Difficulty, category: Categories, title: string) {
        try {
            const collab = await this.prisma.collab.findMany({
                where: {
                    task: {
                        category: category,
                        title: title,
                        difficulty: difficulty
                    },
                    isPassed: false,
                },
                include: {
                    user: true
                }
            });
            return collab.find(collab => collab.user.length <= 5);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async create(taskId: number, userId: number) {
        try {
            const collab =  await this.prisma.collab.create({
                data: {
                    taskId: taskId,
                }
            });
            this.addUserToCollab(collab.id, userId);
            return collab;
        } catch (error) {
            throw new BadRequestException(error)
        }
    }



    async addUserToCollab(userId: number, collabId: number) {
        try {
            return await this.prisma.collabUser.create({
                data: {
                    userId: userId,
                    collabId: collabId,
                }
            });
        } catch (error) {
            if (error.code === 'P2002') {
                // Обработка ошибки уникального ограничения
                throw new BadRequestException(
                    `User with ID ${userId} is already linked to the collab.`
                );
            } else {
                // Прочие ошибки
                throw new InternalServerErrorException(
                    `An unexpected error occurred: ${error.message}`
                );
            }
        }
    }

    async update(id: number, UpdateCollabDto: UpdateCollabDto) {
        try {
            return this.prisma.collab.update({
                where: {
                    id: id
                },
                data: {
                    ...UpdateCollabDto,
                }
            });
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async getCollabers(collabId: number) {
        const users = await this.prisma.user.findMany({
            where: {
                collab: {
                    some: {
                        collabId: collabId,
                    }
                }
            }
        })
        console.log(users);
        return users;
    }

}
