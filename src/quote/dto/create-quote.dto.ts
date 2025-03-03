import {IsNotEmpty, IsString} from "class-validator";

export class CreateQuoteDto {
    @IsNotEmpty()
    @IsString()
    quote: string

    @IsNotEmpty()
    @IsString()
    author: string
}
