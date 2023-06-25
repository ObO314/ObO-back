import { EntityManager } from '@mikro-orm/knex';
import {
  TodoUpdateOutboundPort,
  TodoUpdateOutboundPortInputDto,
  TodoUpdateOutboundPortOutputDto,
} from '../outbound-port/todo.update.outbound-port';
import { TodoUpdateService } from './todo.update.service';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import testConfig from 'src/mikro-orm.test.config';
import { Users } from 'database/entities/Users';

class MockTodoUpdateOutboundPort implements TodoUpdateOutboundPort {
  private readonly params: TodoUpdateOutboundPortOutputDto;
  constructor(params: TodoUpdateOutboundPortOutputDto) {
    this.params = params;
  }
  async update(
    params: TodoUpdateOutboundPortInputDto,
  ): Promise<TodoUpdateOutboundPortOutputDto> {
    return this.params;
  }
}

describe('TodoUpdateSerivce Spec', () => {
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
  test('투두 수정 : TodoId, UserId, 내용을 받아 할 일를 수정한다.', async () => {
    const todoUpdateService = new TodoUpdateService(
      new MockTodoUpdateOutboundPort({
        id: '1',
        user: em.getReference(Users, '1'),
        name: '할 일 내일 거 까지 정리하기',
        startTime: new Date(2023, 6, 1, 10, 30),
        endTime: new Date(2023, 6, 2, 11, 0),
        completed: true,
      }),
    );

    const result = await todoUpdateService.update({
      todoId: '1',
      userId: '1',
      name: '할 일 내일 거 까지 정리하기',
      startTime: new Date(2023, 6, 1, 10, 30),
      endTime: new Date(2023, 6, 2, 11, 0),
      completed: true,
    });

    expect(result).toStrictEqual({
      id: '1',
      user: em.getReference(Users, '1'),
      name: '할 일 내일 거 까지 정리하기',
      startTime: new Date(2023, 6, 1, 10, 30),
      endTime: new Date(2023, 6, 2, 11, 0),
      completed: true,
    });
  });
});
