import { IsBoolean,IsOptional } from 'class-validator';
import { ToBoolean } from '../validators/boolean.decorator'

export class PathParamsDto {
    @IsOptional()
  @ToBoolean()
  isActive?: boolean;
}
