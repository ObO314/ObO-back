import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import {
  UserReadInboundPort,
  UserReadInboundPortInputDto,
  UserReadInboundPortOutputDto,
} from '../inbound-port/user.read.inbound-port';
import {
  USER_READ_OUTBOUND_PORT,
  UserReadOutboundPort,
} from '../outbound-port/user.read.outbound-port';
import { filter, head, map, pipe, toAsync } from '@fxts/core';

export class UserReadService implements UserReadInboundPort {
  constructor(
    @Inject(USER_READ_OUTBOUND_PORT)
    private readonly userReadOutboundPort: UserReadOutboundPort,
  ) {}
  async execute(
    params: UserReadInboundPortInputDto,
  ): Promise<UserReadInboundPortOutputDto> {
    // 사용자 검색
    // 없으면 없는 유저라고 에러 던짐s

    return await pipe(
      [params],
      toAsync,
      map((params) =>
        this.userReadOutboundPort.execute({
          id: params.userId,
        }),
      ),
      filter((user) => {
        if (user) {
          return true;
        } else {
          throw new HttpException(
            '존재하지 않는 사용자 입니다.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      map((user) => {
        return {
          ...user,
          userId: user.id,
          profileImg: user.profileImg || process.env.USER_DEFAULT_IMAGE,
        };
      }),
      head,
    );
  }
}
