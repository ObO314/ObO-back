import { Todos } from 'src/database/entities/Todos';

export type TodoCreateInboundPortInputDto = {
  userId: string;
  name: string;
  startTime: Date;
  endTime: Date;
  description?: string;
  completed: boolean;
};

export type TodoCreateInboundPortOutputDto = Todos;

export const TODO_CREATE_INBOUND_PORT = 'TODO_CREATE_INBOUND_PORT' as const;

export interface TodoCreateInboundPort {
  execute(
    params: TodoCreateInboundPortInputDto,
  ): Promise<TodoCreateInboundPortOutputDto>;
}
