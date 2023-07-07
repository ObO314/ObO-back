import { RefreshTokens } from 'src/database/entities/RefreshTokens';

export type AuthSaveRefreshTokenOutboundPortInputDto = {
  userId: string;
  token: string;
};

export type AuthSaveRefreshTokenOutboundPortOutputDto = RefreshTokens;

export const AUTH_SAVE_REFRESH_TOKEN_OUTBOUND_PORT =
  'AUTH_SAVE_REFRESH_TOKEN_OUTBOUND_PORT' as const;

export interface AuthSaveRefreshTokenOutboundPort {
  execute(
    params: AuthSaveRefreshTokenOutboundPortInputDto,
  ): Promise<AuthSaveRefreshTokenOutboundPortOutputDto>;
}
