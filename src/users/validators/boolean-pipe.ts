import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseBooleanPipe implements PipeTransform {
  transform(value: any): boolean {
    if (typeof value === 'boolean') {
      return value;
    }

    if (typeof value === 'string') {
      value = value.toLowerCase();
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      }
    }

    throw new BadRequestException(`Invalid boolean value: ${value}`);
  }
}
