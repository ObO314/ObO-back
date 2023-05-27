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

export class UserService implements UserLoginInboundPort {
  constructor(
    @Inject(USER_LOGIN_OUTBOUND_REPOSITORY_PORT)
    private readonly userLoginOutboundRepositoryPort: UserLoginOutboundRepositoryPort,
    @Inject(USER_LOGIN_OUTBOUND_TOKEN_PORT)
    private readonly userLoginOutboundTokenPort: UserLoginOutboundTokenPort,
  ) {}

  async login(
    params: UserLoginInboundPortInputDto,
  ): Promise<UserLoginInboundPortOutputDto> {
    const findUser = await this.userLoginOutboundRepositoryPort.findUserId({
      email: params.email,
    });
    if (!findUser) {
      new BadRequestException('가입되지 않은 아이디 입니다. 가입하시겠습니까?');
    } else {
      const validatedUser = findUser.userId;
      const accessToken = await this.userLoginOutboundTokenPort.createToken({
        userId: validatedUser,
      });
      return accessToken;
    }
  }
}

// 유저찾아서
// 유저 아이디 뽑아서
// 액세스 토큰받아서
// 발급한다.
