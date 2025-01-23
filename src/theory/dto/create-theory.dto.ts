import {IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Categories} from "../../enums/categories.enum";

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
