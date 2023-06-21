import { Todos } from 'src/database/entities/Todos';
import { Users } from 'src/database/entities/Users';

export type TodoReadByTodoIdOutboundPortInputDto = {
  todoId: string;
  userId: string;
};

export type TodoReadByTodoIdOutboundPortOutputDto = Todos;

export const TODO_READ_BY_TODO_ID_OUTBOUND_PORT =
  'TODO_READ_BY_TODO_ID_OUTBOUND_PORT' as const;

export interface TodoReadByTodoIdOutboundPort {
  readByTodoId(
    params: TodoReadByTodoIdOutboundPortInputDto,
  ): Promise<TodoReadByTodoIdOutboundPortOutputDto>;
}
