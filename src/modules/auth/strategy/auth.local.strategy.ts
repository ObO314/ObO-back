import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as StrategyLOCAL } from 'passport-local';
import { Users } from 'src/database/entities/Users';
import {
  AuthLocalStrategyInboundPort,
  AuthLocalStrategyInboundPortInputEmailDto,
  AuthLocalStrategyInboundPortInputPasswordDto,
  AuthLocalStrategyInboundPortOutputDto,
} from '../inbound-port/auth.local.strategy.inbound-port';
import * as bcrypt from 'bcrypt';
import {
  filter,
  flatMap,
  head,
  map,
  pipe,
  throwIf,
  toArray,
  toAsync,
} from '@fxts/core';
import {
  AUTH_FIND_USER_OUTBOUND_PORT,
  AuthFindUserOutboundPort,
} from '../outbound-port/auth.find-user.outbound-port';

export const LOCAL = 'LOCAL' as const;

export class AuthLocalStrategy
  extends PassportStrategy(StrategyLOCAL)
  implements AuthLocalStrategyInboundPort
{
  constructor(
    @Inject(AUTH_FIND_USER_OUTBOUND_PORT)
    private readonly authFindUserOutboundPort: AuthFindUserOutboundPort,
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(
    email: AuthLocalStrategyInboundPortInputEmailDto,
    password: AuthLocalStrategyInboundPortInputPasswordDto,
  ): Promise<AuthLocalStrategyInboundPortOutputDto> {
    // 로컬에서는 유저를 찾아 비밀번호를 비교한 후, 일치하면 userId를 반환해준다.
    return await pipe(
      [{ email, password, authMethod: LOCAL }],
      toAsync,
      map(async (params) => {
        return {
          user: await this.authFindUserOutboundPort.execute({
            email: params.email,
            authMethod: params.authMethod,
          }),
          params: params,
        };
      }),
      filter(async ({ user, params }) => {
        if (await bcrypt.compare(params.password, user.password)) {
          return true;
        } else {
          throw new HttpException(
            '비밀번호가 틀렸습니다.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      map(({ user, params }) => {
        return { userId: user.id };
      }),
      head,
    );
  }
}
