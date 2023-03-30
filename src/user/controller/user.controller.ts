import {
  Controller,
  Inject,
  Body,
  Headers,
  Post,
  Res,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {
  USER_LOGIN_INBOUND_PORT,
  UserLoginInboundPort,
  UserLoginInboundPortInputDto,
} from '../inbound-port/user.login-inbound-port';
import {
  USER_SIGN_UP_INBOUND_PORT,
  UserSignUpInboundPort,
  UserSignUpInboundPortInputDto,
} from './../inbound-port/user.sign-up.inbound-port';
import {
  UserAuthorizeInboundPort,
  UserAuthorizeInboundPortInputDto,
  USER_AUTHORIZE_INBOUND_PORT,
} from '../inbound-port/user.authorize.inbound-port';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SIGN_UP_INBOUND_PORT)
    private readonly userSignUpInboundPort: UserSignUpInboundPort,

    @Inject(USER_LOGIN_INBOUND_PORT)
    private readonly userLoginInboundPort: UserLoginInboundPort,

    @Inject(USER_AUTHORIZE_INBOUND_PORT)
    private readonly usersAuthorizeInboundPort: UserAuthorizeInboundPort,
  ) {}

  @Post('signUp')
  async signUp(
    @Body()
    userSignUpInboundPortInput: UserSignUpInboundPortInputDto,
  ) {
    return this.userSignUpInboundPort.signUp(userSignUpInboundPortInput);
  }

  @Post('login')
  async login(
    @Body()
    userLoginInboundPortInput: UserLoginInboundPortInputDto,
    @Res()
    res: Response,
  ) {
    const jwt = await this.userLoginInboundPort.execute(
      userLoginInboundPortInput,
    );
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    return res.json(jwt);
  }

  @Post('authorize')
  @UseGuards(AuthGuard())
  async validate(
    //@Req()
    @Headers()
    headers,
  ) {
    const userAuthorizeInboundPortInput: UserAuthorizeInboundPortInputDto = {
      userId: String(headers.user_id),
    };
    console.log(userAuthorizeInboundPortInput);
    return this.usersAuthorizeInboundPort.validate(
      userAuthorizeInboundPortInput,
    );
  }
}
