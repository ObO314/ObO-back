import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthJwtGuard extends AuthGuard('jwt') implements CanActivate {
  constructor() {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isValid = (await super.canActivate(context)) as boolean;

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const newAccessToken = request.user.newAccessToken;
    const userId: string = request.user.userId;

    if (newAccessToken) {
      response.setHeader('Authorization', `Bearer ${newAccessToken}`);
    }
    request.user = userId;

    return isValid;
  }
}
