import { Users } from 'src/database/entities/Users';

export type UserReadOutboundPortInputDto = {
  id?: string;
  email?: string;
};

export type UserReadOutboundPortOutputDto = Users;

export const USER_READ_OUTBOUND_PORT = 'USER_READ_OUTBOUND_PORT' as const;

export interface UserReadOutboundPort {
  execute(
    params: UserReadOutboundPortInputDto,
  ): Promise<UserReadOutboundPortOutputDto>;
}
