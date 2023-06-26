import { Users } from 'src/database/entities/Users';

export type AuthGoogleStrategyOutboundPortInputDto = {};

export type AuthGoogleStrategyOutboundPortOutputDto = Users;

export type AuthGoogleStrategyOutboundSignUpPortInputDto = {
  email: string;
  nickname: string;
  authMethod: string;
};
export type AuthGoogleStrategyOutboundSignUpPortOutputDto = Users;

export const AUTH_GOOGLE_STRATEGY_OUTBOUND_PORT =
  'AUTH_GOOGLE_STRATEGY_OUTBOUND_PORT' as const;

export interface AuthGoogleStrategyOutboundPort {
  findUser(
    email: AuthGoogleStrategyOutboundPortInputDto,
  ): Promise<AuthGoogleStrategyOutboundPortOutputDto>;

  signUp(
    params: AuthGoogleStrategyOutboundSignUpPortInputDto,
  ): Promise<AuthGoogleStrategyOutboundSignUpPortOutputDto>;
}
