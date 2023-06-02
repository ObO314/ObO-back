export type AuthLocalStrategyInboundPortInputEmailDto = string;
export type AuthLocalStrategyInboundPortInputPasswordDto = string;

export type AuthLocalStrategyInboundPortOutputDto = {
  userId: string;
  email: string;
  password: string;
  nickname: string;
  authMethod: string;
};

export const AUTH_LOCAL_STRATEGY_INBOUND_PORT =
  'AUTH_LOCAL_STRATEGY_INBOUND_PORT' as const;

export interface AuthLocalStrategyInboundPort {
  validate(
    email: AuthLocalStrategyInboundPortInputEmailDto,
    password: AuthLocalStrategyInboundPortInputPasswordDto,
  ): Promise<AuthLocalStrategyInboundPortOutputDto>;
}
