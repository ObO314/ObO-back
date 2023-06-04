import { Inject } from '@nestjs/common';
import {
  TodoReadByTodoIdInboundPort,
  TodoReadByTodoIdInboundPortInputDto,
  TodoReadByTodoIdInboundPortOutputDto,
} from '../inbound-port/todo.read-by-todoId.inbound-port';
import { TODO_READ_BY_TODO_ID_OUTBOUND_PORT } from '../outbound-port/todo.read-by-todo-id.outbound-port';

export class TodoReadByTodoIdService implements TodoReadByTodoIdInboundPort {
  constructor(
    @Inject(TODO_READ_BY_TODO_ID_OUTBOUND_PORT)
    private readonly todoReadByDateOutboundPort: TodoReadByTodoIdInboundPort,
  ) {}

  async readByTodoId(
    params: TodoReadByTodoIdInboundPortInputDto,
  ): Promise<TodoReadByTodoIdInboundPortOutputDto> {
    return await this.todoReadByDateOutboundPort.readByTodoId(params);
  }
}
