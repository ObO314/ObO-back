export type UserJwtServiceOutboundPortInputDto = {
  userId: string;
};

export type UserJwtServiceOutboundPortOutputDto = {
  accessToken: string;
};

export const USER_JWT_SERVICE_OUTBOUND_PORT =
  'USER_JWT_SERVICE_OUTBOUND_PORT' as const;

export interface UserJwtServiceOutboundPort {
  sign(
    payload: UserJwtServiceOutboundPortInputDto,
  ): UserJwtServiceOutboundPortOutputDto;
}
