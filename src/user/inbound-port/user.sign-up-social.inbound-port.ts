export type UserSignUpSocialInboundPortInputDto = {
  email: string;
  nickname: string;
  authMethod: string;
};

export type UserSignUpSocialInboundPortOutputDto = {
  userId: string;
  email: string;
  nickname: string;
};

export const USER_SIGN_UP_SOCIAL_INBOUND_PORT =
  'USER_SIGN_UP_SOCIAL_INBOUND_PORT' as const;

export interface UserSignUpSocialInboundPort {
  signUpSocial(
    params: UserSignUpSocialInboundPortInputDto,
  ): Promise<UserSignUpSocialInboundPortOutputDto>;
}
