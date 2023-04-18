export type TodoReadOutboundPortInputDto = {
  userId: string;
  startDate: Date;
  endDate: Date;
};

export type TodoReadOutboundPortOutputDto = {
  todoId: string;

  name: string;

  startTime: Date;

  endTime: Date;

  completed: boolean;
}[];

export const TODO_READ_OUTBOUND_PORT = 'TODO_READ_OUTBOUND_PORT' as const;

export interface TodoReadOutboundPort {
  read(
    params: TodoReadOutboundPortInputDto,
  ): Promise<TodoReadOutboundPortOutputDto>;
}
