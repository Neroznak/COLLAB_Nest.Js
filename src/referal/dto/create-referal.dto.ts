import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateReferalDto {
    @IsNotEmpty()
    @IsString()
    collabHash:string

    @IsNotEmpty()
    @IsNumber()
    userId: number

}
