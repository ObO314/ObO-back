export type UserSignUpSocialOutboundPortInputDto = {
  email: string;
  nickname: string;
  authMethod: string;
};

export type UserSignUpSocialOutboundPortOutputDto = {
  userId: string;
  email: string;
  nickname: string;
};

export const USER_SIGN_UP_SOCIAL_OUTBOUND_PORT =
  'USER_SIGN_UP_SOCIAL_OUTBOUND_PORT' as const;

export interface UserSignUpSocialOutboundPort {
  signUpSocial(
    params: UserSignUpSocialOutboundPortInputDto,
  ): Promise<UserSignUpSocialOutboundPortOutputDto>;
}
