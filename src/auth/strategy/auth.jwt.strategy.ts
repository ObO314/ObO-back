import { Users } from './../../database/entities/Users';
import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable, Req, Res } from '@nestjs/common';
import { ExtractJwt, Strategy as StrategyJWT } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  AuthJwtInboundPort,
  AuthJwtLoginInboundPortInputDto,
  AuthJwtLoginInboundPortOutputDto,
  AuthJwtValidateInboundPortInputDto,
  AuthJwtValidateInboundPortOutputDto,
} from '../inbound-port/auth.jwt.strategy.inbound-port';
import { EntityManager } from '@mikro-orm/knex';
import { RefreshTokens } from 'src/database/entities/RefreshTokens';
import { Request, Response } from 'express';

@Injectable()
// implements AuthJwtInboundPort
export class JwtStrategy
  extends PassportStrategy(StrategyJWT)
  implements AuthJwtInboundPort
{
  constructor(
    private jwtService: JwtService,
    private readonly em: EntityManager,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRETKEY,
    });
  }

  async validate(
    payload: AuthJwtValidateInboundPortInputDto,
  ): Promise<AuthJwtValidateInboundPortOutputDto> {
    const { userId, tokenType, iat, exp } = payload;
    switch (tokenType) {
      case 'ACCESS':
        return { undefined, userId };
      case 'REFRESH':
        const foundUserToken = await this.em.findOne(RefreshTokens, {
          user: userId,
        });
        const savedUser = foundUserToken.user.id;
        const savedToken = foundUserToken.token;

        const validateUser = userId == savedUser;
        const decodedToken = this.jwtService.verify(savedToken);

        const validateToken =
          iat == decodedToken.iat && exp == decodedToken.exp;

        if (validateUser && validateToken) {
          const newAccessToken = this.jwtService.sign(
            { userId: userId, tokenType: 'ACCESS' },
            { expiresIn: '30m' },
          );
          return { newAccessToken, userId };
        }
    }
  }

  createToken(
    payload: AuthJwtLoginInboundPortInputDto,
  ): AuthJwtLoginInboundPortOutputDto {
    const userId = payload.userId;
    const accessToken = this.jwtService.sign(
      { userId: userId, tokenType: 'ACCESS' },
      { expiresIn: '30m' },
    );
    const refreshToken = this.jwtService.sign(
      { userId: userId, tokenType: 'REFRESH' },
      { expiresIn: '14d' },
    );
    this.em.upsert(RefreshTokens, { user: userId, token: refreshToken });
    const tokens = { accessToken, refreshToken };

    return tokens;
  }
}
