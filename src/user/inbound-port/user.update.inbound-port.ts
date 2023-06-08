import { Users } from 'src/database/entities/Users';

export type UserUpdateInboundPortInputDto = {
  userId: string;
  nickname: string;
  profileImg: string;
};

export type UserUpdateInboundPortOutputDto = {
  user: Users;
};

export const USER_UPDATE_INBOUND_PORT = 'USER_UPDATE_INBOUND_PORT' as const;

export interface UserUpdateInboundPort {
  update(
    params: UserUpdateInboundPortInputDto,
  ): Promise<UserUpdateInboundPortOutputDto>;
}
