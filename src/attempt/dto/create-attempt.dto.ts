import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateAttemptDto {
    @IsNotEmpty()
    @IsString()
    userAnswer: string;

    @IsNotEmpty()
    @IsString()
    collabHash: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
    