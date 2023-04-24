export type UserValidateInboundPortInputDto = {
  userId: string;
};

export type UserValidateInboundPortOutputDto = {};

export const USER_VALIDATE_INBOUND_PORT = 'USER_VALIDATE_INBOUND_PORT' as const;

export interface UserValidateInboundPort {
  validate(
    params: UserValidateInboundPortInputDto,
  ): Promise<UserValidateInboundPortOutputDto>;
}
