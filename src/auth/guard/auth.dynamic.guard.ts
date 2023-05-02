import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LocalAuthGuard } from './auth.local.guard';
import { GoogleAuthGuard } from './auth.google.guard';

@Injectable()
export class DynamicAuthGuard implements CanActivate {
  constructor(
    private localAuthGuard: LocalAuthGuard,
    private googleAuthGuard: GoogleAuthGuard,
  ) {}

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
        return this.localAuthGuard;
      case 'google':
        return this.googleAuthGuard;
      default:
        return null;
    }
  }
}
