import { Injectable } from '@nestjs/common';
import {
  TodoCreateOutboundPort,
  TodoCreateOutboundPortInputDto,
  TodoCreateOutboundPortOutputDto,
} from '../outbound-port/todo.create.outbound-port';
import { EntityManager } from '@mikro-orm/knex';
import { Todos } from 'src/database/entities/Todos';

@Injectable()
export class TodoCreateRepository implements TodoCreateOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: TodoCreateOutboundPortInputDto,
  ): Promise<TodoCreateOutboundPortOutputDto> {
    const { userId, ...rest } = params;
    const newTodo = this.em.create(Todos, {
      user: userId,
      ...rest,
    });
    await this.em.persistAndFlush(newTodo);
    return {
      ...newTodo,
      todoId: newTodo.id,
      userId: newTodo.user.id,
    };
  }
}
