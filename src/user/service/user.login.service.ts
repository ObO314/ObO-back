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
import { JwtStrategy } from 'src/auth/jwt/strategy/auth.jwt.strategy';

export class UserLoginService implements UserLoginInboundPort {
  constructor(
    @Inject(USER_LOGIN_OUTBOUND_PORT)
    private readonly userLoginOutboundPort: UserLoginOutboundPort,
    @Inject(AUTH_JWT_INBOUND_PORT)
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  async execute(
    params: UserLoginInboundPortInputDto,
  ): Promise<UserLoginInboundPortOutputDto> {
    const loginUser = await this.userLoginOutboundPort.login(params);
    const validatedUser = loginUser.userId;

    const accessToken = this.jwtStrategy.login(validatedUser);
    return accessToken;
  }
}
