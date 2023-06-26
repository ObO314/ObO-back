import { EntityManager } from '@mikro-orm/knex';
import { TodoReadByTodoIdOutboundPortInputDto } from '../outbound-port/todo.read-by-todo-id.outbound-port';
import {
  TodoReadByTodoIdOutboundPort,
  TodoReadByTodoIdOutboundPortOutputDto,
} from '../outbound-port/todo.read-by-todo-id.outbound-port';
import { TodoReadByTodoIdService } from './todo.read-by-todo-id.service';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import testConfig from 'src/mikro-orm.test.config';
import { Users } from 'src/database/entities/Users';

class MockTodoReadByTodoIdOutboundPort implements TodoReadByTodoIdOutboundPort {
  private params: TodoReadByTodoIdOutboundPortOutputDto;
  constructor(params: TodoReadByTodoIdOutboundPortOutputDto) {
    this.params = params;
  }
  async readByTodoId(
    _: TodoReadByTodoIdOutboundPortInputDto,
  ): Promise<TodoReadByTodoIdOutboundPortOutputDto> {
    return this.params;
  }
}

describe('TodoReadByTodoIdService Spec', () => {
  let em: EntityManager;
  let orm: MikroORM;

  beforeAll(async () => {
    orm = await MikroORM.init({ ...testConfig, driver: PostgreSqlDriver });
    em = orm.em;
  });

  beforeEach(() => {});

  afterAll(async () => {
    await orm.close();
  });

  test('투두 검색 : todoId로 할 일 받아오기', async () => {
    const todoReadByTodoIdService = new TodoReadByTodoIdService(
      new MockTodoReadByTodoIdOutboundPort({
        id: '1',
        user: em.getReference(Users, '1'),
        name: 'TodoId로 검색하기',
        startTime: new Date(2023, 6, 1, 10, 30),
        endTime: new Date(2023, 6, 1, 11, 0),
        completed: false,
      }),
    );

    const result = await todoReadByTodoIdService.readByTodoId({
      userId: '1',
      todoId: '1',
    });

    expect(result).toStrictEqual({
      id: '1',
      user: em.getReference(Users, '1'),
      name: 'TodoId로 검색하기',
      startTime: new Date(2023, 6, 1, 10, 30),
      endTime: new Date(2023, 6, 1, 11, 0),
      completed: false,
    });
  });
});
