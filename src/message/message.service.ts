import {ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {CreateMessageDto} from "./dto/create-message.dto";

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) {
    }

    async createMessage(dto: CreateMessageDto) {
        return this.prisma.message.create({
            data: {
                ...dto
            },
        });
    }

    async getMessagesByCollab(collabId: number) {
        return this.prisma.message.findMany({
            where: {collabId},
            orderBy: {updatedAt: 'asc'},
        });
    }

    async markAsRead(messageId: number) {
        return this.prisma.message.update({
            where: {id: messageId},
            data: {
                isRead: true
            }
        });
    }

    async deleteMessage(messageId: number, userId: number, forAnyOne: boolean) {
        const message = await this.prisma.message.findUnique({where: {id: messageId}});
        if (!message) throw new NotFoundException("Сообщения не существует")
        if (forAnyOne && message.userId == userId) {
            return this.prisma.message.delete({where: {id: messageId}});
        }
        else this.deleteAlienMessage(messageId, userId)
    }



    async deleteAlienMessage(messageId: number, userId: number) {
        return this.prisma.hiddenMessage.create({
            data: {
                messageId: messageId,
                userId: userId
            }
        })
    }


    // async updateMessage(messageId: number, userId: number, newContent: string) {
    //     const message = await this.prisma.message.findUnique({
    //         where: {
    //             id: messageId
    //         }
    //     });
    //
    //     if (message.userId !== userId) {
    //         throw new ForbiddenException('You can only edit your own messages');
    //     }
    //     return this.prisma.message.update({
    //         where: {id: messageId},
    //         data: {content: newContent},
    //     });
    // }

    async searchMessages(collabId: number, userId: number, query: string) {
        const collab = await this.prisma.collab.findUnique({
            where: {id: collabId},
            include: {user: true},
        });

        // Проверяем, что пользователь является членом чата
        if (!collab || !collab.user.some(user => user.userId === userId)) {
            throw new ForbiddenException('You are not a member of this collab');
        }

        return this.prisma.message.findMany({
            where: {
                collabId,
                content: {contains: query},
            },
        });
    }
}
