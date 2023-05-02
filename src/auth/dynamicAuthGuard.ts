import { LocalAuthGuard } from './local/guard/auth.local.guard';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GoogleAuthGuard } from './google/guard/auth.google.guard';

@Injectable()
export class DynamicAuthGuard implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const guard = this.getGuard(context);
    return guard ? guard.canActivate(context) : false;
  }

  private getGuard(context: ExecutionContext): CanActivate {
    const request = context.switchToHttp().getRequest();

    switch (request.path.split('/').pop()) {
      case 'local':
        return new LocalAuthGuard();
      case 'google':
        return new GoogleAuthGuard();
      default:
        return null;
    }
  }
}
