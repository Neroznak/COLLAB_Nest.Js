import {IsNumber, IsString} from "class-validator";

export class LeaveCollabDto {
    @IsString()
    collabHash: string

    @IsNumber()
    userId: number

}
