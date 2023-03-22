export type SignUpInboundPortInputDto = {
  id: string;
  pw: string;
  name: string;
  nickName: string;
  email: string;
};

export type SignUpInboundPortOutputDto = Promise<{ message: string }>;

export const SIGN_UP_INBOUND_PORT = 'SIGN_UP_INBOUND_PORT' as const;

export interface SignUpInboundPort {
  execute(
    params: SignUpInboundPortInputDto,
  ): Promise<SignUpInboundPortOutputDto>;
}
