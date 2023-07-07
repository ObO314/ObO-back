import { Users } from 'src/database/entities/Users';

export type AuthFindUserOutboundPortInputDto = {
  email: string;
  authMethod: string;
};

export type AuthFindUserOutboundPortOutputDto = Users;

export const AUTH_FIND_USER_OUTBOUND_PORT =
  'AUTH_FIND_USER_OUTBOUND_PORT' as const;

export interface AuthFindUserOutboundPort {
  execute(
    params: AuthFindUserOutboundPortInputDto,
  ): Promise<AuthFindUserOutboundPortOutputDto>;
}
