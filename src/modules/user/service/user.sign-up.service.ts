import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { filter, head, map, pipe, toAsync } from '@fxts/core';
import {
  USER_READ_OUTBOUND_PORT,
  UserReadOutboundPort,
} from '../outbound-port/user.read.outbound-port';
import * as bcrypt from 'bcrypt';
import {
  USER_CREATE_OUTBOUND_PORT,
  UserCreateOutboundPort,
} from '../outbound-port/user.create.outbound-port';
import {
  UserSignUpInboundPort,
  UserSignUpInboundPortInputDto,
  UserSignUpInboundPortOutputDto,
} from '../inbound-port/user.sign-up.inbound-port';

export class UserSignUpService implements UserSignUpInboundPort {
  constructor(
    @Inject(USER_READ_OUTBOUND_PORT)
    private readonly userReadOutboundPort: UserReadOutboundPort,
    @Inject(USER_CREATE_OUTBOUND_PORT)
    private readonly userCreateOutboundPort: UserCreateOutboundPort,
  ) {}

  async execute(
    params: UserSignUpInboundPortInputDto,
  ): Promise<UserSignUpInboundPortOutputDto> {
    // 이메일이 존재하는가
    // 유효한 비밀번호인가
    // 비밀번호를 해쉬화
    // 유저 생성하기
    // 유저를 찾아 DB에서 반환 하기

    return await pipe(
      [params],
      toAsync,
      filter(async (params) => {
        if (
          !(await this.userReadOutboundPort.execute({
            email: params.email,
          }))
        ) {
          return true;
        } else {
          throw new HttpException(
            '이미 가입된 이메일입니다.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      filter((params) => {
        if (params.password) {
          return true;
        } else {
          throw new HttpException(
            '비밀번호를 입력하세요.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      map(async (params) => {
        return {
          ...params,
          password: await bcrypt.hash(params.password, 10),
        };
      }),
      map((params) => this.userCreateOutboundPort.execute(params)),
      map((user) => {
        return {
          userId: user.id,
          email: user.email,
          nickname: user.nickname,
        };
      }),
      head,
    );
  }
}
