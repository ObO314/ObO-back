import * as dotenv from 'dotenv';
import { EntityManager } from '@mikro-orm/knex';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import testConfig from 'src/mikro-orm.test.config';
import { TodoCreateRepository } from '../todo.create.repository';
import { Todos } from 'src/database/entities/Todos';
import { Users } from 'src/database/entities/Users';
import { TodoCreateOutboundPortOutputDto } from '../../outbound-port/todo.create.outbound-port';

dotenv.config();

describe('TodoCreateRepository Spec', () => {
  let todoCreateRepository: TodoCreateRepository;
  let em: EntityManager;
  let orm: MikroORM;

  //------------------------------------------------------------------------------------------

  beforeAll(async () => {
    orm = await MikroORM.init({ ...testConfig, driver: PostgreSqlDriver });
    em = orm.em;
    todoCreateRepository = new TodoCreateRepository(em);

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
        startTime: new Date(2023, 7, 15, 9, 0, 0),
        endTime: new Date(2023, 7, 15, 15, 0, 0),
        completed: true,
      }),
      em.create(Todos, {
        id: '2',
        user: '1',
        name: 'user1secondTodo',
        description: '두번째 투두입니다.',
        startTime: new Date(2023, 8, 2, 9, 0, 0),
        endTime: new Date(2023, 8, 2, 15, 0, 0),
        completed: false,
      }),
      em.create(Todos, {
        id: '3',
        user: '2',
        name: 'user2firstTodo',
        description: '두번째 투두입니다.',
        startTime: new Date(2023, 8, 2, 9, 0, 0),
        endTime: new Date(2023, 8, 2, 15, 0, 0),
        completed: false,
      }),
    ];

    for (const existentUser of existentTodos) {
      em.persist(existentUser);
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

  test('투두생성 : 투두를 생성합니다.', async () => {
    const params = {
      id: '2',
      userId: '2',
      name: 'user2SecondTodo',
      description: '두번째 투두입니다.',
      startTime: new Date(2023, 8, 15, 9, 0, 0),
      endTime: new Date(2023, 8, 15, 15, 0, 0),
      completed: false,
    };

    const result: TodoCreateOutboundPortOutputDto =
      await todoCreateRepository.execute(params);

    expect(result).toEqual({
      id: '2',
      user: em.getReference(Users, '2'),
      name: 'user2SecondTodo',
      description: '두번째 투두입니다.',
      startTime: new Date(2023, 8, 15, 9, 0, 0),
      endTime: new Date(2023, 8, 15, 15, 0, 0),
      completed: false,
    });
  });

  //------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------
});
