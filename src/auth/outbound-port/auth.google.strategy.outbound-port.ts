import { Users } from 'src/database/entities/Users';

export type AuthGoogleStrategyOutboundPortInputDto = {};

export type AuthGoogleStrategyOutboundPortOutputDto = Users;

export const AUTH_GOOGLE_STRATEGY_OUTBOUND_PORT =
  'AUTH_GOOGLE_STRATEGY_OUTBOUND_PORT' as const;

export interface AuthGoogleStrategyOutboundPort {
  findUser(
    email: AuthGoogleStrategyOutboundPortInputDto,
  ): Promise<AuthGoogleStrategyOutboundPortOutputDto>;
}
