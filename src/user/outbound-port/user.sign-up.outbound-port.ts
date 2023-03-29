export type UserSignUpOutboundPortInputDto = {
  email: string;
  password: string;
  nickname: string;
};

export type UserSignUpOutboundPortOutputDto = {
  userId: string;
  email: string;
  password: string;
  nickname: string;
};

export const USER_SIGN_UP_OUTBOUND_PORT = 'USER_SIGN_UP_OUTBOUND_PORT' as const;

export interface UserSignUpOutboundPort {
  signUp(
    params: UserSignUpOutboundPortInputDto,
  ): Promise<UserSignUpOutboundPortOutputDto>;
}
