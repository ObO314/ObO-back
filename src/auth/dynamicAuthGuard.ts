// import { LocalStrategy } from './local/strategy/auth.local.strategy';
// import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
// import { LocalAuthGuard } from './local/guard/auth.local.guard';
// import { Observable } from 'rxjs';
// import { GoogleAuthGuard } from './google/guard/auth.google.guard';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class DynamicAuthGuard implements CanActivate {
//   constructor(

//   ) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const guard = this.getGuard(context);
//     return guard ? guard.canActivate(context) : false;
//   }

//   private getGuard(context: ExecutionContext): CanActivate {
//     const request = context.switchToHttp().getRequest();

//     class LocalGuard extends AuthGuard('local'){}
//     class GoogleGuard extends AuthGuard('google'){}

//     switch (request.path.split('/').pop()) {
//       case 'local':
//         return new LocalAuthGuard
//       case 'google':
//         return new GoogleGuard
//       default:
//         return null;
//     }
//   }

// }

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
