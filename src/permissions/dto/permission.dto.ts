import { IsString, IsNotEmpty } from 'class-validator';

export class PermissionDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
