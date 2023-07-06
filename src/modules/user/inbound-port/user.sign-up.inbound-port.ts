export type UserSignUpInboundPortInputDto = {
  email: string;
  password: string;
  nickname: string;
  authMethod: string;
};

export type UserSignUpInboundPortOutputDto = {
  userId: string;
  email: string;
  nickname: string;
};

export const USER_SIGN_UP_INBOUND_PORT = 'USER_SIGN_UP_INBOUND_PORT' as const;

export interface UserSignUpInboundPort {
  execute(
    params: UserSignUpInboundPortInputDto,
  ): Promise<UserSignUpInboundPortOutputDto>;
}
