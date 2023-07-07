import * as dotenv from 'dotenv';
import {
  UserCreateTokensOutboundPort,
  UserCreateTokensOutboundPortInputDto,
  UserCreateTokensOutboundPortOutputDto,
} from '../../outbound-port/user.create-tokens.outbound-port';
import { UserLoginInboundPortOutputDto } from '../../inbound-port/user.login.inbound-port';
import { UserLoginService } from '../user.login.service';

dotenv.config();

describe('UserLoginService Spec', () => {
  let userLoginService: UserLoginService;

  class MockUserCreateTokensOutboundPort
    implements UserCreateTokensOutboundPort
  {
    constructor(
      private readonly params: UserCreateTokensOutboundPortOutputDto,
    ) {}
    createToken(
      _: UserCreateTokensOutboundPortInputDto,
    ): UserCreateTokensOutboundPortOutputDto {
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

  test('로그인(로컬) : 정상적인 로그인', async () => {
    userLoginService = new UserLoginService(
      new MockUserCreateTokensOutboundPort({
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNiIsInRva2VuVHlwZSI6IkFDQ0VTUyIsImlhdCI6MTY4ODY5OTk3NiwiZXhwIjoxNjg4NzAxNzc2fQ.qK12algFO3vIHapXwXiBcjmT90vAmoxszqUHbNEoRHA',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNiIsInRva2VuVHlwZSI6IlJFRlJFU0giLCJpYXQiOjE2ODg2OTk5NzYsImV4cCI6MTY4OTkwOTU3Nn0.-EUkp3GPlOmAFMjGTEnHVNxtBwOta4t9f_J19V2IYyk',
      }),
    );

    const params = {
      userId: '1',
    };

    const result: UserLoginInboundPortOutputDto =
      userLoginService.execute(params);

    expect(result).toEqual({
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNiIsInRva2VuVHlwZSI6IkFDQ0VTUyIsImlhdCI6MTY4ODY5OTk3NiwiZXhwIjoxNjg4NzAxNzc2fQ.qK12algFO3vIHapXwXiBcjmT90vAmoxszqUHbNEoRHA',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNiIsInRva2VuVHlwZSI6IlJFRlJFU0giLCJpYXQiOjE2ODg2OTk5NzYsImV4cCI6MTY4OTkwOTU3Nn0.-EUkp3GPlOmAFMjGTEnHVNxtBwOta4t9f_J19V2IYyk',
    });
  });

  //------------------------------------------------------------------------------------------
});
