export type AuthLocalInboundPortInputEmailDto = string;
export type AuthLocalInboundPortInputPasswordDto = string;

// export type AuthLocalInboundPortInputDto = {
//   email: string;
//   password: string;
// };

export type AuthLocalInboundPortOutputDto = {};

export const AUTH_LOCAL_INBOUND_PORT = 'AUTH_LOCAL_INBOUND_PORT' as const;

export interface AuthLocalInboundPort {
  validate(
    email: AuthLocalInboundPortInputEmailDto,
    password: AuthLocalInboundPortInputPasswordDto,
  ): Promise<AuthLocalInboundPortOutputDto>;
}
