export type TodoCreateInboundPortInputDto = {
  userId: string;

  name: string;

  startTime: Date;

  endTime: Date;

  description: string;

  completed: boolean;
};

export type TodoCreateInboundPortOutputDto = {
  todoId: string;

  name: string;

  startTime: Date;

  endTime: Date;

  description: string;

  completed: boolean;
};

export const TODO_CREATE_INBOUND_PORT = 'TODO_CREATE_INBOUND_PORT' as const;

export interface TodoCreateInboundPort {
  create(
    params: TodoCreateInboundPortInputDto,
  ): Promise<TodoCreateInboundPortOutputDto>;
}
