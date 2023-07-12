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
import { TodoReadService } from '../todo.read.service';
import { TodoReadOutboundPort } from '../../outbound-port/todo.read.outbound-port';
import { TodoDeleteService } from '../todo.delete.service';
import {
  TodoDeleteOutboundPort,
  TodoDeleteOutboundPortInputDto,
  TodoDeleteOutboundPortOutputDto,
} from '../../outbound-port/todo.delete.outbound-port';
import { TodoDeleteInboundPortOutputDto } from '../../inbound-port/todo.delete.inbound-port';
dotenv.config();

describe('TodoDeleteService Spec', () => {
  let todoDeleteService: TodoDeleteService;
  let em: EntityManager;
  let orm: MikroORM;

  class MockTodoDeleteOutboundPort implements TodoDeleteOutboundPort {
    constructor(private readonly params: TodoDeleteOutboundPortOutputDto) {}
    async execute(
      params: TodoDeleteOutboundPortInputDto,
    ): Promise<TodoDeleteOutboundPortOutputDto> {
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
    todoDeleteService = new TodoDeleteService(
      new MockTodoDeleteOutboundPort({
        id: '1',
        user: em.getReference(Users, '1'),
        name: '삭제될(된) 투두입니다.',
        startTime: new Date(2023, 7, 12, 0, 0, 0),
        endTime: new Date(2023, 7, 12, 0, 0, 0),
        completed: false,
        description: null,
      }),
    );

    const params = {
      userId: '1',
      todoId: '1',
    };

    const result: TodoDeleteInboundPortOutputDto =
      await todoDeleteService.execute(params);

    expect(result).toEqual({
      id: '1',
      user: em.getReference(Users, '1'),
      name: '삭제될(된) 투두입니다.',
      startTime: new Date(2023, 7, 12, 0, 0, 0),
      endTime: new Date(2023, 7, 12, 0, 0, 0),
      completed: false,
      description: null,
    });
  });
});
