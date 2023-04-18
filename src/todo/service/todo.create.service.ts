import {
  TodoCreateOutboundPort,
  TODO_CREATE_OUTBOUND_PORT,
} from './../outbound-port/todo.create.outbound-port';
import { Inject } from '@nestjs/common';
import {
  TodoCreateInboundPort,
  TodoCreateInboundPortInputDto,
  TodoCreateInboundPortOutputDto,
} from './../inbound-port/todo.create.inbound-port';

export class TodoCreateService implements TodoCreateInboundPort {
  constructor(
    @Inject(TODO_CREATE_OUTBOUND_PORT)
    private readonly todoCreateOutboundPort: TodoCreateOutboundPort,
  ) {}

  async create(
    params: TodoCreateInboundPortInputDto,
  ): Promise<TodoCreateInboundPortOutputDto> {
    return await this.todoCreateOutboundPort.create(params);
  }
}
