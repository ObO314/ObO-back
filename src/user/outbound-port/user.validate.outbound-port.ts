export type UserValidateOutboundPortInputDto = {
  userId: string;
};

export type UserValidateOutboundPortOutputDto = {};

export const USER_VALIDATE_OUTBOUND_PORT =
  'USER_VALIDATE_OUTBOUND_PORT' as const;

export interface UserValidateOutboundPort {
  validate(
    params: UserValidateOutboundPortInputDto,
  ): Promise<UserValidateOutboundPortOutputDto>;
}
