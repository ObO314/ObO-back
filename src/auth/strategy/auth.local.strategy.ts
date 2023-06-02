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
  map,
  pipe,
  take,
  tap,
  toArray,
  toAsync,
} from '@fxts/core';
import {
  AUTH_LOCAL_STRATEGY_OUTBOUND_PORT,
  AuthLocalStrategyOutboundPort,
  AuthLocalStrategyOutboundPortInputDto,
} from '../outbound-port/auth.local.strategy.outbound-port';
import { executeOrThrowError } from 'src/utilities/executeThrowError';

@Injectable()
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
    //
    const checkPasswordOrError = executeOrThrowError(
      bcrypt.compare,
      '비밀번호가 틀렸습니다.',
    );

    //
    try {
      return (
        await pipe(
          [email],
          toAsync,
          map((email) =>
            this.authLocalStrategyOutboundPort.findUser({ email }),
          ),
          filter(
            async (user) => await checkPasswordOrError(password, user.password),
          ),
          take(1),
          toArray,
        )
      )[0];
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
