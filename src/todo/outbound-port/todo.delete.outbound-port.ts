import { Todos } from 'database/entities/Todos';
import { Users } from 'database/entities/Users';

export type TodoDeleteOutboundPortInputDto = {
  todoId: string;
  userId: string;
};

export type TodoDeleteOutboundPortOutputDto = Todos;

export const TODO_DELETE_OUTBOUND_PORT = 'TODO_DELETE_OUTBOUND_PORT' as const;

export interface TodoDeleteOutboundPort {
  delete(
    params: TodoDeleteOutboundPortInputDto,
  ): Promise<TodoDeleteOutboundPortOutputDto>;
}
