import {
  USER_LOGOUT_OUTBOUND_PORT,
  userLogoutOutboundPort,
} from './../outbound-port/user.logout.outbound-port';
import { Inject } from '@nestjs/common';
import {
  userLogoutInboundPort,
  userLogoutInboundPortInputDto,
  userLogoutInboundPortOutputDto,
} from '../inbound-port/user.logout.inbound-port';

export class UserLogoutService implements userLogoutInboundPort {
  constructor(
    @Inject(USER_LOGOUT_OUTBOUND_PORT)
    private readonly userLogoutOutboundPort: userLogoutOutboundPort,
  ) {}

  logout(
    params: userLogoutInboundPortInputDto,
  ): Promise<userLogoutInboundPortOutputDto> {
    return this.userLogoutOutboundPort.logout(params);
  }
}
