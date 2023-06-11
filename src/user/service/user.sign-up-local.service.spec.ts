import { HttpException, HttpStatus } from '@nestjs/common';
import {
  UserSignUpLocalOutboundPort,
  UserSignUpLocalOutboundPortInputDto,
  UserSignUpLocalOutboundPortOutputDto,
} from '../outbound-port/user.sign-up-local.outbound-port';

import { UserSignUpLocalService } from './user.sign-up-local.service';

class MockUserSignUpLocalOutboundPort implements UserSignUpLocalOutboundPort {
  private readonly params: UserSignUpLocalOutboundPortOutputDto | Error;

  constructor(params: UserSignUpLocalOutboundPortOutputDto | Error) {
    this.params = params;
  }

  async signUpLocal(
    _: UserSignUpLocalOutboundPortInputDto,
  ): Promise<UserSignUpLocalOutboundPortOutputDto> {
    if (this.params instanceof Error) {
      throw this.params;
    } else {
      return this.params;
    }
  }
}

//----------------------------------------------------------------

describe('UserSignUpLocalService Spec', () => {
  test('회원가입(로컬) : 가입가능한 이메일', async () => {
    const userSignUpService = new UserSignUpLocalService(
      new MockUserSignUpLocalOutboundPort({
        userId: '0',
        email: 'testSignUp@obo.com',
        password: '1q2w3e4r',
        nickname: '신규로컬닉네임',
      }),
    );

    const result = await userSignUpService.signUpLocal({
      email: 'testSignUp@obo.com',
      password: '1q2w3e4r',
      nickname: '신규로컬닉네임',
      authMethod: 'local',
    });

    expect(result).toStrictEqual({
      userId: '0',
      email: 'testSignUp@obo.com',
      password: '1q2w3e4r',
      nickname: '신규로컬닉네임',
    });
  });

  //----------------------------------------------------------------

  test('회원가입(로컬) : 중복된 이메일', async () => {
    const userSignUpService = new UserSignUpLocalService(
      new MockUserSignUpLocalOutboundPort(
        new Error('이미 가입된 이메일입니다.'),
      ),
    );

    await expect(() =>
      userSignUpService.signUpLocal({
        email: 'testSignUp@obo.com',
        password: '1q2w3e4r',
        nickname: '신규로컬닉네임',
        authMethod: 'local',
      }),
    ).rejects.toThrow(
      new HttpException('이미 가입된 이메일입니다.', HttpStatus.BAD_REQUEST),
    );
  });
});
