export type TodoDeleteOutboundPortInputDto = {
  userId: string;
  todoId: string;
};

export type TodoDeleteOutboundPortOutputDto = {
  todoId: string;
  name: string;
};

export const TODO_DELETE_OUTBOUND_PORT = 'TODO_DELETE_OUTBOUND_PORT' as const;

export interface TodoDeleteOutboundPort {
  delete(
    params: TodoDeleteOutboundPortInputDto,
  ): Promise<TodoDeleteOutboundPortOutputDto>;
}
