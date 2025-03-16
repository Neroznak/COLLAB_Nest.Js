import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsNotEmpty, IsObject,
    IsOptional,
    IsString,
} from "class-validator";
import {Categories, Difficulty} from "@prisma/client";

export class CreateTaskDto {
    @IsEnum(Categories)
    @IsNotEmpty()
    category:Categories

    @IsEnum(Difficulty)
    @IsNotEmpty()
    difficulty: Difficulty

    @IsString()
    @IsNotEmpty()
    title:string

    @IsString()
    @IsNotEmpty()
    content:string

    @IsBoolean()
    @IsOptional()
    isDeleted:boolean

    @IsArray()
    @IsNotEmpty()
    @IsObject({ each: true })  // Для каждого объекта в массиве применяем валидацию
    testCases: TestCase[];

    @IsString()
    @IsNotEmpty()
    author: string

    @IsString()
    @IsNotEmpty()
    name: string

}

export class TestCase {
    @IsArray()
    @IsNotEmpty()
    input: (number | string | number[] | string[] | [number[], number] | [string[], string])[];
    @IsNotEmpty()
    expected: (number | string | number[] | string[] | [number[], number] | [string[], string])[]
}

