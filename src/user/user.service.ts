import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma.service';
import {hash} from 'argon2';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async getUserById(id: number) {
        return this.prisma.user.findUnique({
            where: {id: id},
        });
    }

    async getUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {email: email},

        });
    }

    async createUser(dto: CreateUserDto) {
        return this.prisma.user.create({
            data: {
                ...dto,
                password: dto?.password ? await hash(dto.password) : undefined,
            }
        });
    }



    async update(userId: number, dto: UpdateUserDto) {
        return this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...dto
            }
        });
    }
}