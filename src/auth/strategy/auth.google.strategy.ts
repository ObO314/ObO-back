import { filter, map, pipe, take, toArray, toAsync } from '@fxts/core';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import {
  AUTH_GOOGLE_STRATEGY_OUTBOUND_PORT,
  AuthGoogleStrategyOutboundPort,
} from '../outbound-port/auth.google.strategy.outbound-port';

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
      callbackURL: process.env.GOOGLE_HOST,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    //, name: profile.displayName

    // 아웃바운드인 레포지토리에서 유저를 찾음
    try {
      const user = { email: profile.emails[0].value, AuthMethod: GOOGLE };
      const userId = (
        await pipe(
          [user],
          toAsync,
          map((email) =>
            this.authGoogleStrategyOutboundPort.findUser({ email }),
          ),
          take(1),
          toArray,
        )
      )[0].userId;
      return done(null, {
        userId: userId,
        email: user.email,
        AuthMethod: GOOGLE,
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
