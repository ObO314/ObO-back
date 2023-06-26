import { EntityManager } from '@mikro-orm/knex';
import { ReadmeRepository } from './readme.repository';
import * as dotenv from 'dotenv';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import testConfig from 'src/mikro-orm.test.config';
import { Users } from 'src/database/entities/Users';
import { Readme } from 'src/database/entities/Readme';
import { ReadmeReadOutboundPortOutputDto } from '../outbound-port/readme.read.outbound-port';
import { ReadmeDeleteOutboundPortOutputDto } from '../outbound-port/readme.delete.outbound-port';
import { ReadmeUpdateOutboundPortOutputDto } from '../outbound-port/readme.update.outbound-port';
dotenv.config();

////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////    추 후  파 일  분 리 예 정     ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('ReadmeRepository : read', () => {
  let readmeRepository: ReadmeRepository;
  let em: EntityManager;
  let orm: MikroORM;

  //------------------------------------------------------------------------------------------

  beforeAll(async () => {
    orm = await MikroORM.init({ ...testConfig, driver: PostgreSqlDriver });
    em = orm.em;
    readmeRepository = new ReadmeRepository(em);

    const newUser1 = em.create(Users, {
      id: '1',
      email: 'oboTestUser1@obo.com',
      nickname: 'whiteOBO',
      password: '123123',
    });
    const newUser2 = em.create(Users, {
      id: '2',
      email: 'oboTestUser2@obo.com',
      nickname: 'blackOBO',
      password: '123123',
    });

    await em.persistAndFlush(newUser1);
    await em.persistAndFlush(newUser2);
  });

  //------------------------------------------------------------------------------------------

  beforeEach(async () => {
    const readme1 = em.create(Readme, {
      user: '1',
      title: '작성이 완료된 리드미',
      content: '이미 작성이 완료된 리드미 입니다.',
    });
    await em.persistAndFlush(readme1);

    await em
      .getConnection()
      .execute('ALTER SEQUENCE hashtags_id_seq RESTART WITH 5');
  });

  //------------------------------------------------------------------------------------------

  afterEach(async () => {
    await em.nativeDelete(Readme, {});
    em.clear();
  });

  //------------------------------------------------------------------------------------------

  afterAll(async () => {
    await em.nativeDelete(Users, {});
    await orm.close();
  });

  //------------------------------------------------------------------------------------------

  test('리드미 조회: 작성 완료한 유저의 리드미를 불러온다. ', async () => {
    const params = {
      userId: '1',
    };

    const output: ReadmeReadOutboundPortOutputDto = await readmeRepository.read(
      params,
    );

    expect(output).toEqual({
      title: '작성이 완료된 리드미',
      content: '이미 작성이 완료된 리드미 입니다.',
    });
  });

  //------------------------------------------------------------------------------------------

  test('리드미 조회: 아직 작성하지 않은 유저의 리드미를 불러온다. ', async () => {
    const params = {
      userId: '2',
    };

    const output: ReadmeReadOutboundPortOutputDto = await readmeRepository.read(
      params,
    );

    expect(output).toEqual({
      title: '작성한 리드미가 없습니다.',
      content: '나를 보여줄 수 있는 리드미를 작성해 주세요!',
    });
  });
  //------------------------------------------------------------------------------------------
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('ReadmeRepository : update', () => {
  let readmeRepository: ReadmeRepository;
  let em: EntityManager;
  let orm: MikroORM;

  //------------------------------------------------------------------------------------------

  beforeAll(async () => {
    orm = await MikroORM.init({ ...testConfig, driver: PostgreSqlDriver });
    em = orm.em;
    readmeRepository = new ReadmeRepository(em);

    const newUser1 = em.create(Users, {
      id: '1',
      email: 'oboTestUser1@obo.com',
      nickname: 'whiteOBO',
      password: '123123',
    });
    const newUser2 = em.create(Users, {
      id: '2',
      email: 'oboTestUser2@obo.com',
      nickname: 'blackOBO',
      password: '123123',
    });

    await em.persistAndFlush(newUser1);
    await em.persistAndFlush(newUser2);
  });

  //------------------------------------------------------------------------------------------

  beforeEach(async () => {
    const readme1 = em.create(Readme, {
      user: '1',
      title: '작성이 완료된 리드미',
      content: '이미 작성이 완료된 리드미 입니다.',
    });
    await em.persistAndFlush(readme1);

    await em
      .getConnection()
      .execute('ALTER SEQUENCE hashtags_id_seq RESTART WITH 5');
  });

  //------------------------------------------------------------------------------------------

  afterEach(async () => {
    await em.nativeDelete(Readme, {});
    em.clear();
  });

  //------------------------------------------------------------------------------------------

  afterAll(async () => {
    await em.nativeDelete(Users, {});
    await orm.close();
  });

  //------------------------------------------------------------------------------------------

  test('리드미 수정: 작성 완료한 유저의 리드미를 수정한다. ', async () => {
    const params = {
      userId: '1',
      title: '작성한 리드미를 다시 수정함',
      content: '작성한 리드미를 다시한 번 수정했습니다.',
    };

    const result: ReadmeUpdateOutboundPortOutputDto =
      await readmeRepository.update(params);

    expect(result).toEqual({
      title: '작성한 리드미를 다시 수정함',
      content: '작성한 리드미를 다시한 번 수정했습니다.',
    });
  });

  //------------------------------------------------------------------------------------------

  test('리드미 수정: 아직 작성하지 않은 유저의 리드미를 수정한다. ', async () => {
    const params = {
      userId: '2',
      title: '미 작성된 리드미를 수정함',
      content: '처음으로 리드미를 수정했습니다.',
    };

    const result: ReadmeUpdateOutboundPortOutputDto =
      await readmeRepository.update(params);

    expect(result).toEqual({
      title: '미 작성된 리드미를 수정함',
      content: '처음으로 리드미를 수정했습니다.',
    });
  });
  //------------------------------------------------------------------------------------------
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('ReadmeRepository : delete', () => {
  let readmeRepository: ReadmeRepository;
  let em: EntityManager;
  let orm: MikroORM;

  //------------------------------------------------------------------------------------------

  beforeAll(async () => {
    orm = await MikroORM.init({ ...testConfig, driver: PostgreSqlDriver });
    em = orm.em;
    readmeRepository = new ReadmeRepository(em);

    const newUser1 = em.create(Users, {
      id: '1',
      email: 'oboTestUser1@obo.com',
      nickname: 'whiteOBO',
      password: '123123',
    });
    const newUser2 = em.create(Users, {
      id: '2',
      email: 'oboTestUser2@obo.com',
      nickname: 'blackOBO',
      password: '123123',
    });

    await em.persistAndFlush(newUser1);
    await em.persistAndFlush(newUser2);
  });

  //------------------------------------------------------------------------------------------

  beforeEach(async () => {
    const readme1 = em.create(Readme, {
      user: '1',
      title: '작성이 완료된 리드미',
      content: '이미 작성이 완료된 리드미 입니다.',
    });
    await em.persistAndFlush(readme1);

    await em
      .getConnection()
      .execute('ALTER SEQUENCE hashtags_id_seq RESTART WITH 5');
  });

  //------------------------------------------------------------------------------------------

  afterEach(async () => {
    await em.nativeDelete(Readme, {});
    em.clear();
  });

  //------------------------------------------------------------------------------------------

  afterAll(async () => {
    await em.nativeDelete(Users, {});
    await orm.close();
  });

  //------------------------------------------------------------------------------------------

  test('리드미 수정: 작성 완료한 유저의 리드미를 삭제한다. ', async () => {
    const params = {
      userId: '1',
    };

    const result: ReadmeDeleteOutboundPortOutputDto =
      await readmeRepository.delete(params);

    expect(result).toEqual({
      content: '이미 작성이 완료된 리드미 입니다.',
      title: '작성이 완료된 리드미',
    });

    expect(await em.findOne(Readme, { user: '1' })).toStrictEqual(null);
  });

  //------------------------------------------------------------------------------------------
});
