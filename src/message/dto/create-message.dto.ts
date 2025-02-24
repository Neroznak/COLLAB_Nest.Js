import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string; // Текст сообщения

  @IsInt()
  userId: number; //  ID пользователя

  @IsString()
  collabHash: string; //  ID чата

}
