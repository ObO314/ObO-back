import { Users } from 'src/database/entities/Users';

export type UserUpdateOutboundPortInputDto = {
  userId: string;
  nickname?: string;
  profileImg?: string;
  password?: string;
};

export type UserUpdateOutboundPortOutputDto = Users;

export const USER_UPDATE_OUTBOUND_PORT = 'USER_UPDATE_OUTBOUND_PORT' as const;

export interface UserUpdateOutboundPort {
  execute(
    params: UserUpdateOutboundPortInputDto,
  ): Promise<UserUpdateOutboundPortOutputDto>;
}
