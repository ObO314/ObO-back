import { Users } from 'database/entities/Users';

export type AuthGoogleInboundPortInputDto = {
  accessToken: string;
  refreshToken: string;
  profile: any;
  done: any;
};

export type AuthGoogleInboundPortOutputDto = any;

export const AUTH_GOOGLE_STRATEGY_INBOUND_PORT =
  'AUTH_GOOGLE_INBOUND_PORT' as const;

export interface AuthGoogleInboundPort {
  validate(
    payload: AuthGoogleInboundPortInputDto,
  ): Promise<AuthGoogleInboundPortOutputDto>;
}
