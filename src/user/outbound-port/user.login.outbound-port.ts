export type UserLoginOutboundPortInputDto = {
  email: string;
  password: string;
};

export type UserLoginOutboundPortOutputDto = {
  userId: string;
  nickname: string;
};

export const USER_LOGIN_OUTBOUND_PORT = 'USER_LOGIN_OUTBOUND_PORT' as const;

export interface UserLoginOutboundPort {
  login(
    params: UserLoginOutboundPortInputDto,
  ): Promise<UserLoginOutboundPortOutputDto>;
}
