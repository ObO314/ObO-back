export type UserAuthorizeInboundPortInputDto = {
  userId: string;
};

export type UserAuthorizeInboundPortOutputDto = {};

export const USER_AUTHORIZE_INBOUND_PORT =
  'USER_AUTHORIZE_INBOUND_PORT' as const;

export interface UserAuthorizeInboundPort {
  validate(
    params: UserAuthorizeInboundPortInputDto,
  ): Promise<UserAuthorizeInboundPortOutputDto>;
}
