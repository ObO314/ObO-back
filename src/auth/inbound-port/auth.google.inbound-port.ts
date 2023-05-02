export type AuthGoogleValidateInboundPortInputDto = {};

export type AuthGoogleValidateInboundPortOutputDto = {};

export const AUTH_GOOGLE_INBOUND_PORT = 'AUTH_GOOGLE_INBOUND_PORT' as const;

export interface AuthGoogleInboundPort {
  validate(
    payload: AuthGoogleValidateInboundPortInputDto,
  ): Promise<AuthGoogleValidateInboundPortOutputDto>;

  //   createToken(
  //     userId: AuthGoogleLoginInboundPortInputDto,
  //   ): AuthGoogleLoginInboundPortOutputDto;
}
