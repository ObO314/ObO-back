export type UserSignUpOutboundRepositoryPortInputDto = {
  email: string;
  password: string;
  nickname: string;
  authMethod: string;
};

export type UserSignUpOutboundRepositoryPortOutputDto = {
  userId: string;
  email: string;
  password: string;
  nickname: string;
};

export const USER_SIGN_UP_OUTBOUND_REPOSITORY_PORT =
  'USER_SIGN_UP_OUTBOUND_REPOSITORY_PORT' as const;

export interface UserSignUpOutboundRepositoryPort {
  signUp(
    params: UserSignUpOutboundRepositoryPortInputDto,
  ): Promise<UserSignUpOutboundRepositoryPortOutputDto>;
}
