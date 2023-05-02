export type UserLoginOutboundRepositoryPortInputDto = {
  email: string;
};

export type UserLoginOutboundRepositoryPortOutputDto = {
  userId: string;
};

export const USER_LOGIN_OUTBOUND_REPOSITORY_PORT =
  'USER_LOGIN_OUTBOUND_REPOSITORY_PORT' as const;

export interface UserLoginOutboundRepositoryPort {
  findUserId(
    params: UserLoginOutboundRepositoryPortInputDto,
  ): Promise<UserLoginOutboundRepositoryPortOutputDto>;
}
