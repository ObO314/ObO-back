export type TodoReadByTodoIdOutboundPortInputDto = {
  userId: string;

  todoId: string;
};

export type TodoReadByTodoIdOutboundPortOutputDto = {
  todoId: string;

  name: string;

  startTime: Date;

  endTime: Date;

  description?: string;

  completed: boolean;
};

export const TODO_READ_BY_TODO_ID_OUTBOUND_PORT =
  'TODO_READ_BY_TODO_ID_OUTBOUND_PORT' as const;

export interface TodoReadByTodoIdOutboundPort {
  readByTodoId(
    params: TodoReadByTodoIdOutboundPortInputDto,
  ): Promise<TodoReadByTodoIdOutboundPortOutputDto>;
}
