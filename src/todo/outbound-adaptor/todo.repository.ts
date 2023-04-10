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

export class TodoRepository implements TodoCreateOutboundPort {
  constructor(
    @InjectRepository(Todos)
    private readonly todoRepository: EntityRepository<Todos>,
  ) {}

  async create(
    params: TodoCreateOutboundPortInputDto,
  ): Promise<TodoCreateOutboundPortOutputDto> {
    const newTodo = {
      userId: params.userId,
      name: params.name,
      startTime: params.startTime,
      endTime: params.endTime,
      completed: params.completed,
    };
    const thisTodo = this.todoRepository.create(newTodo);
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
    // 투두와 유저 정보를 받아와서
    // 투두의 유저가 받아온 유저정보랑 일치하는지 확인
    // 맞으면 삭제, 아니면 권한 없음
    const user = params.userId;
    const todo = params.todoId;
    const findTodo = await this.todoRepository.findOne({ todoId: todo });

    if (user != findTodo.userId.userId) {
      throw new HttpException(
        '해당 데이터에 대한 접근권한이 없습니다.',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.todoRepository.removeAndFlush(findTodo);
    return {
      userId: findTodo.userId.userId,
      name: findTodo.name,
      startTime: findTodo.startTime,
      endTime: findTodo.endTime,
      completed: findTodo.completed,
      todoId: findTodo.todoId,
    };
  }
}
