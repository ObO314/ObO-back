export type UserUpdateOutboundPortInputDto = {
  userId: string;
  nickname: string;
  profileImg?: string;
};

export type UserUpdateOutboundPortOutputDto = {
  userId: string;
  email: string;
  nickname: string;
  profileImg?: string;
  progressRoutine: number;
  progressTodo: number;
  progressWork: number;
};

export const USER_UPDATE_OUTBOUND_PORT = 'USER_UPDATE_OUTBOUND_PORT' as const;

export interface UserUpdateOutboundPort {
  update(
    params: UserUpdateOutboundPortInputDto,
  ): Promise<UserUpdateOutboundPortOutputDto>;
}
