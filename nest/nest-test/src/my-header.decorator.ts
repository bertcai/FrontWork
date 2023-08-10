import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const MyHeader = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    // console.log('MyHeader', request.headers);
    return key ? request.headers[key] : request.headers;
  },
);
