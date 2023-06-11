export type TodoCreateOutboundPortInputDto = {
  userId: string;

  name: string;

  startTime: Date;

  endTime: Date;

  description?: string;

  completed: boolean;
};

export type TodoCreateOutboundPortOutputDto = {
  todoId: string;

  name: string;

  startTime: Date;

  endTime: Date;

  description?: string;

  completed: boolean;
};

export const TODO_CREATE_OUTBOUND_PORT = 'TODO_CREATE_OUTBOUND_PORT' as const;

export interface TodoCreateOutboundPort {
  create(
    params: TodoCreateOutboundPortInputDto,
  ): Promise<TodoCreateOutboundPortOutputDto>;
}
