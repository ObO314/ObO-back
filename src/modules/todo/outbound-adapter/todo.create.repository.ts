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
    const newTodo = this.em.create(Todos, {
      ...params,
      user: params.userId,
    });
    await this.em.persistAndFlush(newTodo);
    return newTodo;
  }
}
