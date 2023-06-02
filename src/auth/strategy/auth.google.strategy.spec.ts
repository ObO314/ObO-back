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

class MockAuthGoogleStrategyOutboundPort
  implements AuthGoogleStrategyOutboundPort
{
  private readonly user: AuthGoogleStrategyOutboundPortOutputDto;

  constructor(user: AuthGoogleStrategyOutboundPortOutputDto) {
    this.user = user;
  }

  async googleLogin(
    params: AuthGoogleStrategyOutboundPortInputDto,
  ): Promise<AuthGoogleStrategyOutboundPortOutputDto> {
    return this.user;
  }
}

//----------------------------------------------------------------

describe('AuthLocalStrategy Spec', () => {
  //----------------------------------------------------------------
  //   test('로컬 로그인 : 존재하는 이메일, 일치하는 비밀번호', async () => {
  //     const authLocalStrategy = new AuthLocalStrategy(
  //       new MockAuthGoogleStrategyOutboundPort({
  //         // 구글로그인 하면 주는거
  //       }),
  //     );
  //     const result = await authLocalStrategy.validate(
  //       'backend@obo.com',
  //       '1q2w3e4r',
  //     );
  //     expect(result).toStrictEqual(true);
  //   });
  //----------------------------------------------------------------
});
