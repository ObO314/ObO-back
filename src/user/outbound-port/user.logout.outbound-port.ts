export type userLogoutOutboundPortInputDto = { userId: string };

export type userLogoutOutboundPortOutputDto = { userId: string };

export const USER_LOGOUT_OUTBOUND_PORT = 'USER_LOGOUT_OUTBOUND_PORT' as const;

export interface userLogoutOutboundPort {
  logout(
    params: userLogoutOutboundPortInputDto,
  ): Promise<userLogoutOutboundPortOutputDto>;
}
