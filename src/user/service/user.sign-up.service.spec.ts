import { HttpException, HttpStatus } from '@nestjs/common';
import {
  UserLoginOutboundRepositoryPort,
  UserLoginOutboundRepositoryPortInputDto,
  UserLoginOutboundRepositoryPortOutputDto,
} from '../outbound-port/user.login.outbound-repository-port';
import {
  UserLoginOutboundTokenPort,
  UserLoginOutboundTokenPortInputDto,
  UserLoginOutboundTokenPortOutputDto,
} from '../outbound-port/user.login.outbound-token-port';
import {
  UserSignUpOutboundRepositoryPort,
  UserSignUpOutboundRepositoryPortInputDto,
  UserSignUpOutboundRepositoryPortOutputDto,
} from '../outbound-port/user.sign-up.outbound-repository-port';
import { UserLoginService } from './user.login.service';
import { UserSignUpService } from './user.sign-up.service';

class MockUserSignUpOutboundRepositoryPort
  implements UserSignUpOutboundRepositoryPort
{
  private readonly params: UserSignUpOutboundRepositoryPortOutputDto | Error;

  constructor(params: UserSignUpOutboundRepositoryPortOutputDto | Error) {
    this.params = params;
  }

  async signUp(
    _: UserSignUpOutboundRepositoryPortInputDto,
  ): Promise<UserSignUpOutboundRepositoryPortOutputDto> {
    if (this.params instanceof Error) {
      throw this.params;
    } else {
      return this.params;
    }
  }
}

//----------------------------------------------------------------

describe('UserSignUpService Spec', () => {
  test('회원가입 : 가입가능한 이메일', async () => {
    const userSignUpService = new UserSignUpService(
      new MockUserSignUpOutboundRepositoryPort({
        userId: '0',
        email: 'testSignUp@obo.com',
        password: '1q2w3e4r',
        nickname: '신규 로컬 회원가입',
      }),
    );

    const result = await userSignUpService.signUp({
      email: 'testSignUp@obo.com',
      password: '1q2w3e4r',
      nickname: '신규 로컬 회원가입',
      authMethod: 'local',
    });

    expect(result).toStrictEqual({
      userId: '0',
      email: 'testSignUp@obo.com',
      password: '1q2w3e4r',
      nickname: '신규 로컬 회원가입',
    });
  });

  //----------------------------------------------------------------

  test('회원가입 : 중복된 이메일', async () => {
    const userSignUpService = new UserSignUpService(
      new MockUserSignUpOutboundRepositoryPort(
        new Error('이미 가입된 이메일입니다.'),
      ),
    );

    await expect(() =>
      userSignUpService.signUp({
        email: 'testSignUp@obo.com',
        password: '1q2w3e4r',
        nickname: '신규 로컬 회원가입',
        authMethod: 'local',
      }),
    ).rejects.toThrow(
      new HttpException('이미 가입된 이메일입니다.', HttpStatus.BAD_REQUEST),
    );
  });
});
