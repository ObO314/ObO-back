export type SignUpInboundPortInputDto = { userId: string };

export type SignUpInboundPortOutputDto = string;

export const SIGN_UP_INBOUND_PORT = 'SIGN_UP_INBOUND_PORT' as const;

export interface SignUpInboundPort {
  execute(
    params: SignUpInboundPortInputDto,
  ): Promise<SignUpInboundPortOutputDto>;
}
