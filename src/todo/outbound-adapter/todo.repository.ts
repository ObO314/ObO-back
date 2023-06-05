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
import { Todos } from 'src/database/entities/Todos';
import {
  TodoDeleteOutboundPort,
  TodoDeleteOutboundPortInputDto,
  TodoDeleteOutboundPortOutputDto,
} from '../outbound-port/todo.delete.outbound-port';
import { Injectable } from '@nestjs/common';
import { TodoUpdateOutboundPortInputDto } from '../outbound-port/todo.update.outbound-port';
import { Users } from 'src/database/entities/Users';
import {
  TodoReadByDateOutboundPort,
  TodoReadByDateOutboundPortInputDto,
  TodoReadByDateOutboundPortOutputDto,
} from '../outbound-port/todo.read-by-date.outbound-port';
import {
  TodoReadByTodoIdOutboundPortInputDto,
  TodoReadByTodoIdOutboundPortOutputDto,
} from '../outbound-port/todo.read-by-todo-id.outbound-port';

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
    const userId = await this.em.findOne(Users, { userId: params.userId });
    const thisTodo = this.em.create(Todos, {
      userId: userId,
      name: params.name,
      startTime: params.startTime,
      endTime: params.endTime,
      completed: params.completed,
    });

    await this.em.persistAndFlush(thisTodo);

    return {
      todoId: thisTodo.todoId,
      name: thisTodo.name,
      startTime: thisTodo.startTime,
      endTime: thisTodo.endTime,
      completed: thisTodo.completed,
    };
  }

  // 날짜를 받아 해당기간의 할일 모두 불러오기
  async readByDate(
    params: TodoReadByDateOutboundPortInputDto,
  ): Promise<TodoReadByDateOutboundPortOutputDto> {
    // 불러올 날짜의 시작지점, 끝지점을 받아서 그 사이에 있는 투두를 모두 받아옴
    const userId = await this.em.findOne(Users, { userId: params.userId });
    const todos = await this.em.find(Todos, {
      userId: userId,
      startTime: { $gte: params.startDate, $lte: params.endDate },
      endTime: { $gte: params.startDate, $lte: params.endDate },
    });
    return todos;
  }

  async readByTodoId(
    params: TodoReadByTodoIdOutboundPortInputDto,
  ): Promise<TodoReadByTodoIdOutboundPortOutputDto> {
    const userId = await this.em.findOne(Users, { userId: params.userId });
    const todo = await this.em.findOne(Todos, {
      userId: userId,
      todoId: params.todoId,
    });
    return todo;
  }

  // 유저와 할 일을 특정하여, 최신 정보를 업데이트 함
  async update(
    params: TodoUpdateOutboundPortInputDto,
  ): Promise<TodoUpdateOutboundPortOutputDto> {
    const userId = await this.em.findOne(Users, { userId: params.userId });
    const todo = await this.em.findOne(Todos, { todoId: params.todoId });

    const ntodo = {
      ...(params.name && { name: params.name }),
      ...(params.startTime && { startTime: params.startTime }),
      ...(params.endTime && { endTime: params.endTime }),
      ...(params.completed && { completed: params.completed }),
    };
    // const newtodo = {
    //   todoId: params.todoId,
    //   name: params.name,
    //   startTime: params.startTime,
    //   endTime: params.endTime,
    //   completed: params.completed,
    // };
    await this.em.upsert(Todos, {
      userId: userId,
      todoId: params.todoId,
      ...ntodo,
    });

    return todo;
  }

  // 유저와 할일을 특정하여 삭제함
  async delete(
    params: TodoDeleteOutboundPortInputDto,
  ): Promise<TodoDeleteOutboundPortOutputDto> {
    const userId = await this.em.findOne(Users, { userId: params.userId });
    const todo = await this.em.findOne(Todos, {
      userId: userId,
      todoId: params.todoId,
    });
    await this.em.removeAndFlush(todo);
    return { todoId: todo.todoId, name: todo.name };
  }
}
