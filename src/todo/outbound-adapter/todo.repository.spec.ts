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
import { TodoReadByTodoIdOutboundPortOutputDto } from '../outbound-port/todo.read-by-todo-id.outbound-port';
import { TodoReadByDateOutboundPortOutputDto } from '../outbound-port/todo.read-by-date.outbound-port';
import {
  TodoUpdateOutboundPortInputDto,
  TodoUpdateOutboundPortOutputDto,
} from '../outbound-port/todo.update.outbound-port';
import { TodoDeleteOutboundPortOutputDto } from '../outbound-port/todo.delete.outbound-port';

dotenv.config();

describe('Todo Repository', () => {
  let todoRepository: TodoRepository;
  let em: EntityManager;
  let orm: MikroORM;

  //------------------------------------------------------------------------------------------

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

  //------------------------------------------------------------------------------------------

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

  //------------------------------------------------------------------------------------------

  afterEach(async () => {
    await em.nativeDelete(Todos, {});
    em.clear();
  });

  //------------------------------------------------------------------------------------------

  afterAll(async () => {
    await em.nativeDelete(Users, {});
    await orm.close();
  });

  //------------------------------------------------------------------------------------------

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
      user: em.getReference(Users, '1'),
      name: '8월 8일에 추가한 투두 테스트1',
      startTime: new Date('2023-08-08 16:00:00'),
      endTime: new Date('2023-08-21 18:00:00'),
      description: 'test로 생성된 투두입니다.',
      completed: false,
    });
  });

  //------------------------------------------------------------------------------------------

  test('readByDate', async () => {
    const params = {
      userId: '1',
      startTime: new Date('2023-06-01 00:00:00'),
      endTime: new Date('2023-06-30 23:59:59'),
    };

    const result: TodoReadByDateOutboundPortOutputDto =
      await todoRepository.readByDate(params);

    expect(result).toEqual([
      {
        id: '20',
        user: em.getReference(Users, '1'),
        name: '6월 1일에 추가한 투두 테스트1',
        startTime: new Date('2023-06-01 16:00:00'),
        endTime: new Date('2023-06-01 18:00:00'),
        description: 'beforeEach로 생성된 투두입니다.',
        completed: true,
      },
      {
        id: '25',
        user: em.getReference(Users, '1'),
        name: '6월 21일에 추가한 투두 테스트1',
        startTime: new Date('2023-06-21 16:00:00'),
        endTime: new Date('2023-06-25 18:00:00'),
        description: 'beforeEach로 생성된 투두입니다.',
        completed: false,
      },
    ]);
  });

  //------------------------------------------------------------------------------------------

  test('readById', async () => {
    const params = {
      userId: '1',
      todoId: '40',
    };

    const result: TodoReadByTodoIdOutboundPortOutputDto =
      await todoRepository.readByTodoId(params);

    expect(result).toEqual({
      id: '40',
      user: em.getReference(Users, '1'),
      name: '7월 21일에 추가한 투두 테스트1',
      startTime: new Date('2023-07-21 16:00:00'),
      endTime: new Date('2023-07-23 18:00:00'),
      description: 'beforeEach로 생성된 투두입니다.',
      completed: false,
    });
  });

  //------------------------------------------------------------------------------------------

  test('update', async () => {
    const params = {
      userId: '1',
      todoId: '40',
      name: '수정된 7월의 할 일 테스트',
      startTime: new Date('2023-07-21 16:00:00'),
      endTime: new Date('2023-07-23 18:00:00'),
      description: 'update로 수정된 Todo 입니다.',
      completed: false,
    };

    const result: TodoUpdateOutboundPortOutputDto = await todoRepository.update(
      params,
    );

    expect(result).toEqual({
      id: '40',
      user: em.getReference(Users, '1'),
      name: '수정된 7월의 할 일 테스트',
      startTime: new Date('2023-07-21 16:00:00'),
      endTime: new Date('2023-07-23 18:00:00'),
      description: 'update로 수정된 Todo 입니다.',
      completed: false,
    });
  });

  //------------------------------------------------------------------------------------------

  test('delete', async () => {
    // 지우기
    const params = {
      userId: '2',
      todoId: '35',
    };

    const result: TodoDeleteOutboundPortOutputDto = await todoRepository.delete(
      params,
    );

    expect(result).toEqual({
      id: '35',
      user: em.getReference(Users, '2'),
      name: '6월 21일에 추가한 투두 테스트2',
      startTime: new Date('2023-06-21 16:00:00'),
      endTime: new Date('2023-06-25 18:00:00'),
      description: 'beforeEach로 생성된 투두입니다.',
      completed: false,
    });

    // 지운 후 기간으로 검색해서 없어진 지 확인하기
    const afterDeleteParams = {
      userId: '2',
      startTime: new Date('2023-06-01 00:00:00'),
      endTime: new Date('2023-06-30 23:59:59'),
    };

    const afterDeleteResult: TodoReadByDateOutboundPortOutputDto =
      await todoRepository.readByDate(afterDeleteParams);

    expect(afterDeleteResult).toEqual([
      {
        id: '30',
        name: '6월 1일에 추가한 투두 테스트2',
        startTime: new Date('2023-06-01 16:00:00'),
        endTime: new Date('2023-06-01 18:00:00'),
        description: 'beforeEach로 생성된 투두입니다.',
        completed: true,
        user: em.getReference(Users, '2'),
      },
    ]);
  });
  //------------------------------------------------------------------------------------------
});
