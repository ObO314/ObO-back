export type TodoUpdateOutboundPortInputDto = {
  userId: string;

  todoId: string;

  name?: string;

  startTime?: Date;

  endTime?: Date;

  description?: string;

  completed?: boolean;
};

export type TodoUpdateOutboundPortOutputDto = {
  todoId: string;

  name: string;

  startTime: Date;

  endTime: Date;

  description?: string;

  completed: boolean;
};

export const TODO_UPDATE_OUTBOUND_PORT = 'TODO_UPDATE_OUTBOUND_PORT' as const;

export interface TodoUpdateOutboundPort {
  update(
    params: TodoUpdateOutboundPortInputDto,
  ): Promise<TodoUpdateOutboundPortOutputDto>;
}
