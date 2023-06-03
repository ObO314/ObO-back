import {
  TodoUpdateOutboundPort,
  TodoUpdateOutboundPortOutputDto,
} from '../outbound-port/todo.update.outbound-port';
import { InjectRepository } from '@mikro-orm/nestjs';
// import { EntityRepository } from '@mikro-orm/core';
import { EntityManager, EntityRepository } from '@mikro-orm/knex';

import {
  TodoCreateOutboundPort,
  TodoCreateOutboundPortInputDto,
  TodoCreateOutboundPortOutputDto,
} from '../outbound-port/todo.create.outbound-port';
import { Todos } from 'src/database/entities/Todos';
import {
  TodoDeleteOutboundPort,
  TodoDeleteOutboundPortInputDto,
  TodoDeleteOutboundPortOutputDto,
} from '../outbound-port/todo.delete.outbound-port';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TodoUpdateOutboundPortInputDto } from '../outbound-port/todo.update.outbound-port';
import { Users } from 'src/database/entities/Users';
import {
  TodoReadOutboundPort,
  TodoReadOutboundPortInputDto,
  TodoReadOutboundPortOutputDto,
} from '../outbound-port/todo.read.outbound-port';

export class TodoRepository
  implements
    TodoCreateOutboundPort,
    TodoDeleteOutboundPort,
    TodoUpdateOutboundPort,
    TodoReadOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  // 할 일 생성하기
  async create(
    params: TodoCreateOutboundPortInputDto,
  ): Promise<TodoCreateOutboundPortOutputDto> {
    const thisTodo = this.em.create(Todos, {
      userId: await this.em.findOne(Users, { userId: params.userId }),
      name: params.name,
      startTime: params.startTime,
      endTime: params.endTime,
      completed: params.completed,
    });

    await this.em.persistAndFlush(thisTodo);

    return {
      userId: thisTodo.userId.userId,
      name: thisTodo.name,
      startTime: thisTodo.startTime,
      endTime: thisTodo.endTime,
      completed: thisTodo.completed,
      todoId: thisTodo.todoId,
    };
  }

  // 날짜를 받아 해당기간의 할일 모두 불러오기
  async read(
    params: TodoReadOutboundPortInputDto,
  ): Promise<TodoReadOutboundPortOutputDto> {
    // 불러올 날짜의 시작지점, 끝지점을 받아서 그 사이에 있는 투두를 모두 받아옴
    const userId = await this.em.findOne(Users, { userId: params.userId });
    const todos = await this.em.find(Todos, {
      userId: userId,
      startTime: { $gte: params.startDate, $lte: params.endDate },
      endTime: { $gte: params.startDate, $lte: params.endDate },
    });

    return todos;
  }

  // 유저와 할 일을 특정하여, 최신 정보를 업데이트 함
  async update(
    params: TodoUpdateOutboundPortInputDto,
  ): Promise<TodoUpdateOutboundPortOutputDto> {
    const findTodo = await this.matchTodoAndUser(params.userId, params.todoId);
    await this.em.upsert(Todos, {
      ...params,
      userId: findTodo.userId,
    });
    return { ...findTodo, userId: findTodo.userId.userId };
  }

  // 유저와 할일을 특정하여 삭제함
  async delete(
    params: TodoDeleteOutboundPortInputDto,
  ): Promise<TodoDeleteOutboundPortOutputDto> {
    const findTodo = await this.matchTodoAndUser(params.userId, params.todoId);
    await this.em.removeAndFlush(findTodo);
    return { ...findTodo, userId: findTodo.userId.userId };
  }

  async matchTodoAndUser(user: string, todo: string) {
    const findUser = await this.em.findOne(Users, { userId: user });
    const findTodo = await this.em.findOne(Todos, { todoId: todo });
    if (findUser == findTodo.userId) return findTodo;
    else this.throwForbiddenError();
  }

  throwForbiddenError() {
    throw new HttpException(
      '해당 데이터에 대한 접근권한이 없습니다.',
      HttpStatus.FORBIDDEN,
    );
  }
}
