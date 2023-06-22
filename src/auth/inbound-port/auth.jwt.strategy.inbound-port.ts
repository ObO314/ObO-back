import { Users } from 'src/database/entities/Users';

export type AuthJwtValidateInboundPortInputDto = { id: string };

export type AuthJwtValidateInboundPortOutputDto = { id: string };

export type AuthJwtLoginInboundPortInputDto = {
  id: string;
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
