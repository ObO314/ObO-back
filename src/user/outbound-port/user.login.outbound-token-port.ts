export type UserLoginOutboundTokenPortInputDto = {
  userId: string;
};

export type UserLoginOutboundTokenPortOutputDto = {
  accessToken: string;
};

export const USER_LOGIN_OUTBOUND_TOKEN_PORT =
  'USER_LOGIN_OUTBOUND_TOKEN_PORT' as const;

export interface UserLoginOutboundTokenPort {
  createToken(
    params: UserLoginOutboundTokenPortInputDto,
  ): UserLoginOutboundTokenPortOutputDto;
}
