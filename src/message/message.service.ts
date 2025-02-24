import {ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {CreateMessageDto} from "./dto/create-message.dto";

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) {
    }

    async createMessage(dto: CreateMessageDto) {
        const isMember = await this.prisma.collabUser.findFirst({
            where: {userId: dto.userId, collabHash: dto.collabHash}
        });

        if (!isMember) {
            throw new Error("User is not a member of this collab.");
        }
        return this.prisma.message.create({
            data: {
                ...dto
            },
            include: {
                user: true
            }
        });
    }

    async getMessagesByCollab(collabHash: string) {
        return this.prisma.message.findMany({
            where: {collabHash},
            orderBy: {updatedAt: 'asc'},
            include: {
                user: true
            }
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
        } else this.deleteAlienMessage(messageId, userId)
    }


    async deleteAlienMessage(messageId: number, userId: number) {
        return this.prisma.hiddenMessage.create({
            data: {
                messageId: messageId,
                userId: userId
            }
        })
    }


    async searchMessages(collabHash: string, userId: number, query: string) {
        const collab = await this.prisma.collab.findUnique({
            where: {hash: collabHash},
            include: {user: true},
        });

        // Проверяем, что пользователь является членом чата
        if (!collab || !collab.user.some(user => user.userId === userId)) {
            throw new ForbiddenException('You are not a member of this collab');
        }

        return this.prisma.message.findMany({
            where: {
                collabHash,
                content: {contains: query},
            },
        });
    }
}
