import { Inject } from '@nestjs/common';
import { USER_SIGN_UP_OUTBOUND_PORT } from './../outbound-port/user.sign-up.outbound-port';
import {
  UserSignUpInboundPort,
  UserSignUpInboundPortInputDto,
  UserSignUpInboundPortOutputDto,
} from './../inbound-port/user.sign-up.inbound-port';

export class UserSignUpService implements UserSignUpInboundPort {
  constructor(
    @Inject(USER_SIGN_UP_OUTBOUND_PORT)
    private readonly userSignUpInboundPort: UserSignUpInboundPort,
  ) {}

  async signUp(
    params: UserSignUpInboundPortInputDto,
  ): Promise<UserSignUpInboundPortOutputDto> {
    return this.userSignUpInboundPort.signUp(params);
  }
}