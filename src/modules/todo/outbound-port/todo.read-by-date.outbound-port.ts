import { Todos } from 'src/database/entities/Todos';
import { Users } from 'src/database/entities/Users';

export type TodoReadByDateOutboundPortInputDto = {
  userId: string;

  startTime: Date;

  endTime: Date;
};

export type TodoReadByDateOutboundPortOutputDto = Todos[];

export const TODO_READ_BY_DATE_OUTBOUND_PORT =
  'TODO_READ_BY_DATE_OUTBOUND_PORT' as const;

export interface TodoReadByDateOutboundPort {
  execute(
    params: TodoReadByDateOutboundPortInputDto,
  ): Promise<TodoReadByDateOutboundPortOutputDto>;
}
