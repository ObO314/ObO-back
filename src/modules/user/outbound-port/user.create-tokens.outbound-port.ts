export type UserCreateTokensOutboundPortInputDto = {
  userId: string;
};

export type UserCreateTokensOutboundPortOutputDto = {
  accessToken: string;
  refreshToken: string;
};

export const USER_CREATE_TOKENS_OUTBOUND_PORT =
  'USER_CREATE_TOKENS_OUTBOUND_PORT' as const;

export interface UserCreateTokensOutboundPort {
  createToken(
    userId: UserCreateTokensOutboundPortInputDto,
  ): UserCreateTokensOutboundPortOutputDto;
}
