export type AuthLocalInboundPortInputDto = {
  email: string;
  password: string;
};

export type AuthLocalInboundPortOutputDto = {};

export const AUTH_LOCAL_INBOUND_PORT = 'AUTH_LOCAL_INBOUND_PORT' as const;

export interface AuthLocalInboundPort {
  validate(
    params: AuthLocalInboundPortInputDto,
  ): Promise<AuthLocalInboundPortOutputDto>;
}
