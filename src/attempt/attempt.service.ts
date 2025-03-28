import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import * as ivm from 'isolated-vm';
import {CreateAttemptDto} from "./dto/create-attempt.dto";
import * as ts from 'typescript'
import {CollabService} from "../collab/collab.service";
import {TestCase} from "../task/dto/create-task.dto";
import { isEqual } from 'lodash';


@Injectable()
export class AttemptService {

    constructor(private prisma: PrismaService,
                private collabService: CollabService) {
    }

    async execute(dto: CreateAttemptDto) {
        const {userAnswer, collabHash, userId} = dto;
        const {isPassed, output:initialOutput, maxExecutionTime} = await this.checkUserAnswer(userAnswer, collabHash);
        const executionTime = maxExecutionTime;
        let output;
        if(initialOutput == "Illegal return statement [<isolated-vm>:3:17]")  output = "Error in code execution. Please return to the source code.";
        else  output = initialOutput;
        if(isPassed) {
            await this.collabService.collabIsPassed(collabHash);
        }
        const dataForCreateAttempt = {
            userAnswer,
            collabHash,
            userId,
            isPassed,
            output,
            executionTime,
        };
        return this.createAttemp(dataForCreateAttempt)
    }

    async checkUserAnswer(userAnswer: string, collabHash: string) {
        const collab = await this.collabService.getCollabByHash(collabHash);
        const testCases = collab.task.testCases;
        try {
            const jsCode = ts.transpile(userAnswer);
            const isolate = new ivm.Isolate({memoryLimit: 8}); // Ограничиваем память в 8MB
            const context = await isolate.createContext();
            let wrappedCode;
            const functionNameMatch = jsCode.trim().match(/^function (\w+)/);
            const functionName = functionNameMatch ? functionNameMatch[1] : null;
            if (functionName) {
                wrappedCode = `'use strict';
                (function() {
                ${jsCode} // Здесь уже чистый JavaScript-код
                return ${functionName}; })(); `;
            } else {
                wrappedCode = `
                'use strict';
                return (${jsCode}); // Возвращаем результат выполнения стрелочной функции`;
            }
            const script = await isolate.compileScript(wrappedCode);
            const userFunctionRef = await script.run(context);

            // Запускаем тесты внутри песочницы
            let isPassed = false;
            let executionTime;
            let maxExecutionTime = 0; // Максимальное время выполнения
            const output = [];
            const parsedTestCases = Array.isArray(testCases) ? (testCases as unknown as TestCase[]) : [];
            for (const {input, expected} of parsedTestCases) {
                try {
                    const start = Date.now();
                    const check = await userFunctionRef.apply(undefined, input, {timeout: 10000}); // Ограничение по времени
                    const finish = Date.now();
                    isPassed = isEqual(check, expected);
                    output.push(check);
                    executionTime = finish - start;
                    maxExecutionTime = Math.max(maxExecutionTime, executionTime);
                    if (!isPassed) break;
                } catch (executionError) {
                    output.push(executionError.message);
                }
            }
            return {isPassed, output, maxExecutionTime};
        } catch (compilationError) {
            return {isPassed: false, output: compilationError.message};
        }
    }

    async createAttemp(dataForCreateAttempt) {
        return this.prisma.attempt.create({
            data: {
                ...dataForCreateAttempt
            }
        });
    }

    async getAllAttemptsByCollab(collabHash: string) {
        return this.prisma.attempt.findMany({
            where: {
                collabHash: collabHash
            },
            orderBy:{
                createdAt: "desc"
            }
        });
    }

}