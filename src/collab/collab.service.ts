import {
    BadRequestException, forwardRef, Inject,
    Injectable,
    InternalServerErrorException
} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {randomBytes} from "crypto";
import {TaskService} from "../task/task.service";
import {AuthService} from "../auth/auth.service";
import {ReferalService} from "../referal/referal.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {CollabGateway} from "./collab.gateway";
import {GetReferalDto} from "../referal/dto/get-referal.dto";
import { Categories, Difficulty } from '@prisma/client'; // Импортируем enum из Prisma


@Injectable()
export class CollabService {

    constructor(protected readonly prisma: PrismaService,
                private readonly taskService: TaskService,
                private readonly referalService: ReferalService,
                @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
                private readonly collabGateway: CollabGateway) {
    }

    async joinToCollab(createUserDto: CreateUserDto) {
        const {user, accessToken} = await this.authService.register(createUserDto);
        const existCollab = await this.getAvailableCollabByTask();
        let collabHash;
        if (existCollab) {
            const collab = await this.addUserToCollab(user.id, existCollab.hash);
            collabHash = collab.hash;

        } else {
            const taskForCollab = await this.taskService.getTaskForCollab();
            const emptyCollab = await this.createCollab(taskForCollab.id);
            const collab = await this.addUserToCollab(user.id, emptyCollab.hash);
            collabHash = collab.hash;
        }
        return {collabHash, accessToken}
    }

    async invite(dto: GetReferalDto) {
        const referal = dto.referal;
        const isReferalNotExpired = await this.referalService.isReferalLinkCorrect(referal);
        if (!isReferalNotExpired) throw new BadRequestException("Время действия ссылки закончилось")
        const collabHash = await this.referalService.getCollabHashByReferal(referal);
        const {user, accessToken} = await this.authService.register();
        const collabWithUser = await this.addUserToCollab(user.id, collabHash)
        const collab = await this.getCollabByHash(collabWithUser.hash)
        return {collab, accessToken}
    }

    async getCollab(collabHash: string, userId: number) {
        const collab = await this.getCollabByHash(collabHash);
        const collabUser = await this.prisma.collabUser.findFirst({
            where: {
                collabHash: collabHash,
                userId: userId
            }
        });
        if (!collabUser) throw new BadRequestException("User is not in collab")
        return collab;


    }

    async getAvailableCollabByTask() {
        const getTaskDto = {
            category: Categories.TYPESCRIPT,
            difficulty: Difficulty.JUNIOR,
            title : "Простые функции"
        }
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

    async addUserToCollab(userId: number, collabHash: string) {
        if (await this.isCollabAvailable(collabHash)) {
            try {
                await this.prisma.collabUser.create({
                    data: {
                        userId: userId,
                        collabHash: collabHash,
                    }
                });
            } catch (error) {
                console.error('Error creating collabUser:', error);
                throw new InternalServerErrorException('Error adding user to collab');
            }
            const users = await this.getAllUsersForCollab(collabHash);
            this.collabGateway.server.to(collabHash).emit('updateUsers', users);
            return await this.getCollabByHash(collabHash)
        } else throw new BadRequestException("Collab is not available");

    }

    async getCollabByHash(hash: string) {
        const collab = await this.prisma.collab.findUnique({
            where: {
                hash: hash
            },
            include: {
                task: true,
                Message: true,
            }
        })
        if(!collab) throw new BadRequestException("Collab not found");
        return collab;
    }

    async leaveUserFromCollab(userId: number, collabHash: string): Promise<void> {
        await this.prisma.collabUser.delete({
            where: {
                userId_collabHash: {userId: userId, collabHash: collabHash}
            },

        })
        const users = await this.getAllUsersForCollab(collabHash);
        this.collabGateway.server.to(collabHash).emit('updateUsers', users);
    }

    async isCollabAvailable(collabHash: string) {
        const collab = await this.getCollabByHash(collabHash);
        const users = await this.prisma.collabUser.findMany({
            where: {
                collabHash: collabHash
            }
        })
        return !collab.isPassed && users.length <= 4;
    }

    async collabIsPassed(collabHash: string) {
        await this.prisma.collab.update({
                where: {
                    hash: collabHash
                },
                data: {
                    isPassed: true
                }
            }
        )
    }

    async getAllUsersForCollab(collabHash: string) {
        const usersInCollab = await this.prisma.collabUser.findMany({
            where: {collabHash: collabHash},
            select: {
                User: {
                    select: {
                        id: true,
                        profilePictureUrl: true,
                        userName: true
                    }
                }
            }
        });

        return usersInCollab.map(collabUser => ({
            id: collabUser.User.id,
            profilePictureUrl: collabUser.User.profilePictureUrl,
            userName: collabUser.User.userName
        }));
    }

}






