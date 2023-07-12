import * as dotenv from 'dotenv';
import { TodoCreateService } from '../todo.create.service';
import { EntityManager } from '@mikro-orm/knex';
import { Users } from 'src/database/entities/Users';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import testConfig from 'src/mikro-orm.test.config';
import { TodoReadByDateService } from '../todo.read-by-date.service';
import {
  TodoReadByDateOutboundPort,
  TodoReadByDateOutboundPortInputDto,
  TodoReadByDateOutboundPortOutputDto,
} from '../../outbound-port/todo.read-by-date.outbound-port';
import { TodoReadByDateInboundPortOutputDto } from '../../inbound-port/todo.read-by-date.inbound-port';
dotenv.config();

describe('TodoService Spec', () => {
  let todoReadByDateService: TodoReadByDateService;
  let em: EntityManager;
  let orm: MikroORM;

  class MockReadByDateOutboundPort implements TodoReadByDateOutboundPort {
    constructor(private readonly params: TodoReadByDateOutboundPortOutputDto) {}
    async execute(
      params: TodoReadByDateOutboundPortInputDto,
    ): Promise<TodoReadByDateOutboundPortOutputDto> {
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
    todoReadByDateService = new TodoReadByDateService(
      new MockReadByDateOutboundPort([
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
      ]),
    );

    const params = {
      userId: '1',
      startTime: new Date(2023, 7, 1, 0, 0, 0),
      endTime: new Date(2023, 7, 31, 23, 59, 59),
    };

    const result: TodoReadByDateInboundPortOutputDto =
      await todoReadByDateService.execute(params);

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
});
