import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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
    @Inject(USER_UPDATE_OUTBOUND_PORT)
    private readonly userUpdateOutboundPort: UserUpdateOutboundPort,
  ) {}

  async execute(
    params: UserUpdateInboundPortInputDto,
  ): Promise<UserUpdateInboundPortOutputDto> {
    return await pipe(
      [params],
      toAsync,
      map(async (params) => {
        if (params.password) {
          params.password = await bcrypt.hash(params.password, 10);
        }
        return params;
      }),
      map((params) => this.userUpdateOutboundPort.execute(params)),
      map((user) => {
        return {
          userId: user.id,
          email: user.email,
          nickname: user.nickname,
          profileImg: user.profileImg,
        };
      }),
      head,
    );
  }
}
