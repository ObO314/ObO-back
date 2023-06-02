import { each, map, pipe, tap } from '@fxts/core';
import {
  Controller,
  Inject,
  Body,
  Post,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
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
import { AuthLocalGuard } from 'src/auth/guard/auth.local.guard';
import { DynamicAuthGuard } from 'src/auth/guard/auth.dynamic.guard';

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
    // @Body()
    // userlocalLoginInboundPortInput: UserLoginInboundPortInputDto,
    @Req()
    req: Request,
    @Res()
    res: Response,
  ): Promise<UserLoginInboundPortOutputDto> {
    const userlocalLoginInboundPortInput: UserLoginInboundPortInputDto =
      req.user as UserLoginInboundPortInputDto;

    pipe(
      userlocalLoginInboundPortInput,
      (input) => this.userLoginInboundPort.login(input),
      tap((accessToken) =>
        res.setHeader('Authorization', 'Bearer ' + accessToken),
      ),
      tap((accessToken) => res.json(accessToken)),
    );
    return;
  }
}
