import { Entity, EntityName, PopulateHint, Reference } from '@mikro-orm/core';
import {
  TodoUpdateOutboundPort,
  TodoUpdateOutboundPortOutputDto,
} from '../outbound-port/todo.update.outbound-port';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/knex';

import {
  TodoCreateOutboundPort,
  TodoCreateOutboundPortInputDto,
  TodoCreateOutboundPortOutputDto,
} from '../outbound-port/todo.create.outbound-port';
import { Todos } from '../../database/entities/Todos';
import {
  TodoDeleteOutboundPort,
  TodoDeleteOutboundPortInputDto,
  TodoDeleteOutboundPortOutputDto,
} from '../outbound-port/todo.delete.outbound-port';
import { Injectable } from '@nestjs/common';
import { TodoUpdateOutboundPortInputDto } from '../outbound-port/todo.update.outbound-port';
import {
  TodoReadByDateOutboundPort,
  TodoReadByDateOutboundPortInputDto,
  TodoReadByDateOutboundPortOutputDto,
} from '../outbound-port/todo.read-by-date.outbound-port';
import {
  TodoReadByTodoIdOutboundPortInputDto,
  TodoReadByTodoIdOutboundPortOutputDto,
} from '../outbound-port/todo.read-by-todo-id.outbound-port';
import { curry, pipe, tap, filter } from '@fxts/core';
import { Users } from 'src/database/entities/Users';

@Injectable()
export class TodoRepository
  implements
    TodoCreateOutboundPort,
    TodoDeleteOutboundPort,
    TodoUpdateOutboundPort,
    TodoReadByDateOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  // 할 일 생성하기
  async create(
    params: TodoCreateOutboundPortInputDto,
  ): Promise<TodoCreateOutboundPortOutputDto> {
    const em = this.em;
    const { userId, ...rest } = params;
    const user = em.getReference(Users, userId);
    const content = { user, ...rest };

    const result = await pipe(
      content,
      (content) => em.create(Todos, content),
      tap((createdTodo) => em.persistAndFlush(createdTodo)),
    );

    return await em.findOne(Todos, { id: result.id });
  }

  async readByDate(
    params: TodoReadByDateOutboundPortInputDto,
  ): Promise<TodoReadByDateOutboundPortOutputDto> {
    // 불러올 날짜의 시작지점, 끝지점을 받아서 그 사이에 있는 투두를 모두 받아옴
    const em = this.em;
    const { userId, ...rest } = params;
    const user = em.getReference(Users, userId);
    const content = { user, ...rest };
    const condition = {
      user: content.user,
      startTime: { $gte: content.startTime, $lte: content.endTime },
      endTime: { $gte: content.startTime, $lte: content.endTime },
    };

    return await pipe(condition, (condition) => em.find(Todos, condition));
  }

  async readByTodoId(
    params: TodoReadByTodoIdOutboundPortInputDto,
  ): Promise<TodoReadByTodoIdOutboundPortOutputDto> {
    const em = this.em;
    const { userId, todoId } = params;
    const user = em.getReference(Users, userId);
    const content = { user, id: todoId };
    return await em.findOne(Todos, content);
  }
  // 유저와 할 일을 특정하여, 최신 정보를 업데이트 함
  async update(
    params: TodoUpdateOutboundPortInputDto,
  ): Promise<TodoUpdateOutboundPortOutputDto> {
    const em = this.em;
    const { userId, todoId, ...rest } = params;
    const existed = await em.findOne(Todos, { id: todoId, user: userId });
    const content = { ...existed, ...rest };
    const result = await em.upsert(Todos, content);

    return await em.findOne(Todos, { id: result.id });
  }

  // 유저와 할일을 특정하여 삭제함
  async delete(
    params: TodoDeleteOutboundPortInputDto,
  ): Promise<TodoDeleteOutboundPortOutputDto> {
    const em = this.em;
    const { userId, todoId } = params;
    const user = em.getReference(Users, userId);
    const content = { user, id: todoId };
    return await pipe(
      content,
      (content) => em.findOne(Todos, content),
      tap((todo) => em.removeAndFlush(todo)),
    );
  }
}
