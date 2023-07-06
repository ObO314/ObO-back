import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import {
  UserUpdateInboundPort,
  UserUpdateInboundPortInputDto,
  UserUpdateInboundPortOutputDto,
} from '../inbound-port/user.update.inbound-port';
import { filter, head, map, pipe, toAsync } from '@fxts/core';
import {
  USER_READ_OUTBOUND_PORT,
  UserReadOutboundPort,
} from '../outbound-port/user.read.outbound-port';
import {
  USER_UPDATE_OUTBOUND_PORT,
  UserUpdateOutboundPort,
} from '../outbound-port/user.update.outbound-port';

export class UserUpdateService implements UserUpdateInboundPort {
  constructor(
    @Inject(USER_READ_OUTBOUND_PORT)
    private readonly userReadOutboundPort: UserReadOutboundPort,
    @Inject(USER_UPDATE_OUTBOUND_PORT)
    private readonly userUpdateOutboundPort: UserUpdateOutboundPort,
  ) {}

  async execute(
    params: UserUpdateInboundPortInputDto,
  ): Promise<UserUpdateInboundPortOutputDto> {
    // 유저 아이디로 검색하여 수정
    // 그리고 유저정보 반환

    return await pipe(
      [params],
      toAsync,
      map((params) => this.userUpdateOutboundPort.execute(params)),
      map((user) => {
        return {
          userId: user.id,
          email: user.email,
          nickname: user.nickname,
          profileImg: user.profileImg || process.env.USER_DEFAULT_IMAGE,
        };
      }),
      head,
    );
  }
}
