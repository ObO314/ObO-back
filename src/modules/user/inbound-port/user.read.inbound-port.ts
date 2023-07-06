export type UserReadInboundPortInputDto = {
  userId: string;
};

export type UserReadInboundPortOutputDto = {
  userId: string;
  email: string;
  nickname: string;
  profileImg: string;
};

export const USER_READ_INBOUND_PORT = 'USER_READ_INBOUND_PORT' as const;

export interface UserReadInboundPort {
  execute(
    params: UserReadInboundPortInputDto,
  ): Promise<UserReadInboundPortOutputDto>;
}
