import { Todos } from 'database/entities/Todos';
import { Users } from 'database/entities/Users';

export type TodoDeleteInboundPortInputDto = {
  todoId: string;
  userId: string;
};

export type TodoDeleteInboundPortOutputDto = Todos;

export const TODO_DELETE_INBOUND_PORT = 'TODO_DELETE_INBOUND_PORT' as const;

export interface TodoDeleteINboundPort {
  delete(
    params: TodoDeleteInboundPortInputDto,
  ): Promise<TodoDeleteInboundPortOutputDto>;
}
