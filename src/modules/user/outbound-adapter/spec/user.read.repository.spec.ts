import * as dotenv from 'dotenv';
import { EntityManager } from '@mikro-orm/knex';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import testConfig from 'src/mikro-orm.test.config';
import { Users } from 'src/database/entities/Users';
import { UserReadRepository } from '../user.read.repository';
import { UserReadOutboundPortOutputDto } from '../../outbound-port/user.read.outbound-port';

dotenv.config();

describe('UserReadRepository Spec', () => {
  let userReadRepository: UserReadRepository;
  let em: EntityManager;
  let orm: MikroORM;

  //------------------------------------------------------------------------------------------

  beforeAll(async () => {
    orm = await MikroORM.init({ ...testConfig, driver: PostgreSqlDriver });
    em = orm.em;
    userReadRepository = new UserReadRepository(em);
  });

  //------------------------------------------------------------------------------------------

  beforeEach(async () => {
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

  afterEach(async () => {
    em.clear();
    await em.nativeDelete(Users, {});
  });

  //------------------------------------------------------------------------------------------

  afterAll(async () => {
    await em.nativeDelete(Users, {});
    await orm.close();
  });

  //------------------------------------------------------------------------------------------

  test('유저조회(id) : 존재하는 유저의 검색', async () => {
    const params = {
      id: '1',
    };

    const result: UserReadOutboundPortOutputDto =
      await userReadRepository.execute(params);

    expect(result).toEqual({
      id: '1',
      email: 'testUserLocal@obo.com',
      nickname: 'localTester',
      password: '$2b$10$zGoIND0XuFXnCA/.cx1zT.df5Vf9364wGspjCM2/r2rexktKvjagu',
      authMethod: 'LOCAL',
    });
  });

  //------------------------------------------------------------------------------------------

  test('유저조회(id) : 존재하지 않는 유저의 검색', async () => {
    const params = {
      id: '0',
    };

    const result: UserReadOutboundPortOutputDto =
      await userReadRepository.execute(params);

    expect(result).toEqual(null);
  });

  //------------------------------------------------------------------------------------------

  test('유저조회(email) : 존재하는 유저의 검색', async () => {
    const params = {
      email: 'testUserGoogle@obo.com',
    };

    const result: UserReadOutboundPortOutputDto =
      await userReadRepository.execute(params);

    expect(result).toEqual({
      id: '2',
      email: 'testUserGoogle@obo.com',
      nickname: 'GoogleTester',
      password: null,
      authMethod: 'GOOGLE',
    });
  });

  //------------------------------------------------------------------------------------------

  test('유저조회(email) : 존재하지 않는 유저의 검색', async () => {
    const params = {
      email: 'thereIsNot@obo.com',
    };

    const result: UserReadOutboundPortOutputDto =
      await userReadRepository.execute(params);

    expect(result).toEqual(null);
  });
});
