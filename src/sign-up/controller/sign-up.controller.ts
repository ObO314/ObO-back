import {
  Controller,
  Post,
  Get,
  Inject,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import {
  SIGN_UP_INBOUND_PORT,
  SignUpInboundPortInputDto,
  SignUpInboundPort,
} from '../inbound-port/sign-up.inbound-port';

@Controller('sign-up')
export class signUpController {
  constructor(
    @Inject(SIGN_UP_INBOUND_PORT)
    private readonly SignUpInboundPort: SignUpInboundPort,
  ) {}

  @Post('regist')
  async regist(
    // 중복 이메일 확인
    // 있으면 Bad Req, 없으면 추가
    // 비밀번호는 Bcrypt
    @Body()
    signUpInboundPortInput: SignUpInboundPortInputDto,
  ) {
    return this.SignUpInboundPort.execute(signUpInboundPortInput);
  }
}
