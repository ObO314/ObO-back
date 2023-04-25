export type AuthJwtInboundPortInputDto = {
  email: string;
  password: string;
};

export type AuthJwtInboundPortOutputDto = {
  accessToken: string;
};

export const AUTH_JWT_INBOUND_PORT = 'AUTH_JWT_INBOUND_PORT' as const;

export interface UserLoginInboundPort {
  execute(
    params: AuthJwtInboundPortInputDto,
  ): Promise<AuthJwtInboundPortOutputDto>;
}
