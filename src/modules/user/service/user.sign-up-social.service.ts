import { HttpException, HttpStatus, Inject } from '@nestjs/common';

import {
  UserSignUpSocialInboundPort,
  UserSignUpSocialInboundPortInputDto,
  UserSignUpSocialInboundPortOutputDto,
} from '../inbound-port/user.sign-up-social.inbound-port';
import {
  USER_SIGN_UP_SOCIAL_OUTBOUND_PORT,
  UserSignUpSocialOutboundPort,
} from '../outbound-port/user.sign-up-social.outbound-port';

export class UserSignUpSocialService implements UserSignUpSocialInboundPort {
  constructor(
    @Inject(USER_SIGN_UP_SOCIAL_OUTBOUND_PORT)
    private readonly userSignUpSocialOutboundPort: UserSignUpSocialOutboundPort,
  ) {}

  async signUpSocial(
    params: UserSignUpSocialInboundPortInputDto,
  ): Promise<UserSignUpSocialInboundPortOutputDto> {
    try {
      return await this.userSignUpSocialOutboundPort.signUpSocial(params);
    } catch (e) {
      const msg = e.message;
      throw new HttpException(msg, HttpStatus.BAD_REQUEST);
    }
  }
}
