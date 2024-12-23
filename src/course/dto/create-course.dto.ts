import {IsEnum, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Categories} from "../../enums/categories.enum";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty({message: 'Course must contained a title'})
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(Categories, {message: 'Category must be only at list'})
    category: Categories;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    duration: string;

    @IsString()
    @IsNotEmpty()
    imageUrl: string;

    @IsString()
    videoPreviewUrl: string;

    @IsString()
    @IsNotEmpty()
    structure: string;
}
