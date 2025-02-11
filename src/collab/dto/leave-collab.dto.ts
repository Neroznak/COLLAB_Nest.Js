import {IsNumber} from "class-validator";

export class LeaveCollabDto {
    @IsNumber()
    collabId: number

    @IsNumber()
    userId: number

}
