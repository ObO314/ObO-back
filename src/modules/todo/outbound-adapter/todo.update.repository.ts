import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/knex';
import { Todos } from 'src/database/entities/Todos';
import {
  TodoUpdateOutboundPort,
  TodoUpdateOutboundPortInputDto,
  TodoUpdateOutboundPortOutputDto,
} from '../outbound-port/todo.update.outbound-port';

@Injectable()
export class TodoUpdateRepository implements TodoUpdateOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: TodoUpdateOutboundPortInputDto,
  ): Promise<TodoUpdateOutboundPortOutputDto> {
    const updatedTodo = await this.em.upsert(Todos, {
      ...params,
      id: params.todoId,
    });
    await this.em.flush();
    return updatedTodo;
  }
}
