import * as dotenv from 'dotenv';
import { TodoCreateService } from '../todo.create.service';
import {
  TodoCreateOutboundPort,
  TodoCreateOutboundPortInputDto,
  TodoCreateOutboundPortOutputDto,
} from '../../outbound-port/todo.create.outbound-port';
import { Todos } from 'src/database/entities/Todos';
import { TodoCreateInboundPortOutputDto } from '../../inbound-port/todo.create.inbound-port';
import { EntityManager } from '@mikro-orm/knex';
import { Users } from 'src/database/entities/Users';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import testConfig from 'src/mikro-orm.test.config';
dotenv.config();

describe('TodoCreateService Spec', () => {
  let todoCreateService: TodoCreateService;
  let em: EntityManager;
  let orm: MikroORM;

  class MockTodoCreateOutboundPort implements TodoCreateOutboundPort {
    constructor(private readonly params: TodoCreateOutboundPortOutputDto) {}
    async execute(
      params: TodoCreateOutboundPortInputDto,
    ): Promise<TodoCreateOutboundPortOutputDto> {
      return this.params;
    }
  }

  beforeAll(async () => {
    orm = await MikroORM.init({ ...testConfig, driver: PostgreSqlDriver });
    em = orm.em;
  });

  afterAll(async () => {
    em.clear();
    await orm.close();
  });

  test('투두 생성 : 투두를 생성하기', async () => {
    todoCreateService = new TodoCreateService(
      new MockTodoCreateOutboundPort({
        id: '1',
        user: em.getReference(Users, '1'),
        name: '생성한 투두입니다.',
        startTime: new Date(2023, 7, 12, 0, 0, 0),
        endTime: new Date(2023, 7, 12, 0, 0, 0),
        completed: false,
        description: null,
      }),
    );

    const params = {
      userId: '1',
      name: '생성한 투두입니다.',
      startTime: new Date(2023, 7, 12, 0, 0, 0),
      endTime: new Date(2023, 7, 12, 0, 0, 0),
      completed: false,
      description: null,
    };

    const result: TodoCreateInboundPortOutputDto =
      await todoCreateService.execute(params);

    expect(result).toEqual({
      id: '1',
      user: em.getReference(Users, '1'),
      name: '생성한 투두입니다.',
      startTime: new Date(2023, 7, 12, 0, 0, 0),
      endTime: new Date(2023, 7, 12, 0, 0, 0),
      completed: false,
      description: null,
    });
  });
});
