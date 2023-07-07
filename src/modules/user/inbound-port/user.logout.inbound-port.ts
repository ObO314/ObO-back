export type userLogoutInboundPortInputDto = { userId: string };

export type userLogoutInboundPortOutputDto = {
  userId: string;
  logoutTime: Date;
};

export const USER_LOGOUT_INBOUND_PORT = 'USER_LOGOUT_INBOUND_PORT' as const;

export interface userLogoutInboundPort {
  execute(
    params: userLogoutInboundPortInputDto,
  ): Promise<userLogoutInboundPortOutputDto>;
}
