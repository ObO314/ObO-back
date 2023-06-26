import { Todos } from 'src/database/entities/Todos';
import { Users } from 'src/database/entities/Users';

export type TodoReadByTodoIdInboundPortInputDto = {
  todoId: string;
  userId: string;
};

export type TodoReadByTodoIdInboundPortOutputDto = Todos;

export const TODO_READ_BY_TODO_ID_INBOUND_PORT =
  'TODO_READ_BY_TODO_ID_INBOUND_PORT' as const;

export interface TodoReadByTodoIdInboundPort {
  readByTodoId(
    params: TodoReadByTodoIdInboundPortInputDto,
  ): Promise<TodoReadByTodoIdInboundPortOutputDto>;
}
