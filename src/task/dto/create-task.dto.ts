import {IsBoolean, IsNotEmpty, IsOptional, IsString} from "class-validator";


export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title:string


    @IsString()
    @IsNotEmpty()
    category:string

    @IsString()
    @IsNotEmpty()
    content:string

    @IsBoolean()
    @IsOptional()
    isDeleted:boolean

    @IsString()
    @IsNotEmpty()
    difficulty: string





}
