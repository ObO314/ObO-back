import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as StrategyJWT } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import {
  AuthJwtInboundPort,
  AuthJwtLoginInboundPortInputDto,
  AuthJwtLoginInboundPortOutputDto,
  AuthJwtValidateInboundPortInputDto,
  AuthJwtValidateInboundPortOutputDto,
} from '../inbound-port/auth.jwt.inbound-port';

@Injectable()
export class JwtStrategy
  extends PassportStrategy(StrategyJWT)
  implements AuthJwtInboundPort
{
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRETKEY,
    });
  }

  async validate(
    payload: AuthJwtValidateInboundPortInputDto,
  ): Promise<AuthJwtValidateInboundPortOutputDto> {
    return {};
  }

  createToken(
    userId: AuthJwtLoginInboundPortInputDto,
  ): AuthJwtLoginInboundPortOutputDto {
    console.log(this.jwtService.sign({ userId: userId }));
    return { accessToken: this.jwtService.sign({ userId: userId }) };
  }
}
