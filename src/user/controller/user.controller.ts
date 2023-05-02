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
import {
  USER_LOGIN_INBOUND_PORT,
  UserLoginInboundPort,
  UserLoginInboundPortInputDto,
  UserLoginInboundPortOutputDto,
} from '../inbound-port/user.login.inbound-port';
import {
  USER_SIGN_UP_INBOUND_PORT,
  UserSignUpInboundPort,
  UserSignUpInboundPortInputDto,
  UserSignUpInboundPortOutputDto,
} from '../inbound-port/user.sign-up.inbound-port';
import { LocalAuthGuard } from 'src/auth/local/guard/auth.local.guard';
import { DynamicAuthGuard } from 'src/auth/dynamicAuthGuard';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SIGN_UP_INBOUND_PORT)
    private readonly userSignUpInboundPort: UserSignUpInboundPort,

    @Inject(USER_LOGIN_INBOUND_PORT)
    private readonly userLoginInboundPort: UserLoginInboundPort,
  ) {}

  @Post('signUp')
  async signUp(
    @Body()
    userSignUpInboundPortInput: UserSignUpInboundPortInputDto,
  ): Promise<UserSignUpInboundPortOutputDto> {
    return this.userSignUpInboundPort.signUp(userSignUpInboundPortInput);
  }

  @UseGuards(DynamicAuthGuard)
  @Post('login/:method')
  async localLogin(
    @Body()
    userlocalLoginInboundPortInput: UserLoginInboundPortInputDto,
    @Res() res: Response,
  ): Promise<UserLoginInboundPortOutputDto> {
    // 구글이나 로컬에서 사용자가 DB에 있음을 확인 후, 해당 email의 Userid를 가져온다.
    const jwt = await this.userLoginInboundPort.login(
      userlocalLoginInboundPortInput,
    );
    // 가져온 id를 가지고 jwt 토큰을 발급한다.
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    res.json(jwt.accessToken);
    return { accessToken: jwt.accessToken };
  }
}
