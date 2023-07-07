import { Todos } from 'src/database/entities/Todos';
import { Users } from 'src/database/entities/Users';

export type TodoDeleteInboundPortInputDto = {
  todoId: string;
  userId: string;
};

export type TodoDeleteInboundPortOutputDto = Todos;

export const TODO_DELETE_INBOUND_PORT = 'TODO_DELETE_INBOUND_PORT' as const;

export interface TodoDeleteINboundPort {
  execute(
    params: TodoDeleteInboundPortInputDto,
  ): Promise<TodoDeleteInboundPortOutputDto>;
}
