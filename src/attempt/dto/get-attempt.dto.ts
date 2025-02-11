import { IsNotEmpty,  IsNumber } from 'class-validator';

export class GetAttemptDto {


    @IsNotEmpty()
    @IsNumber()
    collabId: number;


}
