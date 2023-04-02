import { JwtService } from '@nestjs/jwt';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as StrategyJwt } from 'passport-jwt';
import { UserAuthorizeInboundPort } from '../inbound-port/user.authorize.inbound-port';
import {
  UserAuthorizeOutboundPort,
  UserAuthorizeOutboundPortInputDto,
  UserAuthorizeOutboundPortOutputDto,
  USER_AUTHORIZE_OUTBOUND_PORT,
} from '../outbound-port/user.authorize.outbound-port';

export class UserAuthorizeService
  extends PassportStrategy(StrategyJwt) //JWT전략을 시용하는 검증 로직입니다.
  implements UserAuthorizeInboundPort
{
  constructor(
    @Inject(USER_AUTHORIZE_OUTBOUND_PORT)
    private readonly userAuthorizeOutboundPort: UserAuthorizeOutboundPort,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에서 토큰추출
      ignoreExperation: true,
      secretOrKey: 'OBO_SECRET_KEY_314',
    });
  }

  async validate(
    params: UserAuthorizeOutboundPortInputDto,
  ): Promise<UserAuthorizeOutboundPortOutputDto> {
    const finduser = await this.userAuthorizeOutboundPort.validate(params);

    if (!finduser) {
      return new UnauthorizedException({ message: 'User is not exist.' });
    }
    return finduser;
  }
}
