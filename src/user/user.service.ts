import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { hash } from 'argon2';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}


  async getById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },

    });
    return user;
  }

  async create(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password),
      }
    });
  }

  async update(userId: number ,dto: UpdateUserDto) {
    return this.prisma.user.update({
      where:  {
        id: userId
      },
      data: {
        ...dto
      }
    });
  }
}