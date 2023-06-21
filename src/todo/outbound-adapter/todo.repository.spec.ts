import { EntityManager } from '@mikro-orm/knex';
import { Todos } from '../../database/entities/Todos';
import { Users } from '../../database/entities/Users';
import * as dotenv from 'dotenv';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TodoRepository } from './todo.repository';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import {
  TodoCreateOutboundPortInputDto,
  TodoCreateOutboundPortOutputDto,
} from '../outbound-port/todo.create.outbound-port';
import { testConfig } from '../../mikro-orm.test.config';

dotenv.config();

describe('Todo Repository', () => {
  let todoRepository: TodoRepository;
  let em: EntityManager;
  let orm: MikroORM;

  beforeAll(async () => {
    orm = await MikroORM.init({ ...testConfig, driver: PostgreSqlDriver });
    em = orm.em;
    todoRepository = new TodoRepository(em);

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

  // 설정해야 하는 것
  // - user 생성 all
  // - 투두 생성 each

  // 해야하는것
  // - 투두 생성
  // - 투두 수정
  // - 투두 검색
  // - 투두 삭제

  beforeEach(async () => {
    const newTodos = [];
    newTodos.push(
      em.create(Todos, {
        id: '15',
        name: '4월 15일에 추가한 투두 테스트2',
        startTime: new Date('2023-04-15 16:00:00'),
        endTime: new Date('2023-04-15 18:00:00'),
        description: 'beforeEach로 생성된 투두입니다.',
        completed: false,
        user: em.getReference(Users, '2'),
      }),
    );
    newTodos.push(
      em.create(Todos, {
        id: '20',
        name: '6월 1일에 추가한 투두 테스트1',
        startTime: new Date('2023-06-01 16:00:00'),
        endTime: new Date('2023-06-01 18:00:00'),
        description: 'beforeEach로 생성된 투두입니다.',
        completed: true,
        user: em.getReference(Users, '1'),
      }),
    );
    newTodos.push(
      em.create(Todos, {
        id: '25',
        name: '6월 21일에 추가한 투두 테스트1',
        startTime: new Date('2023-06-21 16:00:00'),
        endTime: new Date('2023-06-25 18:00:00'),
        description: 'beforeEach로 생성된 투두입니다.',
        completed: false,
        user: em.getReference(Users, '1'),
      }),
    );
    newTodos.push(
      em.create(Todos, {
        id: '30',
        name: '6월 1일에 추가한 투두 테스트2',
        startTime: new Date('2023-06-01 16:00:00'),
        endTime: new Date('2023-06-01 18:00:00'),
        description: 'beforeEach로 생성된 투두입니다.',
        completed: true,
        user: em.getReference(Users, '2'),
      }),
    );
    newTodos.push(
      em.create(Todos, {
        id: '35',
        name: '6월 21일에 추가한 투두 테스트2',
        startTime: new Date('2023-06-21 16:00:00'),
        endTime: new Date('2023-06-25 18:00:00'),
        description: 'beforeEach로 생성된 투두입니다.',
        completed: false,
        user: em.getReference(Users, '2'),
      }),
    );
    newTodos.push(
      em.create(Todos, {
        id: '40',
        name: '7월 21일에 추가한 투두 테스트1',
        startTime: new Date('2023-07-21 16:00:00'),
        endTime: new Date('2023-07-23 18:00:00'),
        description: 'beforeEach로 생성된 투두입니다.',
        completed: false,
        user: em.getReference(Users, '1'),
      }),
    );
    newTodos.push(
      em.create(Todos, {
        id: '45',
        name: '7월 21일에 추가한 투두 테스트2',
        startTime: new Date('2023-07-21 16:00:00'),
        endTime: new Date('2023-07-23 18:00:00'),
        description: 'beforeEach로 생성된 투두입니다.',
        completed: false,
        user: em.getReference(Users, '2'),
      }),
    );
    for (const newTodo of newTodos) {
      await em.persistAndFlush(newTodo);
    }
  });

  afterEach(async () => {
    await em.nativeDelete(Todos, {});
  });

  afterAll(async () => {
    await em.nativeDelete(Users, {});
    await orm.close();
  });

  test('create', async () => {
    const params = {
      id: '50',
      name: '8월 8일에 추가한 투두 테스트1',
      startTime: new Date('2023-08-08 16:00:00'),
      endTime: new Date('2023-08-21 18:00:00'),
      description: 'test로 생성된 투두입니다.',
      completed: false,
      userId: '1',
    };

    const result: TodoCreateOutboundPortOutputDto = await todoRepository.create(
      params,
    );

    expect(result).toEqual({
      id: '50',
      name: '8월 8일에 추가한 투두 테스트1',
      startTime: new Date('2023-08-08 16:00:00'),
      endTime: new Date('2023-08-21 18:00:00'),
      description: 'test로 생성된 투두입니다.',
      completed: false,
      user: em.getReference(Users, '1'),
    });
  });
});

// import { EntityManager } from '@mikro-orm/knex';
// import {
//   Entity,
//   EntityName,
//   ManyToOne,
//   PrimaryKey,
//   Property,
// } from '@mikro-orm/core';
// import { TodoRepository } from './todo.repository';

// describe('UseEntityManager Util Spec', () => {
//   let mockEntityManager: jest.Mocked<EntityManager>;
//   let mockTodoRepository: TodoRepository;

//   mockEntityManager = {
//     findOne: jest.fn(),
//     find: jest.fn(),
//     create: jest.fn(),
//     persistAndFlush: jest.fn(),
//     assign: jest.fn(),
//   } as any;

//   mockTodoRepository = new TodoRepository(mockEntityManager);

//   //----------------------------------------------------------------------

//   test('create', async () => {
//     jest
//       .spyOn(mockEntityManager, 'create')
//       .mockImplementation(
//         async (entity: EntityName<object>, params: object) => {
//           return { ...params, todoId: 1, userId: { userId: '1' } };
//         },
//       );

//     const params = {
//       name: '6월 14일에 추가한 투두 테스트3',
//       startTime: new Date(2023, 6, 14, 12, 0, 0),
//       endTime: new Date(2023, 6, 14, 18, 0, 0),
//       description: '이것은 투두에 대한 설명입니다. 필수 요소는 아닙니다.',
//       completed: false,
//       userId: {
//         userId: '1',
//         email: 'test@obo.com',
//         password: '1ersdfgAWEUTAw4eFawJE$aPJWGPAJ',
//         nickname: '테스트계정',
//       },
//     };

//     const result = await mockTodoRepository.create(params);

//     expect(result).toEqual({
//       todoId: 1,
//       name: '6월 14일에 추가한 투두 테스트3',
//       startTime: new Date(2023, 6, 14, 12, 0, 0),
//       endTime: new Date(2023, 6, 14, 18, 0, 0),
//       description: '이것은 투두에 대한 설명입니다. 필수 요소는 아닙니다.',
//       completed: false,
//       userId: {
//         userId: '1',
//       },
//     });
//   });

//   //----------------------------------------------------------------------
//   test('readByDate', async () => {
//     jest
//       .spyOn(mockEntityManager, 'find')
//       .mockImplementation(
//         async (entity: EntityName<object>, params: object) => {
//           return [
//             {
//               todoId: '49',
//               userId: '1',
//               name: '6월 11일에 할 일',
//               startTime: new Date(2023, 6, 11, 10, 0, 0),
//               endTime: new Date(2023, 6, 11, 20, 30, 0),
//               completed: false,
//               description:
//                 '이것은 투두에 대한 설명입니다. 필수 요소는 아닙니다.',
//             },
//             {
//               todoId: '50',
//               userId: '1',
//               name: '6월 21일에 할 일',
//               startTime: new Date(2023, 6, 21, 10, 0, 0),
//               endTime: new Date(2023, 6, 21, 10, 30, 0),
//               completed: false,
//               description:
//                 '이것은 투두에 대한 설명입니다. 필수 요소는 아닙니다.',
//             },
//           ];
//         },
//       );

//     const params = {
//       startTime: new Date(2023, 6, 1, 0, 0, 0),
//       endTime: new Date(2023, 6, 30, 0, 0, 0),
//       userId: {
//         userId: '1',
//         email: 'test@obo.com',
//         password: '1ersdfgAWEUTAw4eFawJE$aPJWGPAJ',
//         nickname: '테스트계정',
//       },
//     };

//     const result = await mockTodoRepository.readByDate(params);

//     expect(result).toEqual([
//       {
//         todoId: '49',
//         userId: '1',
//         name: '6월 11일에 할 일',
//         startTime: new Date(2023, 6, 11, 10, 0, 0),
//         endTime: new Date(2023, 6, 11, 20, 30, 0),
//         completed: false,
//         description: '이것은 투두에 대한 설명입니다. 필수 요소는 아닙니다.',
//       },
//       {
//         todoId: '50',
//         userId: '1',
//         name: '6월 21일에 할 일',
//         startTime: new Date(2023, 6, 21, 10, 0, 0),
//         endTime: new Date(2023, 6, 21, 10, 30, 0),
//         completed: false,
//         description: '이것은 투두에 대한 설명입니다. 필수 요소는 아닙니다.',
//       },
//     ]);
//   });
// });
