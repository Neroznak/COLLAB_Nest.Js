import {IsString} from "class-validator";

export class UpdateCollabDto  {
    @IsString()
    name: string;

    @IsString()
    language: string;

}
