import * as dotenv from 'dotenv';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  UserReadOutboundPort,
  UserReadOutboundPortInputDto,
  UserReadOutboundPortOutputDto,
} from '../../outbound-port/user.read.outbound-port';
import { UserReadService } from '../user.read.service';
import { UserReadInboundPortOutputDto } from '../../inbound-port/user.read.inbound-port';

dotenv.config();

describe('UserReadService Spec', () => {
  let userReadService: UserReadService;

  class MockUserReadOutboundPort implements UserReadOutboundPort {
    constructor(private readonly params: UserReadOutboundPortOutputDto) {}
    async execute(
      _: UserReadOutboundPortInputDto,
    ): Promise<UserReadOutboundPortOutputDto> {
      return this.params;
    }
  }

  //------------------------------------------------------------------------------------------

  //   beforeAll(() => {});

  //------------------------------------------------------------------------------------------

  //   beforeEach(() => {});

  //------------------------------------------------------------------------------------------

  //   afterEach(() => {});

  //------------------------------------------------------------------------------------------

  //   afterAll(() => {});

  //------------------------------------------------------------------------------------------

  test('유저검색 : 존재하는 유저에 대한 검색', async () => {
    userReadService = new UserReadService(
      new MockUserReadOutboundPort({
        id: '1',
        email: 'testUserLocal@obo.com',
        nickname: 'localTester',
        profileImg: null,
        password:
          '$2b$10$zGoIND0XuFXnCA/.cx1zT.df5Vf9364wGspjCM2/r2rexktKvjagu',
        authMethod: 'LOCAL',
      }),
    );

    const params = {
      userId: '1',
    };

    const result: UserReadInboundPortOutputDto = await userReadService.execute(
      params,
    );

    expect(result).toEqual({
      userId: '1',
      email: 'testUserLocal@obo.com',
      nickname: 'localTester',
      profileImg: process.env.USER_DEFAULT_IMAGE,
      password: '$2b$10$zGoIND0XuFXnCA/.cx1zT.df5Vf9364wGspjCM2/r2rexktKvjagu',
      authMethod: 'LOCAL',
    });
  });

  //------------------------------------------------------------------------------------------

  test('유저검색 : 존재하지 않는 유저에 대한 검색', async () => {
    userReadService = new UserReadService(new MockUserReadOutboundPort(null));

    const params = {
      userId: '0',
    };

    expect(async () => await userReadService.execute(params)).rejects.toThrow(
      new HttpException('존재하지 않는 사용자 입니다.', HttpStatus.BAD_REQUEST),
    );
  });

  //------------------------------------------------------------------------------------------
});
