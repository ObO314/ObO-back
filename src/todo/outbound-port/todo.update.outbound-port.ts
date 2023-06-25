import { Todos } from 'database/entities/Todos';
import { Users } from 'database/entities/Users';

export type TodoUpdateOutboundPortInputDto = {
  todoId: string;

  userId: string;

  name: string;

  startTime: Date;

  endTime: Date;

  description?: string;

  completed: boolean;
};

export type TodoUpdateOutboundPortOutputDto = Todos;

export const TODO_UPDATE_OUTBOUND_PORT = 'TODO_UPDATE_OUTBOUND_PORT' as const;

export interface TodoUpdateOutboundPort {
  update(
    params: TodoUpdateOutboundPortInputDto,
  ): Promise<TodoUpdateOutboundPortOutputDto>;
}
