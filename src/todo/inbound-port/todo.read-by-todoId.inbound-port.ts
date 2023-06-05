export type TodoReadByTodoIdInboundPortInputDto = {
  userId: string;

  todoId: string;
};

export type TodoReadByTodoIdInboundPortOutputDto = {
  todoId: string;

  name: string;

  startTime: Date;

  endTime: Date;

  description?: string;

  completed: boolean;
};

export const TODO_READ_BY_TODO_ID_INBOUND_PORT =
  'TODO_READ_BY_TODO_ID_INBOUND_PORT' as const;

export interface TodoReadByTodoIdInboundPort {
  readByTodoId(
    params: TodoReadByTodoIdInboundPortInputDto,
  ): Promise<TodoReadByTodoIdInboundPortOutputDto>;
}
