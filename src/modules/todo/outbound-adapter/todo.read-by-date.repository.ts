import { Injectable } from '@nestjs/common';
import {
  TodoReadByDateOutboundPort,
  TodoReadByDateOutboundPortInputDto,
  TodoReadByDateOutboundPortOutputDto,
} from '../outbound-port/todo.read-by-date.outbound-port';
import { EntityManager } from '@mikro-orm/knex';
import { Todos } from 'src/database/entities/Todos';

@Injectable()
export class TodoReadByDateRepository implements TodoReadByDateOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: TodoReadByDateOutboundPortInputDto,
  ): Promise<TodoReadByDateOutboundPortOutputDto> {
    return await this.em.find(Todos, {
      user: params.userId,
      $or: [
        { startTime: { $gte: params.startTime, $lte: params.endTime } },
        { endTime: { $gte: params.startTime, $lte: params.endTime } },
      ],
    });
  }
}
