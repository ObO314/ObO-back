import { Controller, Post, Get, Inject, Body } from '@nestjs/common';
import {
  SIGN_UP_INBOUND_PORT,
  SignUpInboundPortInputDto,
  SignUpInboundPort,
} from '../inbound-port/sign-up.inbound-port';

@Controller()
export class signUpController {
  constructor(
    @Inject(SIGN_UP_INBOUND_PORT)
    private readonly SignUpInboundPort: SignUpInboundPort,
  ) {}

  @Post('/post')
  async signUp(
    @Body()
    signUpInboundPortInput: SignUpInboundPortInputDto,
  ) {
    return this.SignUpInboundPort.execute(signUpInboundPortInput);
  }
}
