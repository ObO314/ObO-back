export type AuthGoogleStrategyOutboundPortInputDto = {};

export type AuthGoogleStrategyOutboundPortOutputDto = {
  userId: string;
  email: string;
  password: string;
  nickname: string;
  authMethod: string;
};

export const AUTH_GOOGLE_STRATEGY_OUTBOUND_PORT =
  'AUTH_GOOGLE_STRATEGY_OUTBOUND_PORT' as const;

export interface AuthGoogleStrategyOutboundPort {
  googleLogin(
    email: AuthGoogleStrategyOutboundPortInputDto,
  ): Promise<AuthGoogleStrategyOutboundPortOutputDto>;
}
