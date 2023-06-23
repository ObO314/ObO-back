export type UserLoginOutboundPortInputDto = {
  userId: string;
};

export type UserLoginOutboundPortOutputDto = {
  accessToken: string;
  refreshToken: string;
};

export const USER_LOGIN_OUTBOUND_PORT =
  'USER_LOGIN_OUTBOUND_TOKEN_PORT' as const;

export interface UserLoginOutboundPort {
  createToken(
    params: UserLoginOutboundPortInputDto,
  ): UserLoginOutboundPortOutputDto;
}
