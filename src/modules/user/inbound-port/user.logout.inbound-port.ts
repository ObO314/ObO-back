export type userLogoutInboundPortInputDto = { userId: string };

export type userLogoutInboundPortOutputDto = { userId: string };

export const USER_LOGOUT_INBOUND_PORT = 'USER_LOGOUT_INBOUND_PORT' as const;

export interface userLogoutInboundPort {
  logout(
    params: userLogoutInboundPortInputDto,
  ): Promise<userLogoutInboundPortOutputDto>;
}
