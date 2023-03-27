export type SignUpOutboundPortInputDto = { userId: string };

export type SignUpOutboundPortOutputDto = string;

export const SIGN_UP_OUTBOUND_PORT = 'SIGN_UP_OUTBOUND_PORT' as const;

export interface SignUpOutboundPort {
  execute(
    params: SignUpOutboundPortInputDto,
  ): Promise<SignUpOutboundPortOutputDto>;
}
