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

import * as dotenv from 'dotenv';
import {
  AUTH_CREATE_USER_OUTBOUND_PORT,
  AuthCreateUserOutboundPort,
} from '../outbound-port/auth.create-user.outbound-port';
import {
  AUTH_FIND_USER_OUTBOUND_PORT,
  AuthFindUserOutboundPort,
} from '../outbound-port/auth.find-user.outbound-port';
dotenv.config();

export const GOOGLE = 'GOOGLE' as const;

@Injectable()
export class AuthGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(AUTH_CREATE_USER_OUTBOUND_PORT)
    private readonly authCreateUserOutboundPort: AuthCreateUserOutboundPort,
    @Inject(AUTH_FIND_USER_OUTBOUND_PORT)
    private readonly authFindUserOutboundPort: AuthFindUserOutboundPort,
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
    const userInfo = {
      email: profile.emails[0].value,
      nickname: profile.displayName,
      authMethod: GOOGLE,
    };
    // 회원 여부확인 후 반환, 없으면 가입후 반환

    async (userInfo) => {
      const user = await this.authFindUserOutboundPort.execute(userInfo);
      if (user) {
        return done(null, { userId: user.id });
      } else {
        const newUser = await this.authCreateUserOutboundPort.execute(userInfo);
        return done(null, { userId: newUser.id });
      }
    };
  }
}
