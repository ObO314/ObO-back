import { Todos } from 'src/database/entities/Todos';
import { Users } from 'src/database/entities/Users';

export type TodoCreateOutboundPortInputDto = {
  userId: string;

  name: string;

  startTime: Date;

  endTime: Date;

  description?: string;

  completed: boolean;
};

export type TodoCreateOutboundPortOutputDto = Todos;

export const TODO_CREATE_OUTBOUND_PORT = 'TODO_CREATE_OUTBOUND_PORT' as const;

export interface TodoCreateOutboundPort {
  create(
    params: TodoCreateOutboundPortInputDto,
  ): Promise<TodoCreateOutboundPortOutputDto>;
}
