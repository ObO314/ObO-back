export type TodoReadInboundPortInputDto = {
  userId: string;
  startDate: Date;
  endDate: Date;
};

export type TodoReadInboundPortOutputDto = {
  todoId: string;

  name: string;

  startTime: Date;

  endTime: Date;

  completed: boolean;
}[];

export const TODO_READ_INBOUND_PORT = 'TODO_READ_INBOUND_PORT' as const;

export interface TodoReadInboundPort {
  read(
    params: TodoReadInboundPortInputDto,
  ): Promise<TodoReadInboundPortOutputDto>;
}
