import {IsNotEmpty, IsString} from 'class-validator';

export class GetAttemptDto {


    @IsNotEmpty()
    @IsString()
    collabHash: string;


}
