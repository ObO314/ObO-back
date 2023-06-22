export type UserUpdateInboundPortInputDto = {
  userId: string;
  nickname: string;
  profileImg?: string;
};

export type UserUpdateInboundPortOutputDto = {
  userId: string;
  email: string;
  nickname: string;
  profileImg?: string;
  progressRoutine: number;
  progressTodo: number;
  progressWork: number;
};

export const USER_UPDATE_INBOUND_PORT = 'USER_UPDATE_INBOUND_PORT' as const;

export interface UserUpdateInboundPort {
  update(
    params: UserUpdateInboundPortInputDto,
  ): Promise<UserUpdateInboundPortOutputDto>;
}
