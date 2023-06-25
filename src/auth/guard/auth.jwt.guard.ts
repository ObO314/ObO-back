import { JwtStrategy } from 'src/auth/strategy/auth.jwt.strategy';
import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthJwtGuard extends AuthGuard('jwt') implements CanActivate {
  constructor() {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isValid = (await super.canActivate(context)) as boolean;

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const newAccessToken = request.user.newAccessToken;
    const userId = request.user.userId;

    if (newAccessToken) {
      response.setHeader('Authorization', `Bearer ${newAccessToken}`);
    }
    request.user = userId;

    return isValid;
  }
}
