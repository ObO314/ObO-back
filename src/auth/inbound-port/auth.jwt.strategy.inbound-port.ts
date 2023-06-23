import { RefreshTokens } from './../../database/entities/RefreshTokens';
import { Request, Response } from 'express';
import { Users } from 'src/database/entities/Users';

export type AuthJwtValidateInboundPortInputDto = {
  userId: string;
  tokenType: string;
  iat: string;
  exp: string;
};

export type AuthJwtValidateInboundPortOutputDto = {};

export type AuthJwtLoginInboundPortInputDto = {
  userId: string;
};

export type AuthJwtLoginInboundPortOutputDto = {
  accessToken: string;
  refreshToken: string;
};

export const AUTH_JWT_INBOUND_PORT = 'AUTH_JWT_INBOUND_PORT' as const;

export interface AuthJwtInboundPort {
  validate(
    payload: AuthJwtValidateInboundPortInputDto,
    req: Request,
    res: Response,
  ): Promise<AuthJwtValidateInboundPortOutputDto>;

  createToken(
    userId: AuthJwtLoginInboundPortInputDto,
  ): AuthJwtLoginInboundPortOutputDto;
}
