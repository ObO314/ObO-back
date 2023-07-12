import * as dotenv from 'dotenv';
import { EntityManager } from '@mikro-orm/knex';
import { Users } from 'src/database/entities/Users';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import testConfig from 'src/mikro-orm.test.config';
import { TodoReadService } from '../todo.read.service';
import {
  TodoReadOutboundPort,
  TodoReadOutboundPortInputDto,
  TodoReadOutboundPortOutputDto,
} from '../../outbound-port/todo.read.outbound-port';
import { TodoReadInboundPortOutputDto } from '../../inbound-port/todo.read.inbound-port';
dotenv.config();

describe('TodoReadService Spec', () => {
  let todoService: TodoReadService;
  let em: EntityManager;
  let orm: MikroORM;

  class MockTodoReadOutboundPort implements TodoReadOutboundPort {
    constructor(private readonly params: TodoReadOutboundPortOutputDto) {}
    async execute(
      params: TodoReadOutboundPortInputDto,
    ): Promise<TodoReadOutboundPortOutputDto> {
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

  //------------------------------------------------------------------------------------------

  test('투두 조회 : 투두 조회하기', async () => {
    todoService = new TodoReadService(
      new MockTodoReadOutboundPort({
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
      todoId: '1',
      userId: '1',
    };

    const result: TodoReadInboundPortOutputDto = await todoService.execute(
      params,
    );

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
