import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/knex';
import { Todos } from 'src/database/entities/Todos';
import {
  TodoReadOutboundPort,
  TodoReadOutboundPortInputDto,
  TodoReadOutboundPortOutputDto,
} from '../outbound-port/todo.read.outbound-port';

@Injectable()
export class TodoReadRepository implements TodoReadOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: TodoReadOutboundPortInputDto,
  ): Promise<TodoReadOutboundPortOutputDto> {
    return await this.em.findOne(Todos, {
      id: params.todoId,
      user: params.userId,
    });
  }
}
