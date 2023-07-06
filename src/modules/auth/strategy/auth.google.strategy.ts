import {
  filter,
  isNull,
  map,
  pipe,
  take,
  throwIf,
  toArray,
  toAsync,
} from '@fxts/core';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import {
  AUTH_GOOGLE_STRATEGY_OUTBOUND_PORT,
  AuthGoogleStrategyOutboundPort,
} from '../outbound-port/auth.google.strategy.outbound-port';
import * as dotenv from 'dotenv';
dotenv.config();

export const GOOGLE = 'GOOGLE' as const;

@Injectable()
export class AuthGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(AUTH_GOOGLE_STRATEGY_OUTBOUND_PORT)
    private readonly authGoogleStrategyOutboundPort: AuthGoogleStrategyOutboundPort,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    const user = {
      email: profile.emails[0].value,
      nickname: profile.displayName,
      authMethod: GOOGLE,
    };
    // 회원 여부확인 후 반환, 없으면 가입후 반환

    return await pipe(
      { email: user.email, authMethod: GOOGLE },
      async (params) =>
        await this.authGoogleStrategyOutboundPort.findUser(params),
      throwIf(
        (user) => isNull(user),
        () => {
          throw new HttpException(
            '계정이 존재하지 않습니다.',
            HttpStatus.BAD_REQUEST,
          );
        },
      ),
      (user) =>
        done(null, {
          userId: user.id,
        }),
    );
  }
}
