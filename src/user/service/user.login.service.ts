import {
  USER_LOGIN_OUTBOUND_REPOSITORY_PORT,
  UserLoginOutboundRepositoryPort,
  UserLoginOutboundRepositoryPortInputDto,
  UserLoginOutboundRepositoryPortOutputDto,
} from '../outbound-port/user.login.outbound-repository-port';
import {
  USER_LOGIN_OUTBOUND_TOKEN_PORT,
  UserLoginOutboundTokenPort,
} from '../outbound-port/user.login.outbound-token-port';
import { BadRequestException, Inject } from '@nestjs/common';
import {
  UserLoginInboundPort,
  UserLoginInboundPortInputDto,
  UserLoginInboundPortOutputDto,
} from '../inbound-port/user.login.inbound-port';
import {
  UserSignUpInboundPort,
  UserSignUpInboundPortInputDto,
  UserSignUpInboundPortOutputDto,
} from '../inbound-port/user.sign-up.inbound-port';
import { USER_SIGN_UP_OUTBOUND_REPOSITORY_PORT } from '../outbound-port/user.sign-up.outbound-repository-port';
import { pipe, take } from '@fxts/core';

export class UserLoginService implements UserLoginInboundPort {
  constructor(
    @Inject(USER_LOGIN_OUTBOUND_REPOSITORY_PORT)
    private readonly userLoginOutboundRepositoryPort: UserLoginOutboundRepositoryPort,
    @Inject(USER_LOGIN_OUTBOUND_TOKEN_PORT)
    private readonly userLoginOutboundTokenPort: UserLoginOutboundTokenPort,
  ) {}

  async login(
    params: UserLoginInboundPortInputDto,
  ): Promise<UserLoginInboundPortOutputDto> {
    return await pipe(
      params,
      ({ email }) =>
        this.userLoginOutboundRepositoryPort.findUserId({ email: email }),
      ({ userId }) =>
        this.userLoginOutboundTokenPort.createToken({ userId: userId }),
    );
  }
}
