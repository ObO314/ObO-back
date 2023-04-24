import { JwtService } from '@nestjs/jwt';
import {
  UserJwtServiceOutboundPort,
  UserJwtServiceOutboundPortInputDto,
  UserJwtServiceOutboundPortOutputDto,
} from '../outbound-port/user.jwt-service.outbound-port';

export class UserJwtService implements UserJwtServiceOutboundPort {
  constructor(private readonly jwtService: JwtService) {}
  sign(
    payload: UserJwtServiceOutboundPortInputDto,
  ): UserJwtServiceOutboundPortOutputDto {
    return { accessToken: this.jwtService.sign(payload) };
  }
}
