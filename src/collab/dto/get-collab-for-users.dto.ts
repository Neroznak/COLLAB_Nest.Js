import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class GetCollabForUsersDto {

    @IsString()
    @IsNotEmpty()
    collabHash: string

    @IsNumber()
    @IsOptional()
    userId: number

    @IsString()
    @IsOptional()
    referal: string

}
