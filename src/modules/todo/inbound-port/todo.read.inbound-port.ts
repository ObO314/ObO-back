import { Todos } from 'src/database/entities/Todos';
import { Users } from 'src/database/entities/Users';

export type TodoReadInboundPortInputDto = {
  todoId: string;
  userId: string;
};

export type TodoReadInboundPortOutputDto = Todos;

export const TODO_READ_INBOUND_PORT = 'TODO_READ_INBOUND_PORT' as const;

export interface TodoReadInboundPort {
  execute(
    params: TodoReadInboundPortInputDto,
  ): Promise<TodoReadInboundPortOutputDto>;
}
