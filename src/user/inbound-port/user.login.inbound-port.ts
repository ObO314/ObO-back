export type UserLoginInboundPortInputDto = {
  userId: string;
  email: string;
  password: string;
  nickname: string;
  authMethod: string;
};

export type UserLoginInboundPortOutputDto = {
  accessToken: string;
};

export const USER_LOGIN_INBOUND_PORT = 'USER_LOGIN_INBOUND_PORT' as const;

export interface UserLoginInboundPort {
  login(params: UserLoginInboundPortInputDto): UserLoginInboundPortOutputDto;
}
