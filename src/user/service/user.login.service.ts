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

export class UserLoginService implements UserLoginInboundPort {
  constructor(
    @Inject(USER_LOGIN_OUTBOUND_PORT)
    private readonly userLoginOutboundPort: UserLoginOutboundPort,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    params: UserLoginInboundPortInputDto,
  ): Promise<UserLoginInboundPortOutputDto> {
    const loginUser = await this.userLoginOutboundPort.login(params);
    const payload = { id: loginUser.userId };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
