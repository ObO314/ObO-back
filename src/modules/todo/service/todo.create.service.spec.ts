import { EntityManager } from '@mikro-orm/knex';
import {
  TodoCreateOutboundPort,
  TodoCreateOutboundPortInputDto,
  TodoCreateOutboundPortOutputDto,
} from '../outbound-port/todo.create.outbound-port';
import { TodoCreateService } from './todo.create.service';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import testConfig from 'src/mikro-orm.test.config';
import { Users } from 'src/database/entities/Users';
import { Todos } from 'src/database/entities/Todos';
import { TodoCreateInboundPortInputDto } from '../inbound-port/todo.create.inbound-port';

class MockTodoCreateOutboundPort implements TodoCreateOutboundPort {
  private readonly params: TodoCreateOutboundPortOutputDto;

  constructor(params: TodoCreateOutboundPortOutputDto) {
    this.params = params;
  }

  async create(
    params: TodoCreateOutboundPortInputDto,
  ): Promise<TodoCreateOutboundPortOutputDto> {
    return this.params;
  }
}

describe('TodoCreateService Spec', () => {
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

  test('투두 생성 : userId 와 내용을 받아 투두 생성', async () => {
    const todoCreateService = new TodoCreateService(
      new MockTodoCreateOutboundPort({
        id: '1',
        user: em.getReference(Users, '1'),
        name: '투두 생성하기',
        startTime: new Date(2023, 6, 1, 10, 30),
        endTime: new Date(2023, 6, 1, 11, 0),
        completed: false,
      }),
    );

    const params: TodoCreateInboundPortInputDto = {
      userId: '1',
      name: '투두 생성하기',
      startTime: new Date(2023, 6, 1, 10, 30),
      endTime: new Date(2023, 6, 1, 11, 0),
      completed: false,
    };

    const result = await todoCreateService.create(params);

    expect(result).toEqual({
      id: '1',
      name: '투두 생성하기',
      startTime: new Date(2023, 6, 1, 10, 30),
      endTime: new Date(2023, 6, 1, 11, 0),
      completed: false,
      user: em.getReference(Users, '1'),
    });
  });
});
