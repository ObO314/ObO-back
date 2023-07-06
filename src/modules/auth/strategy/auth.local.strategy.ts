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
  take,
  tap,
  throwIf,
  toArray,
  toAsync,
} from '@fxts/core';
import {
  AUTH_LOCAL_STRATEGY_OUTBOUND_PORT,
  AuthLocalStrategyOutboundPort,
  AuthLocalStrategyOutboundPortInputDto,
} from '../outbound-port/auth.local.strategy.outbound-port';

export const LOCAL = 'LOCAL' as const;

export class AuthLocalStrategy
  extends PassportStrategy(StrategyLOCAL)
  implements AuthLocalStrategyInboundPort
{
  constructor(
    @Inject(AUTH_LOCAL_STRATEGY_OUTBOUND_PORT)
    private readonly authLocalStrategyOutboundPort: AuthLocalStrategyOutboundPort,
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(
    email: AuthLocalStrategyInboundPortInputEmailDto,
    password: AuthLocalStrategyInboundPortInputPasswordDto,
  ): Promise<AuthLocalStrategyInboundPortOutputDto> {
    return await pipe(
      [{ email, password, authMethod: LOCAL }],
      toAsync,
      map(async (params) => {
        return {
          user: await this.authLocalStrategyOutboundPort.findUser({
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
