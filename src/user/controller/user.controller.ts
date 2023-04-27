import {
  Controller,
  Inject,
  Body,
  Post,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {
  USER_LOGIN_INBOUND_PORT,
  UserLoginInboundPort,
  UserLoginInboundPortInputDto,
  UserLoginInboundPortOutputDto,
} from '../inbound-port/user.login-inbound-port';
import {
  USER_SIGN_UP_INBOUND_PORT,
  UserSignUpInboundPort,
  UserSignUpInboundPortInputDto,
  UserSignUpInboundPortOutputDto,
} from '../inbound-port/user.sign-up.inbound-port';
import { LocalAuthGuard } from 'src/auth/local/guard/auth.local.guard';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SIGN_UP_INBOUND_PORT)
    private readonly userSignUpInboundPort: UserSignUpInboundPort,

    @Inject(USER_LOGIN_INBOUND_PORT)
    private readonly userLoginInboundPort: UserLoginInboundPort,
  ) {}

  @Post('signUp') // 얘는 반환값어디감???? type 적용하기
  async signUp(
    @Body()
    userSignUpInboundPortInput: UserSignUpInboundPortInputDto,
  ): Promise<UserSignUpInboundPortOutputDto> {
    return this.userSignUpInboundPort.signUp(userSignUpInboundPortInput);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() userLoginInboundPortInput: UserLoginInboundPortInputDto,
    @Res() res: Response, // 얘는 반환값어디감???? type 적용하기
  ): Promise<UserLoginInboundPortOutputDto> {
    const jwt = await this.userLoginInboundPort.login(
      userLoginInboundPortInput,
    );
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    res.json(jwt.accessToken);
    return { accessToken: jwt.accessToken };
  }
}
