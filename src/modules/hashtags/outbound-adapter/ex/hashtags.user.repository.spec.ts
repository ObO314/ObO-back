import * as dotenv from 'dotenv';
import { EntityManager } from '@mikro-orm/knex';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import testConfig from 'src/mikro-orm.test.config';
import { Users } from 'src/database/entities/Users';
import { HttpException, HttpStatus } from '@nestjs/common';
import { HashtagsUserRepository } from './hashtags.user.repository';
import { Hashtags } from 'src/database/entities/Hashtags';
import { HashtagsCreateOutboundPortOutputDto } from '../../outbound-port/hashtag.create.outbound-port';
import { UsersHashtags } from 'src/database/entities/usersHashtags';
import { HashtagsUserReadOutboundPortOutputDto } from '../../outbound-port/hashtag.read-users-hashtags.outbound-port';
import { HashtagsUserDeleteOutboundPortOutputDto } from '../../outbound-port/hashtag.delete-users-hashtags.outbound-port';

dotenv.config();

////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////    추 후  파 일  분 리 예 정     ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('HashtagsRepository : create', () => {
  let hashtagsUserRepository: HashtagsUserRepository;
  let em: EntityManager;
  let orm: MikroORM;

  //------------------------------------------------------------------------------------------

  beforeAll(async () => {
    orm = await MikroORM.init({ ...testConfig, driver: PostgreSqlDriver });
    em = orm.em;
    hashtagsUserRepository = new HashtagsUserRepository(em);

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
    const newHashTags = [];
    newHashTags.push(
      em.create(Hashtags, {
        id: '3',
        hashtagName: '갓생',
        mentions: '71',
      }),
    );
    newHashTags.push(
      em.create(Hashtags, {
        id: '4',
        hashtagName: '개발자',
        mentions: '234',
      }),
    );

    for (const newHashTag of newHashTags) {
      await em.persistAndFlush(newHashTag);
    }
    await em
      .getConnection()
      .execute('ALTER SEQUENCE hashtags_id_seq RESTART WITH 5');
  });

  //------------------------------------------------------------------------------------------

  afterEach(async () => {
    await em.nativeDelete(UsersHashtags, {});
    await em.nativeDelete(Hashtags, {});
    em.clear();
  });

  //------------------------------------------------------------------------------------------

  afterAll(async () => {
    await em.nativeDelete(Users, {});
    await orm.close();
  });

  //------------------------------------------------------------------------------------------

  test('해시태그(유저) : 유저에 기존에 존재하는 해시태그를 추가함 ', async () => {
    const params = {
      userId: '1',
      hashtag: '개발자',
    };

    const result: HashtagsCreateOutboundPortOutputDto =
      await hashtagsUserRepository.create(params);

    expect(result).toEqual({
      hashtagId: '4',
      hashtagName: '개발자',
      mentions: '235',
    });
  });

  //------------------------------------------------------------------------------------------

  test('해시태그(유저) : 유저에 새로운 해시태그를 추가함 ', async () => {
    const params = {
      userId: '1',
      hashtag: '테스트',
    };

    const result: HashtagsCreateOutboundPortOutputDto =
      await hashtagsUserRepository.create(params);

    expect(result).toEqual({
      hashtagId: '5',
      hashtagName: '테스트',
      mentions: '1',
    });
  });

  //------------------------------------------------------------------------------------------

  test('해시태그(유저) : 유저에 새로운 해시태그를 추가하되, 띄어쓰기를 제거하고 대문자로 변환한다. ', async () => {
    const params = {
      userId: '1',
      hashtag: 't e s t',
    };

    const result: HashtagsCreateOutboundPortOutputDto =
      await hashtagsUserRepository.create(params);

    expect(result).toEqual({
      hashtagId: '5',
      hashtagName: 'TEST',
      mentions: '1',
    });
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('HashtagsRepository : read', () => {
  let hashtagsUserRepository: HashtagsUserRepository;
  let em: EntityManager;
  let orm: MikroORM;

  //------------------------------------------------------------------------------------------

  beforeAll(async () => {
    orm = await MikroORM.init({ ...testConfig, driver: PostgreSqlDriver });
    em = orm.em;
    hashtagsUserRepository = new HashtagsUserRepository(em);

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
    const newHashTags = [];
    newHashTags.push(
      em.create(Hashtags, {
        id: '3',
        hashtagName: '갓생',
        mentions: '71',
      }),
    );
    newHashTags.push(
      em.create(Hashtags, {
        id: '4',
        hashtagName: '개발자',
        mentions: '234',
      }),
    );
    for (const newHashTag of newHashTags) {
      await em.persistAndFlush(newHashTag);
    }

    const newUsersHashTags = [];
    newUsersHashTags.push(
      em.create(UsersHashtags, {
        user: em.getReference(Users, '1'),
        hashtag: em.getReference(Hashtags, '3'),
      }),
    );
    newUsersHashTags.push(
      em.create(UsersHashtags, {
        user: em.getReference(Users, '1'),
        hashtag: em.getReference(Hashtags, '4'),
      }),
    );
    for (const newUsersHashTag of newUsersHashTags) {
      await em.persistAndFlush(newUsersHashTag);
    }
    await em
      .getConnection()
      .execute('ALTER SEQUENCE hashtags_id_seq RESTART WITH 5');
  });

  //------------------------------------------------------------------------------------------

  afterEach(async () => {
    await em.nativeDelete(UsersHashtags, {});
    await em.nativeDelete(Hashtags, {});
    em.clear();
  });

  //------------------------------------------------------------------------------------------

  afterAll(async () => {
    await em.nativeDelete(Users, {});
    await orm.close();
  });

  //------------------------------------------------------------------------------------------

  test('해시태그(유저) : 유저와 연관된 해시태그가 있을 경우, 해시태그가 담긴 배열을 반환 함 ', async () => {
    const params = {
      userId: '1',
    };

    const result: HashtagsUserReadOutboundPortOutputDto =
      await hashtagsUserRepository.read(params);

    expect(result).toEqual([
      {
        hashtagName: '갓생',
        id: '3',
        mentions: '71',
      },
      {
        hashtagName: '개발자',
        id: '4',
        mentions: '234',
      },
    ]);
  });

  //------------------------------------------------------------------------------------------

  test('해시태그(유저) : 유저와 연관된 해시태그가 없을 경우, 빈 배열을 반환 함 ', async () => {
    const params = {
      userId: '2',
    };

    const result: HashtagsUserReadOutboundPortOutputDto =
      await hashtagsUserRepository.read(params);

    expect(result).toEqual([]);
  });

  //------------------------------------------------------------------------------------------
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('HashtagsRepository : delete', () => {
  let hashtagsUserRepository: HashtagsUserRepository;
  let em: EntityManager;
  let orm: MikroORM;

  //------------------------------------------------------------------------------------------

  beforeAll(async () => {
    orm = await MikroORM.init({ ...testConfig, driver: PostgreSqlDriver });
    em = orm.em;
    hashtagsUserRepository = new HashtagsUserRepository(em);

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
    const newHashTags = [];
    newHashTags.push(
      em.create(Hashtags, {
        id: '3',
        hashtagName: '갓생',
        mentions: '71',
      }),
    );
    newHashTags.push(
      em.create(Hashtags, {
        id: '4',
        hashtagName: '개발자',
        mentions: '234',
      }),
    );
    for (const newHashTag of newHashTags) {
      await em.persistAndFlush(newHashTag);
    }

    const newUsersHashTags = [];
    newUsersHashTags.push(
      em.create(UsersHashtags, {
        user: em.getReference(Users, '1'),
        hashtag: em.getReference(Hashtags, '3'),
      }),
    );
    newUsersHashTags.push(
      em.create(UsersHashtags, {
        user: em.getReference(Users, '1'),
        hashtag: em.getReference(Hashtags, '4'),
      }),
    );
    for (const newUsersHashTag of newUsersHashTags) {
      await em.persistAndFlush(newUsersHashTag);
    }
    await em
      .getConnection()
      .execute('ALTER SEQUENCE hashtags_id_seq RESTART WITH 5');
  });

  //------------------------------------------------------------------------------------------

  afterEach(async () => {
    await em.nativeDelete(UsersHashtags, {});
    await em.nativeDelete(Hashtags, {});
    em.clear();
  });

  //------------------------------------------------------------------------------------------

  afterAll(async () => {
    await em.nativeDelete(Users, {});
    await orm.close();
  });

  //------------------------------------------------------------------------------------------

  test('해시태그(유저) : 유저에서 특정 해시태그를 삭제 함', async () => {
    const params = {
      userId: '1',
      hashtag: '갓생',
    };

    const result: HashtagsUserDeleteOutboundPortOutputDto =
      await hashtagsUserRepository.delete(params);

    expect(result).toEqual({
      hashtagId: '3',
    });

    //진짜 삭제 되었는지?
    const userHashtags = await em.find(UsersHashtags, { user: '1' });
    const hashTagsUserhave = [];
    for (const userHashtag of userHashtags) {
      hashTagsUserhave.push(userHashtag.hashtag.hashtagName);
    }

    expect(hashTagsUserhave).toStrictEqual(['개발자']);
  });

  //------------------------------------------------------------------------------------------
});
