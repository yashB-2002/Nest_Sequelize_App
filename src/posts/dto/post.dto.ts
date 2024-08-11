import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class PostDTO {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  fileName?: string; 

  @IsNumber()
  @IsOptional()
  userId?: number;
}
