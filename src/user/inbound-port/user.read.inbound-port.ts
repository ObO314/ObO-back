import { Users } from 'src/database/entities/Users';

export type UserReadInboundPortInputDto = {
  userId: string;
};

export type UserReadInboundPortOutputDto = {
  user: Users;
};

export const USER_READ_INBOUND_PORT = 'USER_READ_INBOUND_PORT' as const;

export interface UserReadInboundPort {
  read(
    params: UserReadInboundPortInputDto,
  ): Promise<UserReadInboundPortOutputDto>;
}
