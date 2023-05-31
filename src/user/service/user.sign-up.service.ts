import { Inject } from '@nestjs/common';
import {
  USER_SIGN_UP_OUTBOUND_REPOSITORY_PORT,
  UserSignUpOutboundRepositoryPort,
} from '../outbound-port/user.sign-up.outbound-repository-port';
import {
  UserSignUpInboundPort,
  UserSignUpInboundPortInputDto,
  UserSignUpInboundPortOutputDto,
} from '../inbound-port/user.sign-up.inbound-port';

export class UserSignUpService implements UserSignUpInboundPort {
  constructor(
    @Inject(USER_SIGN_UP_OUTBOUND_REPOSITORY_PORT)
    private readonly userSignUpOutboundRepositoryPort: UserSignUpOutboundRepositoryPort,
  ) {}

  async signUp(
    params: UserSignUpInboundPortInputDto,
  ): Promise<UserSignUpInboundPortOutputDto> {
    return this.userSignUpOutboundRepositoryPort.signUp(params);
  }
}
