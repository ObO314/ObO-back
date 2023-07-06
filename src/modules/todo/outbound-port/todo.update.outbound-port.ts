import { Todos } from 'src/database/entities/Todos';

export type TodoUpdateOutboundPortInputDto = {
  todoId: string;
  name?: string;
  startTime?: Date;
  endTime?: Date;
  description?: string;
  completed?: boolean;
};

export type TodoUpdateOutboundPortOutputDto = Todos;

export const TODO_UPDATE_OUTBOUND_PORT = 'TODO_UPDATE_OUTBOUND_PORT' as const;

export interface TodoUpdateOutboundPort {
  execute(
    params: TodoUpdateOutboundPortInputDto,
  ): Promise<TodoUpdateOutboundPortOutputDto>;
}
