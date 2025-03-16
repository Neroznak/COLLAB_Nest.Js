import {IsNotEmpty, IsString} from "class-validator";

export class GetReferalDto {

    @IsNotEmpty()
    @IsString()
    referal: string;


}
