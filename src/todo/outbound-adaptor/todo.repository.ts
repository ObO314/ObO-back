import { TodoUpdateOutboundPortOutputDto } from './../outbound-port/todo.update.outbound-port';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import {
  TodoCreateOutboundPort,
  TodoCreateOutboundPortInputDto,
  TodoCreateOutboundPortOutputDto,
} from './../outbound-port/todo.create.outbound-port';
import { Todos } from 'src/database/entities/Todos';
import {
  TodoDeleteOutboundPortInputDto,
  TodoDeleteOutboundPortOutputDto,
} from '../outbound-port/todo.delete.outbound-port';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TodoUpdateOutboundPortInputDto } from '../outbound-port/todo.update.outbound-port';
import { Users } from 'src/database/entities/Users';

export class TodoRepository implements TodoCreateOutboundPort {
  constructor(
    @InjectRepository(Todos)
    private readonly todoRepository: EntityRepository<Todos>,
    @InjectRepository(Users)
    private readonly userRepository: EntityRepository<Users>,
  ) {}

  async create(
    params: TodoCreateOutboundPortInputDto,
  ): Promise<TodoCreateOutboundPortOutputDto> {
    const thisTodo = this.todoRepository.create({
      userId: await this.userRepository.findOne({ userId: params.userId }),
      name: params.name,
      startTime: params.startTime,
      endTime: params.endTime,
      completed: params.completed,
    });

    await this.todoRepository.persistAndFlush(thisTodo);

    return {
      userId: thisTodo.userId.userId,
      name: thisTodo.name,
      startTime: thisTodo.startTime,
      endTime: thisTodo.endTime,
      completed: thisTodo.completed,
      todoId: thisTodo.todoId,
    };
  }

  async delete(
    params: TodoDeleteOutboundPortInputDto,
  ): Promise<TodoDeleteOutboundPortOutputDto> {
    const findTodo = await this.matchTodoAndUser(params.userId, params.todoId);
    await this.todoRepository.removeAndFlush(findTodo);
    return { ...findTodo, userId: findTodo.userId.userId };
  }

  async update(
    params: TodoUpdateOutboundPortInputDto,
  ): Promise<TodoUpdateOutboundPortOutputDto> {
    const findTodo = await this.matchTodoAndUser(params.userId, params.todoId);
    await this.todoRepository.upsert({
      ...params,
      userId: findTodo.userId,
    });
    return { ...findTodo, userId: findTodo.userId.userId };
  }

  async matchTodoAndUser(user: string, todo: string) {
    const findUser = await this.userRepository.findOne({ userId: user });
    const findTodo = await this.todoRepository.findOne({ todoId: todo });
    console.log(findUser);
    console.log(findTodo);
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
