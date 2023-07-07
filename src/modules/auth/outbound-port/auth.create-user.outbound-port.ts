import { Users } from 'src/database/entities/Users';

export type AuthCreateUserOutboundPortInputDto = {
  email: string;
  nickname: string;
  authMethod: string;
};

export type AuthCreateUserOutboundPortOutputDto = Users;

export const AUTH_CREATE_USER_OUTBOUND_PORT =
  'AUTH_CREATE_USER_OUTBOUND_PORT' as const;

export interface AuthCreateUserOutboundPort {
  execute(
    params: AuthCreateUserOutboundPortInputDto,
  ): Promise<AuthCreateUserOutboundPortOutputDto>;
}
