import { HttpException, HttpStatus } from '@nestjs/common';
import { UserSignUpLocalOutboundPortOutputDto } from '../outbound-port/user.sign-up-local.outbound-port';
import {
  UserSignUpSocialOutboundPort,
  UserSignUpSocialOutboundPortInputDto,
  UserSignUpSocialOutboundPortOutputDto,
} from '../outbound-port/user.sign-up-social.outbound-port';
import { UserSignUpSocialService } from './user.sign-up-social.service';

class MockUserSignUpSocialOutboundport implements UserSignUpSocialOutboundPort {
  private readonly params: UserSignUpSocialOutboundPortOutputDto | Error;

  constructor(params: UserSignUpSocialOutboundPortOutputDto | Error) {
    this.params = params;
  }

  async signUpSocial(
    params: UserSignUpSocialOutboundPortInputDto,
  ): Promise<UserSignUpSocialOutboundPortOutputDto> {
    if (this.params instanceof Error) {
      throw this.params;
    } else {
      return this.params;
    }
  }
}

describe('UserSignUpLocalService Spec', () => {
  //----------------------------------------------------------------

  test('회원가입(구글) : 가입가능한 이메일', async () => {
    const userSignUpSocialService = new UserSignUpSocialService(
      new MockUserSignUpSocialOutboundport({
        userId: '0',
        email: 'whitedayobo@gmail.com',
        nickname: '소셜뉴비닉네임',
      }),
    );

    const result = await userSignUpSocialService.signUpSocial({
      email: 'whitedayobo@gmail.com',
      nickname: '소셜뉴비닉네임',
      authMethod: 'GOOGLE',
    });

    expect(result).toStrictEqual({
      userId: '0',
      email: 'whitedayobo@gmail.com',
      nickname: '소셜뉴비닉네임',
    });
  });

  //----------------------------------------------------------------

  test('회원가입(구글) : 이미 가입한 이메일', async () => {
    const userSignUpSocialService = new UserSignUpSocialService(
      new MockUserSignUpSocialOutboundport(
        new Error('이미 가입된 이메일입니다.'),
      ),
    );

    await expect(() =>
      userSignUpSocialService.signUpSocial({
        email: 'testSignUp@obo.com',
        nickname: '신규로컬닉네임',
        authMethod: 'local',
      }),
    ).rejects.toThrow(
      new HttpException('이미 가입된 이메일입니다.', HttpStatus.BAD_REQUEST),
    );
  });
  //----------------------------------------------------------------
});
