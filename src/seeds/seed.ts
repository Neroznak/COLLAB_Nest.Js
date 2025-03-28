import { PrismaClient, Categories, Difficulty  } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.task.create({
        data: {
            category:Categories.TYPESCRIPT,
            content: "Define a function that performs addition of two numbers.",
            isDeleted: false,
            difficulty: Difficulty.JUNIOR,
            author: "Dmitry N.",
            name: "Сложение двух чисел",
            title: "Простые функции",
            initial_data: "function add (a:number, b:number) {\n" +
                "\treturn ВАШ КОД ВВЕДИТЕ ЗДЕСЬ;\n" +
                "}",
            testCases: [{"input":[2,3],"expected":5},{"input":[100,5],"expected":105}]
        },
    });
    await prisma.task.create({
        data: {
            category:Categories.TYPESCRIPT,
            content: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n" +
                "\n" +
                "You may assume that each input would have exactly one solution, and you may not use the same element twice.\n" +
                "\n" +
                "You can return the answer in any order.",
            isDeleted: false,
            difficulty: Difficulty.JUNIOR,
            author: "LeetCode",
            name: "Проблема сложения двух чисел",
            title: "Простые функции",
            initial_data: "function twoSum(nums: number[], target: number): number[] {\n" +
                "    \n" +
                "};",
            testCases: [{"input":[[2,7,11,15],9],"expected":[0,1]},{"input":[[3,2,4],6],"expected":[1,2]},{"input":[[3,3],6],"expected":[1,0]}]
        },
    });

}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
