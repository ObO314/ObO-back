import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/knex';
import { Todos } from 'src/database/entities/Todos';
import {
  TodoDeleteOutboundPort,
  TodoDeleteOutboundPortInputDto,
  TodoDeleteOutboundPortOutputDto,
} from '../outbound-port/todo.delete.outbound-port';

@Injectable()
export class TodoDeleteRepository implements TodoDeleteOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: TodoDeleteOutboundPortInputDto,
  ): Promise<TodoDeleteOutboundPortOutputDto> {
    const toDeleteTodo = await this.em.findOne(Todos, {
      id: params.todoId,
      user: params.userId,
    });
    await this.em.removeAndFlush(toDeleteTodo);
    return toDeleteTodo;
  }
}
