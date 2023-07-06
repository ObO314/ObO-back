import { Todos } from 'src/database/entities/Todos';
import { Users } from 'src/database/entities/Users';

export type TodoDeleteOutboundPortInputDto = {
  todoId: string;
  userId: string;
};

export type TodoDeleteOutboundPortOutputDto = Todos;

export const TODO_DELETE_OUTBOUND_PORT = 'TODO_DELETE_OUTBOUND_PORT' as const;

export interface TodoDeleteOutboundPort {
  execute(
    params: TodoDeleteOutboundPortInputDto,
  ): Promise<TodoDeleteOutboundPortOutputDto>;
}
