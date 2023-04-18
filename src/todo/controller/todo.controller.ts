import {
  TODO_UPDATE_INBOUND_PORT,
  TodoUpdateInboundPort,
} from './../inbound-port/todo.update.inbound-port';
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
  Put,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  TODO_DELETE_INBOUND_PORT,
  TodoDeleteINboundPort,
  TodoDeleteInboundPortInputDto,
} from '../inbound-port/todo.delete.inbound-port';
import { TodoUpdateInboundPortInputDto } from '../inbound-port/todo.update.inbound-port';
import {
  TODO_READ_INBOUND_PORT,
  TodoReadInboundPort,
  TodoReadInboundPortInputDto,
} from '../inbound-port/todo.read.inbound-port';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(
    @Inject(TODO_CREATE_INBOUND_PORT)
    private readonly todoCreateInboundPort: TodoCreateInboundPort,
    @Inject(TODO_DELETE_INBOUND_PORT)
    private readonly todoDeleteInboundPort: TodoDeleteINboundPort,
    @Inject(TODO_UPDATE_INBOUND_PORT)
    private readonly todoUpdateInboundPort: TodoUpdateInboundPort,
    @Inject(TODO_READ_INBOUND_PORT)
    private readonly todoReadInboundPort: TodoReadInboundPort,
  ) {}

  @Get('read')
  async read(
    @Body()
    todoReadInboundPortInputDto: TodoReadInboundPortInputDto,
  ) {
    return this.todoReadInboundPort.read(todoReadInboundPortInputDto);
  }

  @Post('create')
  async create(
    @Body()
    todoCreateInboundPortInputDto: TodoCreateInboundPortInputDto,
  ) {
    return this.todoCreateInboundPort.create(todoCreateInboundPortInputDto);
  }

  @Patch('update')
  async update(
    @Body()
    todoUpdateInboundPortInputDto: TodoUpdateInboundPortInputDto,
  ) {
    return this.todoUpdateInboundPort.update(todoUpdateInboundPortInputDto);
  }

  @Delete('delete')
  async detete(
    @Body()
    todoDeleteInboundPortInputDto: TodoDeleteInboundPortInputDto,
  ) {
    return this.todoDeleteInboundPort.delete(todoDeleteInboundPortInputDto);
  }
}
