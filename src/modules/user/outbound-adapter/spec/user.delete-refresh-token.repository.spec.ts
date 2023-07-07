import * as dotenv from 'dotenv';
import { EntityManager } from '@mikro-orm/knex';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import testConfig from 'src/mikro-orm.test.config';
import { Users } from 'src/database/entities/Users';
import { UserUpdateRepository } from '../user.update.repository';
import { UserUpdateOutboundPortOutputDto } from '../../outbound-port/user.update.outbound-port';
import { UserDeleteRefreshTokenRepository } from '../user.delete-refresh-token.repository';
import { RefreshTokens } from 'src/database/entities/RefreshTokens';
import { UserDeleteRefreshTokenOutboundPortOutputDto } from '../../outbound-port/user.delete-refresh-token.outbound-port';

dotenv.config();

describe('UserRepository Spec', () => {
  let userDeleteRefreshTokenRepository: UserDeleteRefreshTokenRepository;
  let em: EntityManager;
  let orm: MikroORM;

  //------------------------------------------------------------------------------------------

  beforeAll(async () => {
    orm = await MikroORM.init({ ...testConfig, driver: PostgreSqlDriver });
    em = orm.em;
    userDeleteRefreshTokenRepository = new UserDeleteRefreshTokenRepository(em);

    const existentUsers = [
      // 기존 로컬 사용자와 구글(소셜) 사용자를 생성
      em.create(Users, {
        id: '1',
        email: 'testUserLocal@obo.com',
        nickname: 'localTester',
        password:
          '$2b$10$zGoIND0XuFXnCA/.cx1zT.df5Vf9364wGspjCM2/r2rexktKvjagu',
        authMethod: 'LOCAL',
      }),
      em.create(Users, {
        id: '2',
        email: 'testUserGoogle@obo.com',
        nickname: 'GoogleTester',
        password: null,
        authMethod: 'GOOGLE',
      }),
    ];

    for (const existentUser of existentUsers) {
      em.persist(existentUser);
    }
    await em.flush();
  });

  //------------------------------------------------------------------------------------------

  beforeEach(async () => {
    const newRefreshTokens = [
      // 사용자를 로그인 시킨다
      em.create(RefreshTokens, {
        user: '1',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwidG9rZW5UeXBlIjoiUkVGUkVTSCIsImlhdCI6MTY4ODY0NjgzMiwiZXhwIjoxNjg5ODU2NDMyfQ.1af0wV2hq5AI-JoKUSVn4zR3WeP_YsQd-fb_unKdbxk',
      }),
      em.create(RefreshTokens, {
        user: '2',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNiIsInRva2VuVHlwZSI6IlJFRlJFU0giLCJpYXQiOjE2ODg2OTk5NzYsImV4cCI6MTY4OTkwOTU3Nn0.-EUkp3GPlOmAFMjGTEnHVNxtBwOta4t9f_J19V2IYyk',
      }),
    ];

    for (const newRefreshToken of newRefreshTokens) {
      em.persist(newRefreshToken);
    }
    await em.flush();
  });

  //------------------------------------------------------------------------------------------

  afterEach(async () => {
    em.clear();
    await em.nativeDelete(RefreshTokens, {});
  });

  //------------------------------------------------------------------------------------------

  afterAll(async () => {
    await em.nativeDelete(Users, {});
    await orm.close();
  });

  //------------------------------------------------------------------------------------------

  test('로그아웃(로컬) : 리프레시토큰 삭제', async () => {
    const params = {
      userId: '1',
    };

    const result: UserDeleteRefreshTokenOutboundPortOutputDto =
      await userDeleteRefreshTokenRepository.execute(params);

    expect(result).toEqual({
      userId: '1',
    });
  });

  //------------------------------------------------------------------------------------------

  test('로그아웃(소셜) : 리프레시토큰 삭제', async () => {
    const params = {
      userId: '2',
    };

    const result: UserDeleteRefreshTokenOutboundPortOutputDto =
      await userDeleteRefreshTokenRepository.execute(params);

    expect(result).toEqual({
      userId: '2',
    });
  });

  //------------------------------------------------------------------------------------------
});
