import * as dotenv from 'dotenv';
import { EntityManager } from '@mikro-orm/knex';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import testConfig from 'src/mikro-orm.test.config';
import { Todos } from 'src/database/entities/Todos';
import { Users } from 'src/database/entities/Users';
import { TodoCreateOutboundPortOutputDto } from '../../outbound-port/todo.create.outbound-port';
import { TodoReadByDateRepository } from '../todo.read-by-date.repository';
import { TodoReadByDateOutboundPortOutputDto } from '../../outbound-port/todo.read-by-date.outbound-port';

dotenv.config();

describe('TodoReadByDateRepository Spec', () => {
  let todoReadByDateRepository: TodoReadByDateRepository;
  let em: EntityManager;
  let orm: MikroORM;

  //------------------------------------------------------------------------------------------

  beforeAll(async () => {
    orm = await MikroORM.init({ ...testConfig, driver: PostgreSqlDriver });
    em = orm.em;
    todoReadByDateRepository = new TodoReadByDateRepository(em);

    const existentUsers = [
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
    const existentTodos = [
      em.create(Todos, {
        id: '1',
        user: '1',
        name: 'user1firstTodo',
        description: '첫번째 투두입니다.',
        startTime: new Date(2023, 6, 15, 9, 0, 0),
        endTime: new Date(2023, 6, 15, 15, 0, 0),
        completed: true,
      }),
      em.create(Todos, {
        id: '2',
        user: '1',
        name: 'user1secondTodo',
        description: '두번째 투두입니다.',
        startTime: new Date(2023, 7, 20, 17, 0, 0),
        endTime: new Date(2023, 7, 20, 18, 0, 0),
        completed: false,
      }),
      em.create(Todos, {
        id: '3',
        user: '1',
        name: 'user1thirdthTodo',
        description: '세번째 투두입니다.',
        startTime: new Date(2023, 7, 20, 17, 0, 0),
        endTime: new Date(2023, 7, 20, 18, 0, 0),
        completed: false,
      }),
      em.create(Todos, {
        id: '4',
        user: '1',
        name: 'user1fourthTodo',
        description: '네번째 투두입니다.',
        startTime: new Date(2023, 8, 20, 17, 0, 0),
        endTime: new Date(2023, 8, 20, 18, 0, 0),
        completed: false,
      }),
      em.create(Todos, {
        id: '5',
        user: '2',
        name: 'user2firstTodo',
        description: '첫번째 투두입니다.',
        startTime: new Date(2023, 8, 2, 9, 0, 0),
        endTime: new Date(2023, 8, 2, 15, 0, 0),
        completed: false,
      }),
    ];

    for (const existentTodo of existentTodos) {
      em.persist(existentTodo);
    }
    await em.flush();
  });

  //------------------------------------------------------------------------------------------

  afterEach(async () => {
    em.clear();
    await em.nativeDelete(Todos, {});
  });

  //------------------------------------------------------------------------------------------

  afterAll(async () => {
    await em.nativeDelete(Todos, {});
    await em.nativeDelete(Users, {});
    await orm.close();
  });

  //------------------------------------------------------------------------------------------

  test('투두조회(date) : 하루단위의 할 일을 불러옵니다..', async () => {
    const params = {
      userId: '1',
      startTime: new Date(2023, 7, 20, 0, 0, 0),
      endTime: new Date(2023, 7, 20, 23, 59, 59),
    };

    const result: TodoReadByDateOutboundPortOutputDto =
      await todoReadByDateRepository.execute(params);

    expect(result).toEqual([
      {
        id: '2',
        user: em.getReference(Users, '1'),
        name: 'user1secondTodo',
        description: '두번째 투두입니다.',
        startTime: new Date(2023, 7, 20, 17, 0, 0),
        endTime: new Date(2023, 7, 20, 18, 0, 0),
        completed: false,
      },
      {
        id: '3',
        user: em.getReference(Users, '1'),
        name: 'user1thirdthTodo',
        description: '세번째 투두입니다.',
        startTime: new Date(2023, 7, 20, 17, 0, 0),
        endTime: new Date(2023, 7, 20, 18, 0, 0),
        completed: false,
      },
    ]);
  });

  //------------------------------------------------------------------------------------------

  test('투두조회(date) : 한 달 단위의 할 일을 불러옵니다..', async () => {
    const params = {
      userId: '1',
      startTime: new Date(2023, 7, 1, 0, 0, 0),
      endTime: new Date(2023, 7, 31, 23, 59, 59),
    };

    const result: TodoReadByDateOutboundPortOutputDto =
      await todoReadByDateRepository.execute(params);

    expect(result).toEqual([
      {
        id: '2',
        user: em.getReference(Users, '1'),
        name: 'user1secondTodo',
        description: '두번째 투두입니다.',
        startTime: new Date(2023, 7, 20, 17, 0, 0),
        endTime: new Date(2023, 7, 20, 18, 0, 0),
        completed: false,
      },
      {
        id: '3',
        user: em.getReference(Users, '1'),
        name: 'user1thirdthTodo',
        description: '세번째 투두입니다.',
        startTime: new Date(2023, 7, 20, 17, 0, 0),
        endTime: new Date(2023, 7, 20, 18, 0, 0),
        completed: false,
      },
    ]);
  });

  //------------------------------------------------------------------------------------------
});
