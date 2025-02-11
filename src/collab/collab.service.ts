import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {UpdateCollabDto} from "./dto/update-collab.dto";
import {randomBytes} from "crypto";
import {GetTaskDto} from "../task/dto/get-task.dto";
import {TaskService} from "../task/task.service";
import {UserService} from "../user/user.service";

@Injectable()
export class CollabService {

    constructor(protected readonly prisma: PrismaService,
                private readonly taskService: TaskService,
                private readonly userService: UserService,) {
    }

    async joinToCollab(body) {
        const {createUserDto, getTaskDto} = body;
        const user = await this.userService.createUser(createUserDto);
        const existCollab = await this.getAvailableCollabByTask(getTaskDto);
        let collab;
        if (existCollab) {
            collab = await this.addUserToCollab(user.id, existCollab.id);
        } else {
            const taskForCollab = await this.taskService.getTaskForCollab(getTaskDto);
            const emptyCollab = await this.createCollab(taskForCollab.id);
            collab = await this.addUserToCollab(user.id, emptyCollab.id);
        }
        return {collab, user}
    }

    async inviteByHash(hash: string) {
        const collab = await this.getCollabByHash(hash);
        if (this.isCollabAvailable(collab.id)) {
            return collab;
        } else throw new BadRequestException("Collab is not available");
    }

    async joinAfterInvite(body) {
        const {createUserDto, collabId} = body;
        const user = await this.userService.createUser(createUserDto);
        const collab = await this.addUserToCollab(user.id, collabId);
        return {collab, user}
    }


    async getAvailableCollabByTask(getTaskDto: GetTaskDto) {
        try {
            const activeIsnotpassedCollabs = await this.prisma.collab.findMany({
                where: {
                    task: {
                        ...getTaskDto
                    },
                    isPassed: false,
                },
                include: {
                    user: true
                },
                orderBy: {createdAt: 'asc'},
            });
            return activeIsnotpassedCollabs.find(collab => collab.user.length <= 4);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async createCollab(taskId: number) {
        try {
            return this.prisma.collab.create({
                data: {
                    taskId: taskId,
                    hash: randomBytes(4).toString("hex")
                }
            });
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async addUserToCollab(userId: number, collabId: number) {
        if (await this.isCollabAvailable(collabId)) {
            try {
                await this.prisma.collabUser.create({
                    data: {
                        userId: userId,
                        collabId: collabId,
                    }
                });
            } catch (error) {
                console.error('Error creating collabUser:', error);
                throw new InternalServerErrorException('Error adding user to collab');
            }
            return await this.getCollabById(collabId)
        } else throw new BadRequestException("Collab is not available");

    }

    async updateCollab(collabId: number, UpdateCollabDto: UpdateCollabDto) {
        try {
            return this.prisma.collab.update({
                where: {
                    id: collabId
                },
                data: {
                    ...UpdateCollabDto,
                }
            });
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async getCollabById(collabId: number) {
        return this.prisma.collab.findUnique({
            where: {
                id: collabId
            },
            include: {
                task: true,
                Message: true,
                user: {
                    include: {
                        User: true, // Подгружаем данные пользователя через CollabUser
                    }
                },
            }
        });
    }

    async leaveUserFromCollab(collabId: number, userId: number): Promise<void> {
        await this.prisma.collabUser.delete({
            where: {
                userId_collabId: {userId: userId, collabId: collabId}
            },

        })
    }

    async getCollabByHash(hash: string) {
        return this.prisma.collab.findUnique({
            where: {
                hash: hash
            }
        })
    }

    async isCollabAvailable(collabId: number) {
        const collab = await this.getCollabById(collabId);
        //В предыдущей строке я использую getCollabById, т.е. получаю вообще все данные о collab'е. Достаточно получить
        // только isPassed и user
        return !collab.isPassed && collab.user.length <= 4;
    }

    async collabIsPassed(collabId: number) {
        await this.prisma.collab.update({
                where: {
                    id: collabId
                },
                data: {
                    isPassed: true
                }
            }
        )
    }


}






