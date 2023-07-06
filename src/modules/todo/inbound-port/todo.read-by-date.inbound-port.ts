import { Todos } from 'src/database/entities/Todos';
import { Users } from 'src/database/entities/Users';

export type TodoReadByDateInboundPortInputDto = {
  userId: string;

  startTime: Date;

  endTime: Date;
};

export type TodoReadByDateInboundPortOutputDto = Todos[];

export const TODO_READ_BY_DATE_INBOUND_PORT =
  'TODO_READ_BY_DATE_INBOUND_PORT' as const;

export interface TodoReadByDateInboundPort {
  execute(
    params: TodoReadByDateInboundPortInputDto,
  ): Promise<TodoReadByDateInboundPortOutputDto>;
}
