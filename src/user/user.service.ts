import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma.service';
import {hash} from 'argon2';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

import {forwardRef, Inject } from '@nestjs/common';
import {CollabService} from "../collab/collab.service";
import {CollabGateway} from "../collab/collab.gateway";

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        @Inject(forwardRef(() => CollabService)) private readonly collabService: CollabService,
        @Inject(forwardRef(() => CollabGateway)) private readonly collabGateway: CollabGateway,
    ) {}

    async getUserById(userId: number) {
        return this.prisma.user.findUnique({
            where: {id: userId},
        });
    }

    async getUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {email: email},

        });
    }

    async createUser(dto?: CreateUserDto) {
        return this.prisma.user.create({
            data: {
                ...dto,
                password: dto?.password ? await hash(dto.password) : undefined,
            }
        });
    }

    async update(userId: number, dto: UpdateUserDto) {
        const user = this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...dto
            }
        });
        const collabUser = await this.prisma.collabUser.findFirst({
            where:{
                userId: (await user).id
            }
        })
        const users = await this.collabService.getAllUsersForCollab(collabUser.collabHash);
        this.collabGateway.server.to(collabUser.collabHash).emit('updateUsers', users);

        return user;
    }
}