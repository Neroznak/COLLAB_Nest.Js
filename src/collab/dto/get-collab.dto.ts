import {IsNumber} from "class-validator";

export class GetCollabDto {
    @IsNumber()
    collabId: number

}
