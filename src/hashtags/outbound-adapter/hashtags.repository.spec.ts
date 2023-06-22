import * as dotenv from 'dotenv';
import { EntityManager } from '@mikro-orm/knex';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import testConfig from 'src/mikro-orm.test.config';
import { Users } from 'src/database/entities/Users';
import { HttpException, HttpStatus } from '@nestjs/common';
import { HashtagsUserRepository } from './hashtags.repository';

dotenv.config();

////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////    추 후  파 일  분 리 예 정     ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('HashtagsRepository : create', () => {
  let userRepository: HashtagsUserRepository;
  let em: EntityManager;
  let orm: MikroORM;

  //------------------------------------------------------------------------------------------

  beforeAll(async () => {
    orm = await MikroORM.init({ ...testConfig, driver: PostgreSqlDriver });
    em = orm.em;
    userRepository = new UserRepository(em);
  });

  //------------------------------------------------------------------------------------------

  beforeEach(async () => {
    const newUsers = [];
    newUsers.push(
      em.create(Users, {
        id: '1',
        email: 'oboTestUser1@obo.com',
        nickname: 'whiteOBO',
        password:
          '$2b$10$zGoIND0XuFXnCA/.cx1zT.df5Vf9364wGspjCM2/r2rexktKvjagu',
        authMethod: 'LOCAL',
      }),
    );
    newUsers.push(
      em.create(Users, {
        id: '2',
        email: 'oboTestUser2@obo.com',
        nickname: 'blackOBO',
        password:
          '$2b$10$zGoIND0XuFXnCA/.cx1zT.df5Vf9364wGspjCM2/r2rexktKvjagu',
        authMethod: 'LOCAL',
      }),
    );

    for (const newUser of newUsers) {
      await em.persistAndFlush(newUser);
    }
  });

  //------------------------------------------------------------------------------------------

  afterEach(async () => {
    await em.nativeDelete(Users, {});
    em.clear();
  });

  //------------------------------------------------------------------------------------------

  afterAll(async () => {
    await em.nativeDelete(Users, {});
    await orm.close();
  });

  //------------------------------------------------------------------------------------------

  test('회원가입(로컬) : 가입 가능한 이메일', async () => {
    const params = {
      id: '3', // 임의지정
      email: 'oboTestUser3@obo.com',
      nickname: 'blackOBO',
      password: '1q2w3e4r',
      authMethod: 'LOCAL',
    };

    const result: UserSignUpLocalOutboundPortOutputDto =
      await userRepository.signUpLocal(params);

    expect(result).toEqual({
      userId: '3',
      email: 'oboTestUser3@obo.com',
      nickname: 'blackOBO',
    });
  });

  //------------------------------------------------------------------------------------------

  test('회원가입(로컬) : 이미 가입된 이메일', async () => {
    const params = {
      email: 'oboTestUser1@obo.com',
      nickname: 'ImDuplicated',
      password: '1q2w3e4r',
      authMethod: 'LOCAL',
    };

    expect(
      async () => await userRepository.signUpLocal(params),
    ).rejects.toThrow(
      new HttpException('이미 가입된 이메일입니다.', HttpStatus.BAD_REQUEST),
    );
  });

  //------------------------------------------------------------------------------------------

  test('회원가입(로컬) : 비어있는 비밀번호', async () => {
    const params = {
      email: 'oboTestUser4@obo.com',
      nickname: 'IhaveNotPw',
      password: null,
      authMethod: 'LOCAL',
    };

    expect(
      async () => await userRepository.signUpLocal(params),
    ).rejects.toThrow(
      new HttpException('비밀번호를 입력하세요', HttpStatus.BAD_REQUEST),
    );
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
