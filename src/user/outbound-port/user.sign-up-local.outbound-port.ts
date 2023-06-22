export type UserSignUpLocalOutboundPortInputDto = {
  email: string;
  password: string;
  nickname: string;
  authMethod: string;
};

export type UserSignUpLocalOutboundPortOutputDto = {
  userId: string;
  email: string;
  nickname: string;
};

export const USER_SIGN_UP_LOCAL_OUTBOUND_PORT =
  'USER_SIGN_UP_LOCAL_OUTBOUND_PORT' as const;

export interface UserSignUpLocalOutboundPort {
  signUpLocal(
    params: UserSignUpLocalOutboundPortInputDto,
  ): Promise<UserSignUpLocalOutboundPortOutputDto>;
}
