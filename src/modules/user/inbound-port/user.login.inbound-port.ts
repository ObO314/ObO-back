import { Users } from 'src/database/entities/Users';

export type UserLoginInboundPortInputDto = {
  userId: string;
};

export type UserLoginInboundPortOutputDto = {
  accessToken: string;
};

export const USER_LOGIN_INBOUND_PORT = 'USER_LOGIN_INBOUND_PORT' as const;

export interface UserLoginInboundPort {
  execute(params: UserLoginInboundPortInputDto): UserLoginInboundPortOutputDto;
}
