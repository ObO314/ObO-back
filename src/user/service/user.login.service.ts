import {
  USER_LOGIN_OUTBOUND_REPOSITORY_PORT,
  UserLoginOutboundRepositoryPort,
  UserLoginOutboundRepositoryPortInputDto,
  UserLoginOutboundRepositoryPortOutputDto,
} from './../outbound-port/user.login.outbound-repository-port';
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
    @Inject(USER_LOGIN_OUTBOUND_REPOSITORY_PORT)
    private readonly userLoginOutboundRepositoryPort: UserLoginOutboundRepositoryPort,
    @Inject(USER_LOGIN_OUTBOUND_TOKEN_PORT)
    private readonly userLoginOutTokenPort: UserLoginOutboundTokenPort,
  ) {}

  async login(
    params: UserLoginInboundPortInputDto,
  ): Promise<UserLoginInboundPortOutputDto> {
    const findUser = await this.userLoginOutboundRepositoryPort.findUserId({
      email: params.email,
    });
    const validatedUser = findUser.userId;
    const accessToken = await this.userLoginOutTokenPort.createToken({
      userId: validatedUser,
    });
    return accessToken;
  }
}
