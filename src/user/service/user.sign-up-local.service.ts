import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import {
  USER_SIGN_UP_LOCAL_OUTBOUND_PORT,
  UserSignUpLocalOutboundPort,
} from '../outbound-port/user.sign-up-local.outbound-port';
import {
  UserSignUpLocalInboundPort,
  UserSignUpLocalInboundPortInputDto,
  UserSignUpLocalInboundPortOutputDto,
} from '../inbound-port/user.sign-up-local.inbound-port';

export class UserSignUpLocalService implements UserSignUpLocalInboundPort {
  constructor(
    @Inject(USER_SIGN_UP_LOCAL_OUTBOUND_PORT)
    private readonly userSignUpOutboundRepositoryPort: UserSignUpLocalOutboundPort,
  ) {}

  async signUpLocal(
    params: UserSignUpLocalInboundPortInputDto,
  ): Promise<UserSignUpLocalInboundPortOutputDto> {
    try {
      return await this.userSignUpOutboundRepositoryPort.signUpLocal(params);
    } catch (e) {
      const msg = e.message;
      throw new HttpException(msg, HttpStatus.BAD_REQUEST);
    }
  }
}
