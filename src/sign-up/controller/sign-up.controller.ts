import {
  Controller,
  Post,
  Get,
  Inject,
  Body,
  Query,
  Param,
} from '@nestjs/common';
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

  @Get('/search')
  async signUp(
    @Query()
    signUpInboundPortInput: SignUpInboundPortInputDto,
  ) {
    return this.SignUpInboundPort.execute(signUpInboundPortInput);
  }
}
