export type TodoReadByDateOutboundPortInputDto = {
  userId: string;

  startTime: Date;

  endTime: Date;
};

export type TodoReadByDateOutboundPortOutputDto = {
  todoId: string;

  name: string;

  startTime: Date;

  endTime: Date;

  description?: string;

  completed: boolean;
}[];

export const TODO_READ_BY_DATE_OUTBOUND_PORT =
  'TODO_READ_BY_DATE_OUTBOUND_PORT' as const;

export interface TodoReadByDateOutboundPort {
  readByDate(
    params: TodoReadByDateOutboundPortInputDto,
  ): Promise<TodoReadByDateOutboundPortOutputDto>;
}
