import { JwtService } from '@nestjs/jwt';
import {
  UserLoginInboundPort,
  UserLoginInboundPortInputDto,
  UserLoginInboundPortOutputDto,
} from './../inbound-port/user.login-inbound-port';
import {
  UserLoginOutboundPort,
  USER_LOGIN_OUTBOUND_PORT,
} from './../outbound-port/user.login.outbound-port';
import { Inject } from '@nestjs/common';
import {
  USER_JWT_SERVICE_OUTBOUND_PORT,
  UserJwtServiceOutboundPort,
} from '../outbound-port/user.jwt-service.outbound-port';

export class UserLoginService implements UserLoginInboundPort {
  constructor(
    @Inject(USER_LOGIN_OUTBOUND_PORT)
    private readonly userLoginOutboundPort: UserLoginOutboundPort,
    @Inject(USER_JWT_SERVICE_OUTBOUND_PORT)
    private readonly userJwtServiceOutbondPort: UserJwtServiceOutboundPort,
  ) {}

  async execute(
    params: UserLoginInboundPortInputDto,
  ): Promise<UserLoginInboundPortOutputDto> {
    const loginUser = await this.userLoginOutboundPort.login(params);
    const payload = { userId: loginUser.userId };
    return this.userJwtServiceOutbondPort.sign(payload);
  }
}
