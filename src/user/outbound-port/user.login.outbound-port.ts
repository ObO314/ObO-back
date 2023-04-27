export type UserLoginOutboundPortInputDto = {
  userId: string;
};

export type UserLoginOutboundPortOutputDto = {
  accessToken: string;
};

export const USER_LOGIN_OUTBOUND_PORT = 'USER_LOGIN_OUTBOUND_PORT' as const;

export interface UserLoginOutboundPort {
  createToken(
    params: UserLoginOutboundPortInputDto,
  ): Promise<UserLoginOutboundPortOutputDto>;
}
