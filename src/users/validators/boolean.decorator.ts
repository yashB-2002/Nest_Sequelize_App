import { createParamDecorator, ExecutionContext,  } from '@nestjs/common';
import { ParseBooleanPipe } from './boolean-pipe';

export const BooleanField = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    
    const sources = [request.query, request.body];
    const pipe = new ParseBooleanPipe();
    
    let value: any = undefined;

    for (const source of sources) {
      if (source[data] !== undefined) {
        try {
          value = pipe.transform(source[data]);
        } catch (e) {
          throw new BadRequestException(`Invalid boolean value for '${data}'`);
        }
      }
    }

    if (value === undefined) {
      throw new BadRequestException(`'${data}' field is required.`);
    }

    return value;
  },
);

import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export function ToBoolean() {
  return Transform(({ value }) => {
    if (value === null || value === undefined) return undefined;

    if (typeof value === 'boolean') return value;

    if (typeof value === 'string') {
      value = value.trim().toLowerCase();
      if (value === 'true') return true;
      if (value === 'false') return false;

      throw new BadRequestException(`Invalid boolean string value: ${value}`);
    }

    throw new BadRequestException(`Invalid boolean value type: ${typeof value}`);
  });
}

