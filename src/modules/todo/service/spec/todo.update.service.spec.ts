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
import {
  TodoReadOutboundPort,
  TodoReadOutboundPortInputDto,
  TodoReadOutboundPortOutputDto,
} from '../../outbound-port/todo.read.outbound-port';
import { TodoUpdateService } from '../todo.update.service';
import {
  TodoUpdateOutboundPort,
  TodoUpdateOutboundPortInputDto,
  TodoUpdateOutboundPortOutputDto,
} from '../../outbound-port/todo.update.outbound-port';
import { TodoUpdateInboundPortOutputDto } from '../../inbound-port/todo.update.inbound-port';
import { HttpException, HttpStatus } from '@nestjs/common';
dotenv.config();

describe('TodoUpdateService Spec', () => {
  let todoUpdateService: TodoUpdateService;
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

  class MockTodoUpdateOutboundPort implements TodoUpdateOutboundPort {
    constructor(private readonly params: TodoUpdateOutboundPortOutputDto) {}
    async execute(
      params: TodoUpdateOutboundPortInputDto,
    ): Promise<TodoUpdateOutboundPortOutputDto> {
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

  //------------------------------------------------------------

  test('투두 수정 : 정상적으로 투두 수정하기', async () => {
    todoUpdateService = new TodoUpdateService(
      new MockTodoReadOutboundPort({
        // 투두 검색 시 나오는 것
        id: '1',
        user: em.getReference(Users, '1'),
        name: '수정할 투두입니다.',
        startTime: new Date(2023, 7, 12, 0, 0, 0),
        endTime: new Date(2023, 7, 12, 0, 0, 0),
        completed: false,
        description: null,
      }),
      new MockTodoUpdateOutboundPort({
        //투두 수정 시 빈환하는 값
        id: '1',
        user: em.getReference(Users, '1'),
        name: '수정완료 된 투두입니다.',
        startTime: new Date(2023, 7, 12, 0, 0, 0),
        endTime: new Date(2023, 7, 12, 0, 0, 0),
        completed: false,
        description: null,
      }),
    );

    const params = {
      todoId: '1',
      userId: '1',
      name: '수정완료 된 투두입니다.',
      completed: true,
    };

    const result: TodoUpdateInboundPortOutputDto =
      await todoUpdateService.execute(params);

    expect(result).toEqual({
      id: '1',
      user: em.getReference(Users, '1'),
      name: '수정완료 된 투두입니다.',
      startTime: new Date(2023, 7, 12, 0, 0, 0),
      endTime: new Date(2023, 7, 12, 0, 0, 0),
      completed: false,
      description: null,
    });
  });

  //------------------------------------------------------------

  test('투두 수정 : 권한없는 투두를 수정하기', async () => {
    todoUpdateService = new TodoUpdateService(
      new MockTodoReadOutboundPort(null),
      new MockTodoUpdateOutboundPort(null),
    );

    const params = {
      todoId: '1',
      userId: '2',
      name: '수정완료 된 투두입니다.',
      completed: true,
    };

    expect(async () => await todoUpdateService.execute(params)).rejects.toThrow(
      new HttpException('수정 권한이 없습니다.', HttpStatus.BAD_REQUEST),
    );
  });
});
