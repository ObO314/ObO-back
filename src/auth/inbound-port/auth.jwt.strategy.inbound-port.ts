import { Users } from 'src/database/entities/Users';

export type AuthJwtValidateInboundPortInputDto = { userId: string };

export type AuthJwtValidateInboundPortOutputDto = { userId: string };

export type AuthJwtLoginInboundPortInputDto = {
  userId: string;
};

export type AuthJwtLoginInboundPortOutputDto = {
  accessToken: string;
};

export const AUTH_JWT_INBOUND_PORT = 'AUTH_JWT_INBOUND_PORT' as const;

export interface AuthJwtInboundPort {
  validate(
    payload: AuthJwtValidateInboundPortInputDto,
  ): Promise<AuthJwtValidateInboundPortOutputDto>;

  createToken(
    userId: AuthJwtLoginInboundPortInputDto,
  ): AuthJwtLoginInboundPortOutputDto;
}
