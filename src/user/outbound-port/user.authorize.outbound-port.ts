export type UserAuthorizeOutboundPortInputDto = {
  userId: string;
};

export type UserAuthorizeOutboundPortOutputDto = {};

export const USER_AUTHORIZE_OUTBOUND_PORT =
  'USER_AUTHORIZE_OUTBOUND_PORT' as const;

export interface UserAuthorizeOutboundPort {
  validate(
    params: UserAuthorizeOutboundPortInputDto,
  ): Promise<UserAuthorizeOutboundPortOutputDto>;
}
