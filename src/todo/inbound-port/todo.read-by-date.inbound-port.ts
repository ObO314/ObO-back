export type TodoReadByDateInboundPortInputDto = {
  userId: string;

  startDate: Date;

  endDate: Date;
};

export type TodoReadByDateInboundPortOutputDto = {
  todoId: string;

  name: string;

  startTime: Date;

  endTime: Date;

  description?: string;

  completed: boolean;
}[];

export const TODO_READ_BY_DATE_INBOUND_PORT =
  'TODO_READ_BY_DATE_INBOUND_PORT' as const;

export interface TodoReadByDateInboundPort {
  readByDate(
    params: TodoReadByDateInboundPortInputDto,
  ): Promise<TodoReadByDateInboundPortOutputDto>;
}
