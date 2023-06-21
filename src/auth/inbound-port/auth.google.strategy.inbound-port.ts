import { Users } from 'src/database/entities/Users';

export type AuthGoogleInboundPortInputDto = {};

export type AuthGoogleInboundPortOutputDto = Users;

export const AUTH_GOOGLE_STRATEGY_INBOUND_PORT =
  'AUTH_GOOGLE_INBOUND_PORT' as const;

export interface AuthGoogleInboundPort {
  validate(
    payload: AuthGoogleInboundPortInputDto,
  ): Promise<AuthGoogleInboundPortOutputDto>;
}
