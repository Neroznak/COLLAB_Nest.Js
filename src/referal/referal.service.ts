import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {CreateReferalDto} from "./dto/create-referal.dto";
import {randomBytes} from "crypto";


@Injectable()
export class ReferalService {

    constructor(private prisma: PrismaService) {
    }

    async create(createReferalDto: CreateReferalDto) {
        const futureDate = new Date();
        futureDate.setHours(futureDate.getHours() + 2);
        const timestampISO = futureDate.toISOString();
        const referal = randomBytes(8).toString("hex")
        return this.prisma.referal.create({
            data: {
                expires: timestampISO,
                collabHash: createReferalDto.collabHash,
                userId: createReferalDto.userId,
                referal: referal
            }
        });
    }

    async isReferalLinkCorrect(referal: string, collabHash: string) {
        const referalData = await this.prisma.referal.findFirst({
            where: {
                referal: referal,
                collabHash: collabHash
            },
        });
        if (!referalData) return false; // Если ссылка не найдена, возвращаем false

        return referalData.expires.getTime() > Date.now(); // Проверяем, не истек ли срок
    }


}
