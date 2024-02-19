import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from '../enums/valid-roles.enum';

export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException(
        'No user inside the request - make sure that we used the AuthGuard',
      );
    }

    if (roles.length === 0) return user;

    for (const role of user.roles) {
      if (roles.includes(role)) return user;
    }

    throw new ForbiddenException(
      `User ${user.fullName} does not have the necessary roles to perform this action`,
    );
  },
);
