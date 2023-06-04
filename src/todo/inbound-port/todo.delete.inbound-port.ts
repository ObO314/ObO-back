export type TodoDeleteInboundPortInputDto = {
  userId: string;
  todoId: string;
};

export type TodoDeleteInboundPortOutputDto = {
  todoId: string;
  name: string;
};

export const TODO_DELETE_INBOUND_PORT = 'TODO_DELETE_INBOUND_PORT' as const;

export interface TodoDeleteINboundPort {
  delete(
    params: TodoDeleteInboundPortInputDto,
  ): Promise<TodoDeleteInboundPortOutputDto>;
}
