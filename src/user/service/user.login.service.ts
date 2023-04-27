import { AUTH_JWT_INBOUND_PORT } from 'src/auth/jwt/inbound-port/auth.jwt.inbound-port';
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
    @Inject(USER_LOGIN_OUTBOUND_PORT) // 얘는 OUTboundPort로
    private readonly userLoginOutboundPort: UserLoginOutboundPort,
  ) {}

  async login(
    params: UserLoginInboundPortInputDto,
  ): Promise<UserLoginInboundPortOutputDto> {
    const validatedUser = params.userId;
    const accessToken = await this.userLoginOutboundPort.createToken({
      userId: validatedUser,
    });
    return accessToken;
  }
}
