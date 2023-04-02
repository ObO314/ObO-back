import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import {
  TodoCreateOutboundPort,
  TodoCreateOutboundPortInputDto,
  TodoCreateOutboundPortOutputDto,
} from './../outbound-port/todo.create.outbound-port';
import { Todos } from 'src/database/entities/Todos';

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
    const Todo = this.todoRepository.create({ ...newTodo });
    await this.todoRepository.persistAndFlush(Todo);
    return Todo;
  }
}
