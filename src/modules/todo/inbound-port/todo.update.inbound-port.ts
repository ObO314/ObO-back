import { Todos } from 'src/database/entities/Todos';

export type TodoUpdateInboundPortInputDto = {
  todoId: string;

  userId: string;

  name?: string;

  startTime?: Date;

  endTime?: Date;

  description?: string;

  completed?: boolean;
};

export type TodoUpdateInboundPortOutputDto = Todos;

export const TODO_UPDATE_INBOUND_PORT = 'TODO_UPDATE_INBOUND_PORT' as const;

export interface TodoUpdateInboundPort {
  execute(
    params: TodoUpdateInboundPortInputDto,
  ): Promise<TodoUpdateInboundPortOutputDto>;
}
