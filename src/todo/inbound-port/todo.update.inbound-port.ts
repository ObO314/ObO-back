export type TodoUpdateInboundPortInputDto = {
  userId: string;
  todoId: string;
  name?: string;
  startTime?: Date;
  endTime?: Date;
  completed?: boolean;
};

export type TodoUpdateInboundPortOutputDto = {
  todoId: string;
  name?: string;
  startTime?: Date;
  endTime?: Date;
  completed?: boolean;
};

export const TODO_UPDATE_INBOUND_PORT = 'TODO_UPDATE_INBOUND_PORT' as const;

export interface TodoUpdateInboundPort {
  update(
    params: TodoUpdateInboundPortInputDto,
  ): Promise<TodoUpdateInboundPortOutputDto>;
}
