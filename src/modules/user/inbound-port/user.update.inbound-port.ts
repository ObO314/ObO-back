export type UserUpdateInboundPortInputDto = {
  userId: string;
  nickname: string;
  profileImg?: string;
  password?: string;
};

export type UserUpdateInboundPortOutputDto = {
  userId: string;
  email: string;
  nickname: string;
  profileImg?: string;
};

export const USER_UPDATE_INBOUND_PORT = 'USER_UPDATE_INBOUND_PORT' as const;

export interface UserUpdateInboundPort {
  execute(
    params: UserUpdateInboundPortInputDto,
  ): Promise<UserUpdateInboundPortOutputDto>;
}
