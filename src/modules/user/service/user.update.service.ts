import { Inject } from '@nestjs/common';
import {
  UserUpdateInboundPort,
  UserUpdateInboundPortInputDto,
  UserUpdateInboundPortOutputDto,
} from '../inbound-port/user.update.inbound-port';
import {
  USER_UPDATE_OUTBOUND_PORT,
  UserUpdateOutboundPort,
} from '../outbound-port/user.update.outbound-port';

export class UserUpdateService implements UserUpdateInboundPort {
  constructor(
    @Inject(USER_UPDATE_OUTBOUND_PORT)
    private readonly userUpdateOutboundPort: UserUpdateOutboundPort,
  ) {}

  async update(
    params: UserUpdateInboundPortInputDto,
  ): Promise<UserUpdateInboundPortOutputDto> {
    return await this.userUpdateOutboundPort.update(params);
  }
}
