import { Users } from 'src/database/entities/Users';

export type UserDeleteRefreshTokenOutboundPortInputDto = {
  userId: string;
};

export type UserDeleteRefreshTokenOutboundPortOutputDto = {
  userId: string;
};

export const USER_DELETE_REFRESH_TOKEN_OUTBOUND_PORT =
  'USER_DELETE_REFRESH_TOKEN_OUTBOUND_PORT' as const;

export interface UserDeleteRefreshTokenOutboundPort {
  execute(
    params: UserDeleteRefreshTokenOutboundPortInputDto,
  ): Promise<UserDeleteRefreshTokenOutboundPortOutputDto>;
}
