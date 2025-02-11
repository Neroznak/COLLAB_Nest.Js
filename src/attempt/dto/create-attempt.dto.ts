import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateAttemptDto {
    @IsNotEmpty()
    @IsString()
    userAnswer: string;

    @IsNotEmpty()
    @IsNumber()
    collabId: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
