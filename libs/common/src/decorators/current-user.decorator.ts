import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDto } from '@app/common';

const getCurrentUserByContext = (context: ExecutionContext): UserDto => {
  const request = context.switchToHttp().getRequest();
  return request.user ?? null;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
