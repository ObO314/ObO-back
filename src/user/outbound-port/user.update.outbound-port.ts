import { Users } from 'src/database/entities/Users';

export type UserUpdateOutboundPortInputDto = {
  userId: string;
  nickname: string;
  profileImg: string;
};

export type UserUpdateOutboundPortOutputDto = {
  user: Users;
};

export const USER_UPDATE_OUTBOUND_PORT = 'USER_UPDATE_OUTBOUND_PORT' as const;

export interface UserUpdateOutboundPort {
  update(
    params: UserUpdateOutboundPortInputDto,
  ): Promise<UserUpdateOutboundPortOutputDto>;
}
