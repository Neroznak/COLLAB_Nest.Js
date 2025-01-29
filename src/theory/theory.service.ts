import {Injectable} from '@nestjs/common';
import {CreateTheoryDto} from './dto/create-theory.dto';
import {UpdateTheoryDto} from './dto/update-theory.dto';
import {PrismaService} from "../prisma.service";
import {Categories} from "@prisma/client";

@Injectable()
export class TheoryService {

    constructor(private prisma: PrismaService) {
    }

    async create(createTheoryDto: CreateTheoryDto) {
        return this.prisma.theory.create({
            data: {
                ...createTheoryDto,
            }
        })
    }

    async findByTask(taskId: number) {
        return this.prisma.taskTheory.findMany({
            where: {
                taskId: taskId
            }
        })
    }

    async findByCategory(category: Categories) {
        return this.prisma.theory.findMany({
            where: {
                category: category
            }
        })
    }

    async update(theoryId: number, updateTheoryDto: UpdateTheoryDto) {
        return this.prisma.theory.update({
            where: {
                id: theoryId,
            },
            data: {
                ...updateTheoryDto,
            }
        })
    }

    async remove(theoryId: number) {
    return this.prisma.theory.update({
      where: {
        id: theoryId,
      },
      data: {
        isDeleted: true,
      }
    })
  }
}
