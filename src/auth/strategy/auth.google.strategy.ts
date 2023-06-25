import { filter, map, pipe, take, toArray, toAsync } from '@fxts/core';
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
      clientID:
        '709696078484-6gtqt51vusii3ag8uaih73lerdflvp47.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/user/login/google',
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
    try {
      const tofinduser = { email: user.email, authMethod: GOOGLE };
      const userId = await this.authGoogleStrategyOutboundPort.findUser(
        tofinduser,
      );
      return done(null, {
        userId: userId,
      });
    } catch (err) {
      if (err.message == '계정이 존재하지 않습니다.') {
        const newUser = await this.authGoogleStrategyOutboundPort.signUp(user);
        return done(null, {
          userId: newUser.id,
        });
      }
    }
  }
}
