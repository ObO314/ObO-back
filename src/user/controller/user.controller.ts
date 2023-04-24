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
} from '../inbound-port/user.sign-up.inbound-port';
import {
  UserValidateInboundPort,
  UserValidateInboundPortInputDto,
  USER_VALIDATE_INBOUND_PORT,
} from '../inbound-port/user.validate.inbound-port';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SIGN_UP_INBOUND_PORT)
    private readonly userSignUpInboundPort: UserSignUpInboundPort,

    @Inject(USER_LOGIN_INBOUND_PORT)
    private readonly userLoginInboundPort: UserLoginInboundPort,

    @Inject(USER_VALIDATE_INBOUND_PORT)
    private readonly userValidateInboundPort: UserValidateInboundPort,
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

  @Post('validate')
  @UseGuards(AuthGuard())
  async validate(
    //@Req()
    @Headers()
    headers,
  ) {
    const userAuthorizeInboundPortInput: UserValidateInboundPortInputDto = {
      userId: String(headers.user_id),
    };
    return this.userValidateInboundPort.validate(userAuthorizeInboundPortInput);
  }
}
