import { IsString} from "class-validator";

export class GetCollabDto {
    @IsString()
    collabHash: string

}
