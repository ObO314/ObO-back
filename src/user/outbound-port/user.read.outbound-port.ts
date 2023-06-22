export type UserReadOutboundPortInputDto = {
  userId: string;
};

export type UserReadOutboundPortOutputDto = {
  userId: string;
  email: string;
  nickname: string;
  profileImg: string;
  progressRoutine: number;
  progressTodo: number;
  progressWork: number;
};

export const USER_READ_OUTBOUND_PORT = 'USER_READ_OUTBOUND_PORT' as const;

export interface UserReadOutboundPort {
  read(
    params: UserReadOutboundPortInputDto,
  ): Promise<UserReadOutboundPortOutputDto>;
}
