import { Todos } from 'database/entities/Todos';
import { Users } from 'database/entities/Users';

export type TodoCreateInboundPortInputDto = {
  userId: string;

  name: string;

  startTime: Date;

  endTime: Date;

  description?: string;

  completed: boolean;
};

export type TodoCreateInboundPortOutputDto = Todos;

export const TODO_CREATE_INBOUND_PORT = 'TODO_CREATE_INBOUND_PORT' as const;

export interface TodoCreateInboundPort {
  create(
    params: TodoCreateInboundPortInputDto,
  ): Promise<TodoCreateInboundPortOutputDto>;
}
