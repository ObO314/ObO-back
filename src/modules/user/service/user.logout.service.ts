import { Inject } from '@nestjs/common';
import {
  userLogoutInboundPort,
  userLogoutInboundPortInputDto,
  userLogoutInboundPortOutputDto,
} from '../inbound-port/user.logout.inbound-port';
import { head, map, pipe, toAsync } from '@fxts/core';
import {
  USER_DELETE_REFRESH_TOKEN_OUTBOUND_PORT,
  UserDeleteRefreshTokenOutboundPort,
} from '../outbound-port/user.delete-refresh-token.outbound-port';

export class UserLogoutService implements userLogoutInboundPort {
  constructor(
    @Inject(USER_DELETE_REFRESH_TOKEN_OUTBOUND_PORT)
    private readonly userDeleteRefreshTokenOutboundPort: UserDeleteRefreshTokenOutboundPort,
  ) {}

  async execute(
    params: userLogoutInboundPortInputDto,
  ): Promise<userLogoutInboundPortOutputDto> {
    // 리프레시 토큰 제거
    return await pipe(
      [params],
      toAsync,
      map((params) => this.userDeleteRefreshTokenOutboundPort.execute(params)),
      map((user) => {
        return { userId: user.userId, logoutTime: new Date() };
      }),
      head,
    );
  }
}
