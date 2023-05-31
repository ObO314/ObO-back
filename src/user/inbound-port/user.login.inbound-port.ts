export type UserLoginInboundPortInputDto = {
  email: string;
  password: string;
};

export type UserLoginInboundPortOutputDto = {
  accessToken: string;
};

export const USER_LOGIN_INBOUND_PORT = 'USER_LOGIN_INBOUND_PORT' as const;

export interface UserLoginInboundPort {
  login(
    params: UserLoginInboundPortInputDto,
  ): Promise<UserLoginInboundPortOutputDto>;
}
