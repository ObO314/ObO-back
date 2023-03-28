export type SignUpInboundPortInputDto = {
  email: string;
  password: string;
  nickname: string;
};

export type SignUpInboundPortOutputDto = {
  userId: string;
  email: string;
  password: string;
  nickname: string;
};

export const SIGN_UP_INBOUND_PORT = 'SIGN_UP_INBOUND_PORT' as const;

export interface SignUpInboundPort {
  execute(
    params: SignUpInboundPortInputDto,
  ): Promise<SignUpInboundPortOutputDto>;
}
