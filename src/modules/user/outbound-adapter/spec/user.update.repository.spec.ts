import * as dotenv from 'dotenv';
import { EntityManager } from '@mikro-orm/knex';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import testConfig from 'src/mikro-orm.test.config';
import { Users } from 'src/database/entities/Users';
import { UserUpdateRepository } from '../user.update.repository';
import { UserUpdateOutboundPortOutputDto } from '../../outbound-port/user.update.outbound-port';

dotenv.config();

describe('UserUpdateRepository Spec', () => {
  let userUpdateRepository: UserUpdateRepository;
  let em: EntityManager;
  let orm: MikroORM;

  //------------------------------------------------------------------------------------------

  beforeAll(async () => {
    orm = await MikroORM.init({ ...testConfig, driver: PostgreSqlDriver });
    em = orm.em;
    userUpdateRepository = new UserUpdateRepository(em);
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

  test('유저정보 수정 : 닉네임 수정', async () => {
    const params = {
      userId: '1',
      nickname: 'UpdatedNickname',
    };

    const result: UserUpdateOutboundPortOutputDto =
      await userUpdateRepository.execute(params);

    expect(result).toEqual({
      id: '1',
      email: 'testUserLocal@obo.com',
      nickname: 'UpdatedNickname',
      profileImg: null,
      password: '$2b$10$zGoIND0XuFXnCA/.cx1zT.df5Vf9364wGspjCM2/r2rexktKvjagu',
      authMethod: 'LOCAL',
    });
  });

  //------------------------------------------------------------------------------------------

  test('유저정보 수정 : 프로필이미지 수정', async () => {
    const params = {
      userId: '1',
      profileImg:
        'https://obo-s3.s3.ap-northeast-2.amazonaws.com/obo-user-profile/1686223996746_ObO.profile.jpg',
    };

    const result: UserUpdateOutboundPortOutputDto =
      await userUpdateRepository.execute(params);

    expect(result).toEqual({
      id: '1',
      email: 'testUserLocal@obo.com',
      nickname: 'UpdatedNickname',
      profileImg:
        'https://obo-s3.s3.ap-northeast-2.amazonaws.com/obo-user-profile/1686223996746_ObO.profile.jpg',
      password: '$2b$10$zGoIND0XuFXnCA/.cx1zT.df5Vf9364wGspjCM2/r2rexktKvjagu',
      authMethod: 'LOCAL',
    });
  });

  //------------------------------------------------------------------------------------------

  test('유저정보 수정 : 비밀번호 수정', async () => {
    const params = {
      userId: '1',
      password:
        '$2b$10$zGoIND0XuFXnCA/.cx1zT.df5Vf9364wGspjCM2/r2rexktKvjaguNewPassWord',
    };

    const result: UserUpdateOutboundPortOutputDto =
      await userUpdateRepository.execute(params);

    expect(result).toEqual({
      id: '1',
      email: 'testUserLocal@obo.com',
      nickname: 'UpdatedNickname',
      profileImg: null,
      password:
        '$2b$10$zGoIND0XuFXnCA/.cx1zT.df5Vf9364wGspjCM2/r2rexktKvjaguNewPassWord',
      authMethod: 'LOCAL',
    });
  });

  //------------------------------------------------------------------------------------------
});
