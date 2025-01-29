import {IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Categories} from "@prisma/client";

export class CreateTheoryDto {

    @IsString()
    @IsNotEmpty()
    title:string


    @IsEnum(Categories)
    @IsNotEmpty()
    category:Categories

    @IsString()
    @IsNotEmpty()
    content:string

    @IsBoolean()
    @IsOptional()
    isDeleted:boolean




}
