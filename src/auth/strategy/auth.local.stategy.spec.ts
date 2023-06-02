import { HttpException, HttpStatus } from '@nestjs/common';
import {
  AuthLocalStrategyOutboundPort,
  AuthLocalStrategyOutboundPortInputDto,
  AuthLocalStrategyOutboundPortOutputDto,
} from '../outbound-port/auth.local.strategy.outbound-port';
import { AuthLocalStrategy } from './auth.local.strategy';

class MockAuthLocalStrategyOutboundPort
  implements AuthLocalStrategyOutboundPort
{
  private readonly user: AuthLocalStrategyOutboundPortOutputDto | Error;

  constructor(user: AuthLocalStrategyOutboundPortOutputDto | Error) {
    this.user = user;
  }

  async findUser(
    params: AuthLocalStrategyOutboundPortInputDto,
  ): Promise<AuthLocalStrategyOutboundPortOutputDto> {
    if (this.user instanceof Error) {
      throw this.user;
    } else {
      return this.user;
    }
  }
}

//----------------------------------------------------------------

describe('AuthLocalStrategy Spec', () => {
  //----------------------------------------------------------------

  test('로컬 로그인 : 존재하는 이메일, 일치하는 비밀번호', async () => {
    const authLocalStrategy = new AuthLocalStrategy(
      new MockAuthLocalStrategyOutboundPort({
        userId: '1',
        email: 'backend@obo.com',
        password:
          '$2b$10$zGoIND0XuFXnCA/.cx1zT.df5Vf9364wGspjCM2/r2rexktKvjagu',
      }),
    );

    const result = await authLocalStrategy.validate(
      'backend@obo.com',
      '1q2w3e4r',
    );

    expect(result).toStrictEqual({ userId: '1' });
  });

  //----------------------------------------------------------------

  test('로컬 로그인 : 존재하는 이메일, 불일치하는 비밀번호', async () => {
    const authLocalStrategy = new AuthLocalStrategy(
      new MockAuthLocalStrategyOutboundPort({
        userId: '1',
        email: 'backend@obo.com',
        password:
          '$2b$10$zGoIND0XuFXnCA/.cx1zT.df5Vf9364wGspjCM2/r2rexktKvjagu',
      }),
    );

    await expect(() =>
      authLocalStrategy.validate('backend@obo.com', '1q2w3e4r123123'),
    ).rejects.toThrow(
      new HttpException('비밀번호가 틀렸습니다.', HttpStatus.BAD_REQUEST),
    );
  });

  //----------------------------------------------------------------

  test('로컬 로그인 : 존재하지 않는 이메일', async () => {
    const authLocalStrategy = new AuthLocalStrategy(
      new MockAuthLocalStrategyOutboundPort(
        new Error('계정이 존재하지 않습니다.'),
      ),
    );

    await expect(() =>
      authLocalStrategy.validate('notvalidate@obo.com', '1q2w3e4r123123'),
    ).rejects.toThrow(
      new HttpException('계정이 존재하지 않습니다.', HttpStatus.BAD_REQUEST),
    );
  });
  //----------------------------------------------------------------
});
