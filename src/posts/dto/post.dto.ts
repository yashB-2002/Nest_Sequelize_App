import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class PostDTO {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsOptional()
  userId?: number;
}
