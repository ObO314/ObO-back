export type UserAuthorizeInboundPortInputDto = {
  userId: string;
  token: string;
};

export type UserAuthorizeInboundPortOutputDto = {};

export const USER_AUTHORIZE_INBOUND_PORT =
  'USER_AUTHORIZE_INBOUND_PORT' as const;

export interface UserAuthorizeInboundPort {
  authorize(
    params: UserAuthorizeInboundPortInputDto,
  ): Promise<UserAuthorizeInboundPortOutputDto>;
}
