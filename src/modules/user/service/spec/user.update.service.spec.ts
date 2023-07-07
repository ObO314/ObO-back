import * as dotenv from 'dotenv';
import { UserUpdateService } from '../user.update.service';
import {
  UserUpdateInboundPort,
  UserUpdateInboundPortOutputDto,
} from '../../inbound-port/user.update.inbound-port';
import {
  UserUpdateOutboundPort,
  UserUpdateOutboundPortInputDto,
  UserUpdateOutboundPortOutputDto,
} from '../../outbound-port/user.update.outbound-port';
import { Users } from 'src/database/entities/Users';

dotenv.config();

jest.mock('bcrypt', () => ({
  hash: async (password) => `hashed${password}`,
}));

describe('UserUpdateService Spec', () => {
  let userUpdateService: UserUpdateService;

  //------------------------------------------------------------------------------------------

  //   beforeAll(() => {});

  //------------------------------------------------------------------------------------------

  //   beforeEach(() => {});

  //------------------------------------------------------------------------------------------

  //   afterEach(() => {});

  //------------------------------------------------------------------------------------------

  //   afterAll(() => {});

  //------------------------------------------------------------------------------------------

  test('유저 정보수정 : 닉네임, 프로필사진 수정', async () => {
    class MockUserUpdateOutboundPort implements UserUpdateOutboundPort {
      constructor(private readonly params: UserUpdateOutboundPortOutputDto) {}
      async execute(
        params: UserUpdateOutboundPortInputDto,
      ): Promise<UserUpdateOutboundPortOutputDto> {
        return this.params;
      }
    }

    userUpdateService = new UserUpdateService(
      new MockUserUpdateOutboundPort({
        id: '1',
        email: 'testUserLocal@obo.com',
        nickname: 'AfterName',
        profileImg:
          'https://obo-s3.s3.ap-northeast-2.amazonaws.com/obo-user-profile/1686223996746_ObO.profile.jpg',
        authMethod: 'LOCAL',
      }),
    );

    const params = {
      userId: '1',
      nickname: 'AfterName',
      profileImg:
        'https://obo-s3.s3.ap-northeast-2.amazonaws.com/obo-user-profile/1686223996746_ObO.profile.jpg',
    };

    // 최종 결과값 확인
    expect(await userUpdateService.execute(params)).toEqual({
      userId: '1',
      email: 'testUserLocal@obo.com',
      nickname: 'AfterName',
      profileImg:
        'https://obo-s3.s3.ap-northeast-2.amazonaws.com/obo-user-profile/1686223996746_ObO.profile.jpg',
    });
  });

  //------------------------------------------------------------------------------------------
  test('유저 정보수정 : 비밀번호 수정', async () => {
    class MockUserUpdateOutboundPort implements UserUpdateOutboundPort {
      constructor() {}
      execute = jest.fn().mockResolvedValue({
        id: '1',
        email: 'testUserLocal@obo.com',
        nickname: 'AfterName',
        profileImg:
          'https://obo-s3.s3.ap-northeast-2.amazonaws.com/obo-user-profile/1686223996746_ObO.profile.jpg',
        password: 'AfterPassword',
        authMethod: 'LOCAL',
      });
    }

    const mockUserUpdateOutboundPort = new MockUserUpdateOutboundPort();
    userUpdateService = new UserUpdateService(mockUserUpdateOutboundPort);

    const params = {
      userId: '1',
      password: 'updatedPassword',
    };

    const result: UserUpdateInboundPortOutputDto =
      await userUpdateService.execute(params);

    // 비밀번호 암호화 확인
    expect(mockUserUpdateOutboundPort.execute).toHaveBeenCalledWith({
      userId: '1',
      password: 'hashedupdatedPassword',
    });

    // 최종 결과값 확인
    expect(result).toEqual({
      userId: '1',
      email: 'testUserLocal@obo.com',
      nickname: 'AfterName',
      profileImg:
        'https://obo-s3.s3.ap-northeast-2.amazonaws.com/obo-user-profile/1686223996746_ObO.profile.jpg',
    });
  });

  //------------------------------------------------------------------------------------------
});
