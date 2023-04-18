import {
  TodoDeleteINboundPort,
  TodoDeleteInboundPortInputDto,
  TodoDeleteInboundPortOutputDto,
} from '../inbound-port/todo.delete.inbound-port';
import {
  TODO_DELETE_OUTBOUND_PORT,
  TodoDeleteOutboundPort,
} from '../outbound-port/todo.delete.outbound-port';
import { Inject } from '@nestjs/common';

export class TodoDeleteService implements TodoDeleteINboundPort {
  constructor(
    @Inject(TODO_DELETE_OUTBOUND_PORT)
    private readonly todoDeleteOutboundPort: TodoDeleteOutboundPort,
  ) {}

  async delete(
    params: TodoDeleteInboundPortInputDto,
  ): Promise<TodoDeleteInboundPortOutputDto> {
    return await this.todoDeleteOutboundPort.delete(params);
  }
}
