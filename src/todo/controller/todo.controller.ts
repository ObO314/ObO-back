import {
  TodoCreateInboundPort,
  TodoCreateInboundPortInputDto,
  TODO_CREATE_INBOUND_PORT,
} from './../inbound-port/todo.create.inbound-port';
import {
  Controller,
  Inject,
  Body,
  Headers,
  Post,
  Res,
  Get,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  TODO_DELETE_INBOUND_PORT,
  TodoDeleteINboundPort,
  TodoDeleteInboundPortInputDto,
} from '../inbound-port/todo.delete.inbound-port';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(
    @Inject(TODO_CREATE_INBOUND_PORT)
    private readonly todoCreateInboundPort: TodoCreateInboundPort,
    @Inject(TODO_DELETE_INBOUND_PORT)
    private readonly todoDeleteInboundPort: TodoDeleteINboundPort,
  ) {}

  @Post('create')
  async create(
    @Body()
    todoCreateInboundPortInputDto: TodoCreateInboundPortInputDto,
  ) {
    return this.todoCreateInboundPort.create(todoCreateInboundPortInputDto);
  }

  @Delete('delete')
  async detete(
    @Body()
    todoDeleteInboundPortInputDto: TodoDeleteInboundPortInputDto,
  ) {
    return this.todoDeleteInboundPort.delete(todoDeleteInboundPortInputDto);
  }
}
