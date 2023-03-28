export type SignUpOutboundPortInputDto = {
  email: string;
  password: string;
  nickname: string;
};

export type SignUpOutboundPortOutputDto = {
  userId: string;
  email: string;
  password: string;
  nickname: string;
};

export const SIGN_UP_OUTBOUND_PORT = 'SIGN_UP_OUTBOUND_PORT' as const;

export interface SignUpOutboundPort {
  execute(
    params: SignUpOutboundPortInputDto,
  ): Promise<SignUpOutboundPortOutputDto>;
}
