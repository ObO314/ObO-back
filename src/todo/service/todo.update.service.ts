import {
  TodoUpdateInboundPortOutputDto,
  TodoUpdateInboundPortInputDto,
} from './../inbound-port/todo.update.inbound-port';
import { TodoUpdateInboundPort } from '../inbound-port/todo.update.inbound-port';
import {
  TODO_UPDATE_OUTBOUND_PORT,
  TodoUpdateOutboundPort,
} from '../outbound-port/todo.update.outbound-port';
import { Inject } from '@nestjs/common';

export class TodoUpdateService implements TodoUpdateInboundPort {
  constructor(
    @Inject(TODO_UPDATE_OUTBOUND_PORT)
    private readonly todoUpdateOutboundPort: TodoUpdateOutboundPort,
  ) {}
  update(
    params: TodoUpdateInboundPortInputDto,
  ): Promise<TodoUpdateInboundPortOutputDto> {
    return this.todoUpdateOutboundPort.update(params);
  }
}
