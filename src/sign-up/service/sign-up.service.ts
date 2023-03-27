import { Inject } from '@nestjs/common';
import {
  SignUpOutboundPort,
  SIGN_UP_OUTBOUND_PORT,
} from './../outbound-port/sign-up.outbound-port';
import {
  SignUpInboundPort,
  SignUpInboundPortInputDto,
  SignUpInboundPortOutputDto,
} from './../inbound-port/sign-up.inbound-port';

export class SignUpService implements SignUpInboundPort {
  constructor(
    @Inject(SIGN_UP_OUTBOUND_PORT)
    private readonly signUpOutboundPort: SignUpOutboundPort,
  ) {}

  async execute(
    params: SignUpInboundPortInputDto,
  ): Promise<SignUpInboundPortOutputDto> {
    return this.signUpOutboundPort.execute(params);
  }
}
