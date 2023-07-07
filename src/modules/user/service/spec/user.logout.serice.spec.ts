import * as dotenv from 'dotenv';
import {
  UserDeleteRefreshTokenOutboundPort,
  UserDeleteRefreshTokenOutboundPortInputDto,
  UserDeleteRefreshTokenOutboundPortOutputDto,
} from '../../outbound-port/user.delete-refresh-token.outbound-port';
import { UserLogoutService } from '../user.logout.service';
import { userLogoutInboundPortOutputDto } from '../../inbound-port/user.logout.inbound-port';

dotenv.config();

describe('UserSignUpService Spec', () => {
  let userLogoutService: UserLogoutService;

  class MockUserDeleteRefreshTokenOutboundPort
    implements UserDeleteRefreshTokenOutboundPort
  {
    constructor(
      private readonly params: UserDeleteRefreshTokenOutboundPortOutputDto,
    ) {}
    async execute(
      _: UserDeleteRefreshTokenOutboundPortInputDto,
    ): Promise<UserDeleteRefreshTokenOutboundPortOutputDto> {
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

  test('로그아웃 : 정상적인 로그아웃', async () => {
    userLogoutService = new UserLogoutService(
      new MockUserDeleteRefreshTokenOutboundPort({
        userId: '1',
      }),
    );

    const params = {
      userId: '1',
    };

    const result: userLogoutInboundPortOutputDto =
      await userLogoutService.execute(params);

    expect(result).toEqual({
      userId: '1',
      logoutTime: expect.any(Date),
    });
  });

  //------------------------------------------------------------------------------------------
});
