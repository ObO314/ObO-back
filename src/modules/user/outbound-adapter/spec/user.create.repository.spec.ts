import * as dotenv from 'dotenv';
import { UserCreateRepository } from '../user.create.repository';
import { EntityManager } from '@mikro-orm/knex';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import testConfig from 'src/mikro-orm.test.config';
import { Users } from 'src/database/entities/Users';
import { UserCreateOutboundPortOutputDto } from '../../outbound-port/user.create.outbound-port';

dotenv.config();

describe('UserCreateRepository Spec', () => {
  let userCreateRepository: UserCreateRepository;
  let em: EntityManager;
  let orm: MikroORM;

  //------------------------------------------------------------------------------------------

  beforeAll(async () => {
    orm = await MikroORM.init({ ...testConfig, driver: PostgreSqlDriver });
    em = orm.em;
    userCreateRepository = new UserCreateRepository(em);
  });

  //------------------------------------------------------------------------------------------

  beforeEach(async () => {});

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

  test('회원가입(로컬) : 로컬유저를 생성합니다.', async () => {
    const params = {
      id: '123', // 임의지정 (원래는 시퀀스 사용)
      email: 'createLocalTester@obo.com',
      nickname: 'oboNewbie',
      password: '1q2w3e4r',
      authMethod: 'LOCAL',
    };

    const result: UserCreateOutboundPortOutputDto =
      await userCreateRepository.execute(params);

    expect(result).toEqual({
      userId: '123',
      email: 'createLocalTester@obo.com',
      nickname: 'oboNewbie',
    });
  });

  //------------------------------------------------------------------------------------------

  test('회원가입(소셜) : 소셜유저를 생성합니다.', async () => {
    const params = {
      id: '123', // 임의지정 (원래는 시퀀스 사용)
      email: 'createSocialTester@obo.com',
      nickname: 'oboNewbie',
      password: null,
      authMethod: 'GOOGLE',
    };

    const result: UserCreateOutboundPortOutputDto =
      await userCreateRepository.execute(params);

    expect(result).toEqual({
      userId: '123',
      email: 'createSocialTester@obo.com',
      nickname: 'oboNewbie',
    });
  });

  //------------------------------------------------------------------------------------------
});
