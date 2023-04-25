import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as StrategyJWT } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';

dotenv.config();

export class JwtStrategy extends PassportStrategy(StrategyJWT) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRETKEY,
    });
  }

  async validate(payload: any) {
    return { userId: payload.userId };
  }

  async login(userId: string) {
    return { accessToken: this.jwtService.sign(userId) };
  }
}
