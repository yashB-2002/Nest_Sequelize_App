import { IsOptional, IsBoolean } from 'class-validator';
import { ToBoolean } from '../validators/boolean.decorator';

export class QueryDto {
  @IsOptional()
  @ToBoolean()
  isActive?: boolean;
}
