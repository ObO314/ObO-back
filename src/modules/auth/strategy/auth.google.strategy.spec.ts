import { HttpException, HttpStatus } from '@nestjs/common';
import {
  AuthLocalStrategyOutboundPort,
  AuthLocalStrategyOutboundPortInputDto,
  AuthLocalStrategyOutboundPortOutputDto,
} from '../outbound-port/auth.local.strategy.outbound-port';
import { AuthLocalStrategy } from './auth.local.strategy';
import { rejects } from 'assert';
import {
  AuthGoogleStrategyOutboundPort,
  AuthGoogleStrategyOutboundPortInputDto,
  AuthGoogleStrategyOutboundPortOutputDto,
} from '../outbound-port/auth.google.strategy.outbound-port';
import { AuthGoogleStrategy } from './auth.google.strategy';

class MockAuthGoogleStrategyOutboundPort
  implements AuthGoogleStrategyOutboundPort
{
  private readonly user: AuthGoogleStrategyOutboundPortOutputDto;

  constructor(user: AuthGoogleStrategyOutboundPortOutputDto) {
    this.user = user;
  }

  async findUser(
    params: AuthGoogleStrategyOutboundPortInputDto,
  ): Promise<AuthGoogleStrategyOutboundPortOutputDto> {
    return this.user;
  }
}

//----------------------------------------------------------------

describe('AuthLocalStrategy Spec', () => {
  //----------------------------------------------------------------
  // test('구글 로그인 : OAUTH 2.0 로 유저 데이터 받아와 로그인', async () => {
  //   const authLocalStrategy = new AuthGoogleStrategy(
  //     new MockAuthGoogleStrategyOutboundPort({
  //       userId: '1',
  //       email: 'obobackend@gmail.com',
  //     }),
  //   );
  //   const result = await authLocalStrategy.validate();
  //   //accessToken: string,
  //   //refreshToken: string,
  //   //profile: any,
  //   //done: any,
  //   expect(result).toStrictEqual(true);
  // });
  //----------------------------------------------------------------
});
