import { Todos } from 'src/database/entities/Todos';
export type TodoReadOutboundPortInputDto = {
  todoId: string;
  userId: string;
};

export type TodoReadOutboundPortOutputDto = Todos;

export const TODO_READ_OUTBOUND_PORT = 'TODO_READ_OUTBOUND_PORT' as const;

export interface TodoReadOutboundPort {
  execute(
    params: TodoReadOutboundPortInputDto,
  ): Promise<TodoReadOutboundPortOutputDto>;
}
