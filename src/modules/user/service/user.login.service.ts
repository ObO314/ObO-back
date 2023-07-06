import { Inject } from '@nestjs/common';
import {
  UserLoginInboundPort,
  UserLoginInboundPortInputDto,
  UserLoginInboundPortOutputDto,
} from '../inbound-port/user.login.inbound-port';
import {
  USER_CREATE_TOKENS_OUTBOUND_PORT,
  UserCreateTokensOutboundPort,
} from '../outbound-port/user.create-tokens.outbound-port';

export class UserLoginService implements UserLoginInboundPort {
  constructor(
    @Inject(USER_CREATE_TOKENS_OUTBOUND_PORT)
    private readonly userCreateTokensOutboundPort: UserCreateTokensOutboundPort,
  ) {}

  execute(params: UserLoginInboundPortInputDto): UserLoginInboundPortOutputDto {
    return this.userCreateTokensOutboundPort.createToken(params);
  }
}
