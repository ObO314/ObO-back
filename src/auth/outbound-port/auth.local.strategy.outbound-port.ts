export type AuthLocalStrategyOutboundPortInputDto = { email: string };

export type AuthLocalStrategyOutboundPortOutputDto = {
  userId: string;
  email: string;
  password: string;
  nickname: string;
  authMethod: string;
};

export const AUTH_LOCAL_STRATEGY_OUTBOUND_PORT =
  'AUTH_LOCAL_STRATEGY_OUTBOUND_PORT' as const;

export interface AuthLocalStrategyOutboundPort {
  findUser(
    email: AuthLocalStrategyOutboundPortInputDto,
  ): Promise<AuthLocalStrategyOutboundPortOutputDto>;
}
