import { Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as StrategyJwt } from 'passport-jwt';
import { UserValidateInboundPort } from '../inbound-port/user.validate.inbound-port';
import {
  UserValidateOutboundPort,
  UserValidateOutboundPortInputDto,
  UserValidateOutboundPortOutputDto,
  USER_VALIDATE_OUTBOUND_PORT,
} from '../outbound-port/user.validate.outbound-port';
import * as dotenv from 'dotenv';

dotenv.config();

export class UserValidateService
  extends PassportStrategy(StrategyJwt) //JWT전략을 시용하는 검증 로직.
  implements UserValidateInboundPort
{
  constructor(
    @Inject(USER_VALIDATE_OUTBOUND_PORT)
    private readonly userValidateOutboundPort: UserValidateOutboundPort,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에서 토큰추출
      ignoreExperation: true,
      secretOrKey: process.env.JWT_SECRETKEY,
    });
  }

  async validate(
    //payload,
    params: UserValidateOutboundPortInputDto,
  ): Promise<UserValidateOutboundPortOutputDto> {
    // const reqUser = payload.userId;
    // payload가 무엇이 있는지 모르는데 userId를 바로 가져오면 문제가 될 듯.
    // login 할 때 payload가 무엇이 들어가는지 명시하는 걸 타입을 공유해야 하나??
    const findUser = await this.userValidateOutboundPort.validate(params);

    if (!findUser) {
      return new UnauthorizedException({ message: 'User is not exist.' });
    }
    return findUser;
  }
}
