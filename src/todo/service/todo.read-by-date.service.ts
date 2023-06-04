import { Inject } from '@nestjs/common';
import {
  TodoReadByDateInboundPort,
  TodoReadByDateInboundPortInputDto,
  TodoReadByDateInboundPortOutputDto,
} from '../inbound-port/todo.read-by-date.inbound-port';
import {
  TODO_READ_BY_DATE_OUTBOUND_PORT,
  TodoReadByDateOutboundPort,
} from '../outbound-port/todo.read-by-date.outbound-port';

export class TodoReadByDateService implements TodoReadByDateInboundPort {
  constructor(
    @Inject(TODO_READ_BY_DATE_OUTBOUND_PORT)
    private readonly todoReadOutbountPort: TodoReadByDateOutboundPort,
  ) {}

  async readByDate(
    params: TodoReadByDateInboundPortInputDto,
  ): Promise<TodoReadByDateInboundPortOutputDto> {
    return this.todoReadOutbountPort.readByDate(params);
  }
}
