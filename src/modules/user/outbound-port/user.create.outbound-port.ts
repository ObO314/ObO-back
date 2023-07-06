import { Users } from 'src/database/entities/Users';

export type UserCreateOutboundPortInputDto = {
  email: string;
  password?: string;
  nickname: string;
  authMethod: string;
};

export type UserCreateOutboundPortOutputDto = Users;

export const USER_CREATE_OUTBOUND_PORT = 'USER_CREATE_OUTBOUND_PORT' as const;

export interface UserCreateOutboundPort {
  execute(
    params: UserCreateOutboundPortInputDto,
  ): Promise<UserCreateOutboundPortOutputDto>;
}
