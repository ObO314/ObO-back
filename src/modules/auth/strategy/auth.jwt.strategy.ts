import { Users } from '../../../database/entities/Users';
import { JwtService } from '@nestjs/jwt';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Req,
  Res,
} from '@nestjs/common';
import { ExtractJwt, Strategy as StrategyJWT } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  AuthJwtInboundPort,
  AuthJwtLoginInboundPortInputDto,
  AuthJwtLoginInboundPortOutputDto,
  AuthJwtValidateInboundPortInputDto,
  AuthJwtValidateInboundPortOutputDto,
} from '../inbound-port/auth.jwt.strategy.inbound-port';
import {
  AUTH_FIND_REFRESH_TOKEN_OUTBOUND_PORT,
  AuthFindRefreshTokenOutboundPort,
} from '../outbound-port/auth.find-refresh-token.outbound-port';
import {
  AUTH_SAVE_REFRESH_TOKEN_OUTBOUND_PORT,
  AuthSaveRefreshTokenOutboundPort,
} from '../outbound-port/auth.save-refresh-token.outbound-port';

@Injectable()
export class AuthJwtStrategy
  extends PassportStrategy(StrategyJWT)
  implements AuthJwtInboundPort
{
  constructor(
    @Inject(AUTH_FIND_REFRESH_TOKEN_OUTBOUND_PORT)
    private readonly authFindRefreshTokenOutboundPort: AuthFindRefreshTokenOutboundPort,
    @Inject(AUTH_SAVE_REFRESH_TOKEN_OUTBOUND_PORT)
    private readonly authSaveRefreshTokenOutboundPort: AuthSaveRefreshTokenOutboundPort,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRETKEY,
    });
  }

  async validate(
    payload: AuthJwtValidateInboundPortInputDto,
  ): Promise<AuthJwtValidateInboundPortOutputDto> {
    const { userId, tokenType, iat, exp } = payload;
    switch (tokenType) {
      case 'ACCESS':
        return { undefined, userId };
      case 'REFRESH':
        const foundUserToken =
          await this.authFindRefreshTokenOutboundPort.execute({
            userId: userId,
          });
        if (!foundUserToken) {
          throw new HttpException(
            '다시 로그인하여 주십시오.',
            HttpStatus.BAD_REQUEST,
          );
        }
        const savedUser = foundUserToken.user.id;
        const savedToken = foundUserToken.token;

        const validateUser = userId == savedUser;
        const decodedToken = this.jwtService.verify(savedToken);

        const validateToken =
          iat == decodedToken.iat && exp == decodedToken.exp;

        if (validateUser && validateToken) {
          const newAccessToken = this.jwtService.sign(
            { userId: userId, tokenType: 'ACCESS' },
            { expiresIn: '30m' },
          );
          return { newAccessToken, userId };
        }
    }
  }

  createToken(
    payload: AuthJwtLoginInboundPortInputDto,
  ): AuthJwtLoginInboundPortOutputDto {
    const userId = payload.userId;
    const accessToken = this.jwtService.sign(
      { userId: userId, tokenType: 'ACCESS' },
      { expiresIn: '30m' },
    );
    const refreshToken = this.jwtService.sign(
      { userId: userId, tokenType: 'REFRESH' },
      { expiresIn: '14d' },
    );
    this.authSaveRefreshTokenOutboundPort.execute({
      userId: userId,
      token: refreshToken,
    });
    const tokens = { accessToken, refreshToken };

    return tokens;
  }
}
