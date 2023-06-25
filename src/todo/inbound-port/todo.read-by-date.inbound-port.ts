import { Todos } from 'database/entities/Todos';
import { Users } from 'database/entities/Users';

export type TodoReadByDateInboundPortInputDto = {
  userId: string;

  startTime: Date;

  endTime: Date;
};

export type TodoReadByDateInboundPortOutputDto = Todos[];

export const TODO_READ_BY_DATE_INBOUND_PORT =
  'TODO_READ_BY_DATE_INBOUND_PORT' as const;

export interface TodoReadByDateInboundPort {
  readByDate(
    params: TodoReadByDateInboundPortInputDto,
  ): Promise<TodoReadByDateInboundPortOutputDto>;
}
