import {
    BadRequestException,
    ForbiddenException, forwardRef, Inject,
    Injectable,
    InternalServerErrorException
} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {UpdateCollabDto} from "./dto/update-collab.dto";
import {randomBytes} from "crypto";
import {GetTaskDto} from "../task/dto/get-task.dto";
import {TaskService} from "../task/task.service";
import {AuthService} from "../auth/auth.service";
import {GetCollabForUsersDto} from "./dto/get-collab-for-users.dto";
import {ReferalService} from "../referal/referal.service";
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {CollabGateway} from "./collab.gateway";

@Injectable()
export class CollabService {

    constructor(protected readonly prisma: PrismaService,
                private readonly taskService: TaskService,
                private readonly referalService: ReferalService,
                @Inject(forwardRef(() => UserService))  private readonly userService: UserService,
                @Inject(forwardRef(() => AuthService))  private readonly authService: AuthService,
                private readonly collabGateway: CollabGateway) {
    }

    async joinToCollab(createUserDto: CreateUserDto, getTaskDto: GetTaskDto) {
        const {user, accessToken} = await this.authService.register(createUserDto);
        const existCollab = await this.getAvailableCollabByTask(getTaskDto);
        let collab;
        if (existCollab) {
            collab = await this.addUserToCollab(user.id, existCollab.hash);
        } else {
            const taskForCollab = await this.taskService.getTaskForCollab(getTaskDto);
            const emptyCollab = await this.createCollab(taskForCollab.id);
            collab = await this.addUserToCollab(user.id, emptyCollab.hash);
        }
        return {collab, user, accessToken}
    }

    async getCollabForUser(dto: GetCollabForUsersDto) {
        const {collabHash, userId, referal} = dto;
        if (userId && await this.isUserInCollab(userId, collabHash)) {
            const collab = await this.getCollabByHash(collabHash)
            const isUserNew = false;
            const user = await this.userService.getUserById(userId)
            return {collab, isUserNew, user}
        }
        if (referal && await this.referalService.isReferalLinkCorrect(referal, collabHash)) {
            const {user, accessToken} = await this.authService.register();
            const collabWithUser = await this.addUserToCollab(user.id, collabHash)
            const collab = await this.getCollabByHash(collabWithUser.hash)
            const isUserNew = true;
            return {collab, isUserNew, user, accessToken}
        } else throw new ForbiddenException('У вас нет доступа к этому ресурсу');

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
            console.log("в emit уйдут вот такие user'ы: - ", JSON.stringify(users))
            this.collabGateway.server.to(collabHash).emit('updateUsers', users);
            return await this.getCollabByHash(collabHash)
        } else throw new BadRequestException("Collab is not available");

    }

    async updateCollab(collabHash: string, UpdateCollabDto: UpdateCollabDto) {
        try {
            return this.prisma.collab.update({
                where: {
                    hash: collabHash
                },
                data: {
                    ...UpdateCollabDto,
                }
            });
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async getCollabByHash(hash: string) {
        return this.prisma.collab.findUnique({
            where: {
                hash: hash
            },
            include: {
                task: true,
                Message: true,
            }
        })
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
            where:{
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

    async isUserInCollab(userId: number, collabHash: string) {
        const user = this.prisma.collabUser.findFirst({
            where: {
                collabHash: collabHash,
                userId: userId
            }
        })
        return !!user;


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

        return  usersInCollab.map(collabUser => ({
            id: collabUser.User.id,
            profilePictureUrl: collabUser.User.profilePictureUrl,
            userName: collabUser.User.userName
        }));
    }

}






