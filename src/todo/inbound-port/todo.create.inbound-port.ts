type Users = {
  userId: string;
};

export type TodoCreateInboundPortInputDto = {
  userId: Users;

  name: string;

  startTime: Date;

  endTime: Date;

  completed: boolean;
};

export type TodoCreateInboundPortOutputDto = {
  todoId: string;

  userId: string;

  name: string;

  startTime: Date;

  endTime: Date;

  completed: boolean;
};

export const TODO_CREATE_INBOUND_PORT = 'TODO_CREATE_INBOUND_PORT' as const;

export interface TodoCreateInboundPort {
  create(
    params: TodoCreateInboundPortInputDto,
  ): Promise<TodoCreateInboundPortOutputDto>;
}
