import { Users } from 'database/entities/Users';
import {
  TodoDeleteOutboundPort,
  TodoDeleteOutboundPortInputDto,
  TodoDeleteOutboundPortOutputDto,
} from '../outbound-port/todo.delete.outbound-port';
import { TodoDeleteService } from './todo.delete.service';
import {
  EntityManager,
  MikroORM,
  PostgreSqlDriver,
} from '@mikro-orm/postgresql';
import testConfig from 'src/mikro-orm.test.config';

class MockTodoDeleteOutboundPort implements TodoDeleteOutboundPort {
  private readonly params: TodoDeleteOutboundPortOutputDto;
  constructor(params: TodoDeleteOutboundPortOutputDto) {
    this.params = params;
  }
  async delete(
    params: TodoDeleteOutboundPortInputDto,
  ): Promise<TodoDeleteOutboundPortOutputDto> {
    return this.params;
  }
}

describe('TodoDeleteService Spec', () => {
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

  test('투두 삭제 : UserId, TodoId 를 받아 할 일을 삭제한다.', async () => {
    const todoDeleteService = new TodoDeleteService(
      new MockTodoDeleteOutboundPort({
        id: '1',
        name: '필요없어진 할 일',
        user: em.getReference(Users, '1'),
        startTime: new Date('2023-06-13T07:00:00.000Z'),
        endTime: new Date('2023-06-14T09:00:00.000Z'),
        description: '이것은 투두에 대한 설명입니다. 필수 요소는 아닙니다.',
        completed: false,
      }),
    );

    const result = await todoDeleteService.delete({
      todoId: '1',
      userId: '1',
    });

    expect(result).toStrictEqual({
      id: '1',
      name: '필요없어진 할 일',
      user: em.getReference(Users, '1'),
      startTime: new Date('2023-06-13T07:00:00.000Z'),
      endTime: new Date('2023-06-14T09:00:00.000Z'),
      description: '이것은 투두에 대한 설명입니다. 필수 요소는 아닙니다.',
      completed: false,
    });
  });
});
