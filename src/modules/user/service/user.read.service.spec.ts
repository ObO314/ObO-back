import {
  UserReadOutboundPort,
  UserReadOutboundPortInputDto,
  UserReadOutboundPortOutputDto,
} from '../outbound-port/user.read.outbound-port';
import { UserReadService } from './user.read.service';

class MockUserReadOutboundPort implements UserReadOutboundPort {
  private readonly params: UserReadOutboundPortOutputDto;

  constructor(params: UserReadOutboundPortOutputDto) {
    this.params = params;
  }

  async read(
    params: UserReadOutboundPortInputDto,
  ): Promise<UserReadOutboundPortOutputDto> {
    return this.params;
  }
}

describe('UserReadService Spec', () => {
  test('회원조회 : 회원정보 받아오기', async () => {
    const userReadService = new UserReadService(
      new MockUserReadOutboundPort({
        userId: '1',
        email: 'backend@obo.com',
        nickname: 'ObO백엔드관리자',
        profileImg:
          'https://obo-s3.s3.ap-northeast-2.amazonaws.com/obo-user-profile/1686223996746_ObO.profile.jpg',
        progressRoutine: 70,
        progressTodo: 65,
        progressWork: 90,
      }),
    );
    const result = await userReadService.read({ userId: '1' });

    expect(result).toStrictEqual({
      userId: '1',
      email: 'backend@obo.com',
      nickname: 'ObO백엔드관리자',
      profileImg:
        'https://obo-s3.s3.ap-northeast-2.amazonaws.com/obo-user-profile/1686223996746_ObO.profile.jpg',
      progressRoutine: 70,
      progressTodo: 65,
      progressWork: 90,
    });
  });
});
