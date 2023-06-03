export type AuthJwtValidateInboundPortInputDto = { userId: string };

export type AuthJwtValidateInboundPortOutputDto = {};

export type AuthJwtLoginInboundPortInputDto = {
  email: string;
  password: string;
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
