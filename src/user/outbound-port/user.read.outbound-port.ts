import { Users } from 'src/database/entities/Users';

export type UserReadOutboundPortInputDto = {
  userId: string;
};

export type UserReadOutboundPortOutputDto = {
  user: Users;
};

export const USER_READ_OUTBOUND_PORT = 'USER_READ_OUTBOUND_PORT' as const;

export interface UserReadOutboundPort {
  read(
    params: UserReadOutboundPortInputDto,
  ): Promise<UserReadOutboundPortOutputDto>;
}
