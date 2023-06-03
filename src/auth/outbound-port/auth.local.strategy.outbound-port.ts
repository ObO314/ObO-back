export type AuthLocalStrategyOutboundPortInputDto = {
  email: string;
  authMethod: 'LOCAL' | 'GOOGLE';
};

export type AuthLocalStrategyOutboundPortOutputDto = {
  userId: string;
  email: string;
  password: string;
};

export const AUTH_LOCAL_STRATEGY_OUTBOUND_PORT =
  'AUTH_LOCAL_STRATEGY_OUTBOUND_PORT' as const;

export interface AuthLocalStrategyOutboundPort {
  findUser(
    email: AuthLocalStrategyOutboundPortInputDto,
  ): Promise<AuthLocalStrategyOutboundPortOutputDto>;
}
