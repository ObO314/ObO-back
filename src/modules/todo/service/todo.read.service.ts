import { Inject } from '@nestjs/common';
import {
  TodoReadInboundPort,
  TodoReadInboundPortInputDto,
  TodoReadInboundPortOutputDto,
} from '../inbound-port/todo.read.inbound-port';
import { TODO_READ_OUTBOUND_PORT } from '../outbound-port/todo.read.outbound-port';

export class TodoReadService implements TodoReadInboundPort {
  constructor(
    @Inject(TODO_READ_OUTBOUND_PORT)
    private readonly todoReadByDateOutboundPort: TodoReadInboundPort,
  ) {}

  async execute(
    params: TodoReadInboundPortInputDto,
  ): Promise<TodoReadInboundPortOutputDto> {
    return await this.todoReadByDateOutboundPort.execute(params);
  }
}
