import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { parse } from 'url';
import { parse as parseQuery } from 'querystring';

@Injectable()
export class AuthGoogleGuard extends AuthGuard('google') {
  // canActivate(context: ExecutionContext) {
  //   const request = context.switchToHttp().getRequest();
  //   // 백엔드에서 구글 승인코드 바로 받을 때 활성화
  //   const { url } = request;
  //   const { query } = parse(url, true);
  //   const code = query.code;
  //   // const { code } = request.body;
  //   request.body = { ...request.body, code: code };
  //   console.log(code);
  //   return super.canActivate(context);
  // }
}
