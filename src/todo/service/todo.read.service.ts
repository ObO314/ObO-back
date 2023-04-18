import { Inject } from '@nestjs/common';
import {
  TodoReadInboundPort,
  TodoReadInboundPortOutputDto,
  TodoReadInboundPortInputDto,
} from './../inbound-port/todo.read.inbound-port';
import {
  TODO_READ_OUTBOUND_PORT,
  TodoReadOutboundPort,
} from './../outbound-port/todo.read.outbound-port';

export class TodoReadService implements TodoReadInboundPort {
  constructor(
    @Inject(TODO_READ_OUTBOUND_PORT)
    private readonly todoReadOutbountPort: TodoReadOutboundPort,
  ) {}

  async read(
    params: TodoReadInboundPortInputDto,
  ): Promise<TodoReadInboundPortOutputDto> {
    return this.todoReadOutbountPort.read(params);
  }
}
