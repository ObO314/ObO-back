export type UserSignUpLocalInboundPortInputDto = {
  email: string;
  password: string;
  nickname: string;
  authMethod: string;
};

export type UserSignUpLocalInboundPortOutputDto = {
  userId: string;
  email: string;
  password: string;
  nickname: string;
};

export const USER_SIGN_UP_LOCAL_INBOUND_PORT =
  'USER_SIGN_UP_LOCAL_INBOUND_PORT' as const;

export interface UserSignUpLocalInboundPort {
  signUpLocal(
    params: UserSignUpLocalInboundPortInputDto,
  ): Promise<UserSignUpLocalInboundPortOutputDto>;
}
