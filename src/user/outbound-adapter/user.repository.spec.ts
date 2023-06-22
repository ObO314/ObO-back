import * as dotenv from 'dotenv';
import { UserRepository } from './user.repository';
import { EntityManager } from '@mikro-orm/knex';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import testConfig from 'src/mikro-orm.test.config';
import { Users } from 'src/database/entities/Users';
import { UserSignUpLocalOutboundPortOutputDto } from '../outbound-port/user.sign-up-local.outbound-port';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserSignUpSocialOutboundPortOutputDto } from '../outbound-port/user.sign-up-social.outbound-port';
import { UserReadOutboundPortOutputDto } from '../outbound-port/user.read.outbound-port';
import { UserUpdateOutboundPortOutputDto } from '../outbound-port/user.update.outbound-port';

dotenv.config();

////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////    추 후  파 일  분 리 예 정     ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('UserRepository : signUpLocal', () => {
  let userRepository: UserRepository;
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

describe('UserRepository : signUpSocial', () => {
  let userRepository: UserRepository;
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
        email: 'oboTestUser2@google.com',
        nickname: 'blackOBO',
        authMethod: 'GOOGLE',
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

  test('회원가입(소셜) : 가입 가능한 이메일', async () => {
    const params = {
      id: '3', // 임의지정
      email: 'oboTestUser3@google.com',
      nickname: 'newbieOBO',
      authMethod: 'GOOGLE',
    };

    const result: UserSignUpSocialOutboundPortOutputDto =
      await userRepository.signUpSocial(params);

    expect(result).toEqual({
      userId: '3',
      email: 'oboTestUser3@google.com',
      nickname: 'newbieOBO',
    });
  });

  //------------------------------------------------------------------------------------------

  test('회원가입(소셜) : 이미 가입된 이메일', async () => {
    const params = {
      email: 'oboTestUser2@google.com',
      nickname: 'ImDuplicated',
      authMethod: 'GOOGLE',
    };

    expect(
      async () => await userRepository.signUpSocial(params),
    ).rejects.toThrow(
      new HttpException('이미 가입된 이메일입니다.', HttpStatus.BAD_REQUEST),
    );
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('UserRepository : read', () => {
  let userRepository: UserRepository;
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
        email: 'oboTestUser2@google.com',
        nickname: 'blackOBO',
        authMethod: 'GOOGLE',
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

  test('유저정보 조회 : 확인 가능한 유저정보', async () => {
    const params = {
      userId: '1',
    };

    const result: UserReadOutboundPortOutputDto = await userRepository.read(
      params,
    );

    expect(result).toEqual({
      userId: '1',
      email: 'oboTestUser1@obo.com',
      nickname: 'whiteOBO',
      profileImg: process.env.USER_DEFAULT_IMAGE,
      progressRoutine: 0,
      progressTodo: 0,
      progressWork: 0,
    });
  });

  //------------------------------------------------------------------------------------------

  test('유저정보 조회 : 존재하지 않는 유저정보', async () => {
    const params = {
      userId: '0',
    };

    expect(async () => await userRepository.read(params)).rejects.toThrow(
      new HttpException('존재하지 않는 사용자 입니다.', HttpStatus.BAD_REQUEST),
    );
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('UserRepository : update', () => {
  let userRepository: UserRepository;
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
        email: 'oboTestUser2@google.com',
        nickname: 'blackOBO',
        authMethod: 'GOOGLE',
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

  test('유저정보 수정 : 수정 가능한 유저정보 (닉네임)', async () => {
    const params = {
      userId: '1',
      nickname: '수정하려는닉네임',
    };

    const result: UserUpdateOutboundPortOutputDto = await userRepository.update(
      params,
    );

    expect(result).toEqual({
      userId: '1',
      email: 'oboTestUser1@obo.com',
      nickname: '수정하려는닉네임',
      profileImg: process.env.USER_DEFAULT_IMAGE,
      progressRoutine: 0,
      progressTodo: 0,
      progressWork: 0,
    });
  });

  //------------------------------------------------------------------------------------------

  test('유저정보 수정 : 수정 가능한 유저정보 (닉네임, 프로필사진)', async () => {
    const params = {
      userId: '1',
      nickname: '수정하려는닉네임',
      profileImg: 's3://obo-s3/obo-user-profile/1686223996746_ObO.profile.jpg',
    };

    const result: UserUpdateOutboundPortOutputDto = await userRepository.update(
      params,
    );

    expect(result).toEqual({
      userId: '1',
      email: 'oboTestUser1@obo.com',
      nickname: '수정하려는닉네임',
      profileImg: 's3://obo-s3/obo-user-profile/1686223996746_ObO.profile.jpg',
      progressRoutine: 0,
      progressTodo: 0,
      progressWork: 0,
    });
  });
});
