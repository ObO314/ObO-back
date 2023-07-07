import { RefreshTokens } from 'src/database/entities/RefreshTokens';

export type AuthFindRefreshTokenOutboundPortInputDto = {
  userId: string;
};

export type AuthFindRefreshTokenOutboundPortOutputDto = RefreshTokens;

export const AUTH_FIND_REFRESH_TOKEN_OUTBOUND_PORT =
  'AUTH_FIND_REFRESH_TOKEN_OUTBOUND_PORT' as const;

export interface AuthFindRefreshTokenOutboundPort {
  execute(
    params: AuthFindRefreshTokenOutboundPortInputDto,
  ): Promise<AuthFindRefreshTokenOutboundPortOutputDto>;
}
