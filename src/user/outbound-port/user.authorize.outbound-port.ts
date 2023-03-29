export type UserAuthorizeOutboundPortInputDto = {};

export type UserAuthorizeOutboundPortOutputDto = {};

export const USER_AUTHORIZE_OUTBOUND_PORT =
  'USER_AUTHORIZE_OUTBOUND_PORT' as const;

export interface UserAuthorizeOutboundPort {
  authorize(
    params: UserAuthorizeOutboundPortInputDto,
  ): Promise<UserAuthorizeOutboundPortOutputDto>;
}
