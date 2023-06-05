import {
  USER_LOGIN_OUTBOUND_TOKEN_PORT,
  UserLoginOutboundTokenPort,
} from '../outbound-port/user.login.outbound-token-port';
import { Inject } from '@nestjs/common';
import {
  UserLoginInboundPort,
  UserLoginInboundPortInputDto,
  UserLoginInboundPortOutputDto,
} from '../inbound-port/user.login.inbound-port';

export class UserLoginService implements UserLoginInboundPort {
  constructor(
    @Inject(USER_LOGIN_OUTBOUND_TOKEN_PORT)
    private readonly userLoginOutboundTokenPort: UserLoginOutboundTokenPort,
  ) {}

  login(params: UserLoginInboundPortInputDto): UserLoginInboundPortOutputDto {
    return this.userLoginOutboundTokenPort.createToken({
      userId: params.userId,
    });
  }
}
