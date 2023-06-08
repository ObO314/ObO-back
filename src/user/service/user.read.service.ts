import { Inject } from '@nestjs/common';
import {
  UserReadInboundPort,
  UserReadInboundPortInputDto,
  UserReadInboundPortOutputDto,
} from '../inbound-port/user.read.inbound-port';
import {
  USER_READ_OUTBOUND_PORT,
  UserReadOutboundPort,
} from '../outbound-port/user.read.outbound-port';

export class UserReadService implements UserReadInboundPort {
  constructor(
    @Inject(USER_READ_OUTBOUND_PORT)
    private readonly userReadOutboundPort: UserReadOutboundPort,
  ) {}
  read(
    params: UserReadInboundPortInputDto,
  ): Promise<UserReadInboundPortOutputDto> {
    return this.userReadOutboundPort.read(params);
  }
}
