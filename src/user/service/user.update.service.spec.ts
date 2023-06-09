import {
  UserUpdateOutboundPort,
  UserUpdateOutboundPortInputDto,
  UserUpdateOutboundPortOutputDto,
} from '../outbound-port/user.update.outbound-port';
import { UserUpdateService } from './user.update.service';

class MockUserUpdateOutboundPort implements UserUpdateOutboundPort {
  private readonly params: UserUpdateOutboundPortOutputDto;

  constructor(params: UserUpdateOutboundPortOutputDto) {
    this.params = params;
  }

  async update(
    params: UserUpdateOutboundPortInputDto,
  ): Promise<UserUpdateOutboundPortOutputDto> {
    return this.params;
  }
}

describe('UserUpdateService Spec', () => {
  test('회원정보수정 : 회원정보 닉네임과 프로필이미지 수정', async () => {
    const userReadService = new UserUpdateService(
      new MockUserUpdateOutboundPort({
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
    const result = await userReadService.update({
      userId: '1',
      nickname: 'ObO백엔드관리자',
      profileImg:
        'https://obo-s3.s3.ap-northeast-2.amazonaws.com/obo-user-profile/1686223996746_ObO.profile.jpg',
    });

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

  test('회원정보수정 : 회원정보 닉네임만 수정', async () => {
    const userReadService = new UserUpdateService(
      new MockUserUpdateOutboundPort({
        userId: '1',
        email: 'backend@obo.com',
        nickname: 'ObO백엔드관리자',
        profileImg:
          'https://obo-s3.s3.ap-northeast-2.amazonaws.com/obo-user-default/ObO.profile.jpg',
        progressRoutine: 70,
        progressTodo: 65,
        progressWork: 90,
      }),
    );
    const result = await userReadService.update({
      userId: '1',
      nickname: 'ObO백엔드관리자',
    });

    expect(result).toStrictEqual({
      userId: '1',
      email: 'backend@obo.com',
      nickname: 'ObO백엔드관리자',
      profileImg:
        'https://obo-s3.s3.ap-northeast-2.amazonaws.com/obo-user-default/ObO.profile.jpg',
      progressRoutine: 70,
      progressTodo: 65,
      progressWork: 90,
    });
  });
});
