import {
  USER_LOGIN_OUTBOUND_PORT,
  UserLoginOutboundPort,
} from '../outbound-port/user.login.outbound-port';
import { Inject } from '@nestjs/common';
import {
  UserLoginInboundPort,
  UserLoginInboundPortInputDto,
  UserLoginInboundPortOutputDto,
} from '../inbound-port/user.login.inbound-port';

export class UserLoginService implements UserLoginInboundPort {
  constructor(
    @Inject(USER_LOGIN_OUTBOUND_PORT)
    private readonly userLoginOutboundPort: UserLoginOutboundPort,
  ) {}

  login(params: UserLoginInboundPortInputDto): UserLoginInboundPortOutputDto {
    return this.userLoginOutboundPort.createToken({
      userId: params.userId,
    });
  }
}
