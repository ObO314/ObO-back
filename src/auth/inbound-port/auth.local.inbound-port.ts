export type AuthLocalInboundPortInputEmail = string;
export type AuthLocalInboundPortInputPW = string;

export type AuthLocalInboundPortOutputDto = {};

export const AUTH_LOCAL_INBOUND_PORT = 'AUTH_LOCAL_INBOUND_PORT' as const;

export interface AuthLocalInboundPort {
  validate(
    email: AuthLocalInboundPortInputEmail,
    password: AuthLocalInboundPortInputPW,
  ): Promise<AuthLocalInboundPortOutputDto>;
}
