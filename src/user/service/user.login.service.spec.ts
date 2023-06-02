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
import { UserLoginService } from './user.login.service';

class MockUserLoginOutboundTokenPort implements UserLoginOutboundTokenPort {
  private readonly token: UserLoginOutboundTokenPortOutputDto;

  constructor(token: UserLoginOutboundTokenPortOutputDto) {
    this.token = token;
  }

  createToken(
    params: UserLoginOutboundTokenPortInputDto,
  ): UserLoginOutboundTokenPortOutputDto {
    return this.token;
  }
}

//----------------------------------------------------------------

describe('UserLoginService Spec', () => {
  //
  test('로그인(토큰) : 가드로부터 받은 유저에 대해 토큰을 반환한다.', async () => {
    const userLoginService = new UserLoginService(
      new MockUserLoginOutboundTokenPort({
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsidXNlcklkIjoiMSJ9LCJpYXQiOjE2ODU1MTgyMzMsImV4cCI6MTY4NTUyMTgzM30.owWycm03A0LF-Z7w7InPphgCklc4Q9KNSxgpyjwpB7s',
      }),
    );

    const result = userLoginService.login({
      userId: '1',
      email: 'testSignUp@obo.com',
      password: '1q2w3e4r',
      nickname: '테스트 로그인',
      authMethod: 'local',
    });

    expect(result).toStrictEqual({
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsidXNlcklkIjoiMSJ9LCJpYXQiOjE2ODU1MTgyMzMsImV4cCI6MTY4NTUyMTgzM30.owWycm03A0LF-Z7w7InPphgCklc4Q9KNSxgpyjwpB7s',
    });
  });

  // test('로그인(토큰) : 없는 이메일로 로그인 시, 토큰을 반환하지 않는다', async () => {})
  // 가드가 있는데 필요한가?
});
