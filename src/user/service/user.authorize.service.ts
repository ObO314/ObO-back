import { Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserAuthorizeInboundPort } from '../inbound-port/user.authorize.inbound-port';
import {
  UserAuthorizeOutboundPort,
  UserAuthorizeOutboundPortInputDto,
  UserAuthorizeOutboundPortOutputDto,
  USER_AUTHORIZE_OUTBOUND_PORT,
} from '../outbound-port/user.authorize.outbound-port';

export class UserAuthorizeService
  extends PassportStrategy(Strategy)
  implements UserAuthorizeInboundPort
{
  constructor(
    @Inject(USER_AUTHORIZE_OUTBOUND_PORT)
    private readonly userAuthorizeOutboundPort: UserAuthorizeOutboundPort,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExperation: true,
      secretOrKey: 'OBO_SECRET_KEY_314',
    });
  }

  async authorize(
    params: UserAuthorizeOutboundPortInputDto,
  ): Promise<UserAuthorizeOutboundPortOutputDto> {
    return;
  }
}
