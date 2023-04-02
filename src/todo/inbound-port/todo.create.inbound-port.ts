import { Todos } from 'src/database/entities/Todos';
import { Users } from 'src/database/entities/Users';

export type TodoCreateInboundPortInputDto = {
  userId: Users;

  name: string;

  startTime: Date;

  endTime: Date;

  completed: boolean;
};

export type TodoCreateInboundPortOutputDto = Todos;

export const TODO_CREATE_INBOUND_PORT = 'TODO_CREATE_INBOUND_PORT' as const;

export interface TodoCreateInboundPort {
  create(
    params: TodoCreateInboundPortInputDto,
  ): Promise<TodoCreateInboundPortOutputDto>;
}
