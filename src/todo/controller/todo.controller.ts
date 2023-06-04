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
import {
  TODO_DELETE_INBOUND_PORT,
  TodoDeleteINboundPort,
  TodoDeleteInboundPortInputDto,
} from '../inbound-port/todo.delete.inbound-port';
import { TodoUpdateInboundPortInputDto } from '../inbound-port/todo.update.inbound-port';
import {
  TODO_READ_BY_DATE_INBOUND_PORT,
  TodoReadByDateInboundPort,
  TodoReadByDateInboundPortInputDto,
} from '../inbound-port/todo.read-by-date.inbound-port';
import { AuthJwtGuard } from 'src/auth/guard/auth.jwt.guard';
import { Request } from 'express';
import {
  TODO_READ_BY_TODO_ID_INBOUND_PORT,
  TodoReadByTodoIdInboundPort,
  TodoReadByTodoIdInboundPortInputDto,
} from '../inbound-port/todo.read-by-todoId.inbound-port';

@UseGuards(AuthJwtGuard)
@Controller('todo')
export class TodoController {
  constructor(
    @Inject(TODO_CREATE_INBOUND_PORT)
    private readonly todoCreateInboundPort: TodoCreateInboundPort,
    @Inject(TODO_DELETE_INBOUND_PORT)
    private readonly todoDeleteInboundPort: TodoDeleteINboundPort,
    @Inject(TODO_UPDATE_INBOUND_PORT)
    private readonly todoUpdateInboundPort: TodoUpdateInboundPort,
    @Inject(TODO_READ_BY_DATE_INBOUND_PORT)
    private readonly todoReadByDateInboundPort: TodoReadByDateInboundPort,
    @Inject(TODO_READ_BY_TODO_ID_INBOUND_PORT)
    private readonly todoReadByTodoIdInboundPort: TodoReadByTodoIdInboundPort,
  ) {}

  @Post('create')
  async create(@Req() req: Request, @Body() body: any) {
    const params: TodoCreateInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return this.todoCreateInboundPort.create(params);
  }

  @Get('readByDate')
  async readBydate(@Req() req: Request, @Body() body: any) {
    const params: TodoReadByDateInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return this.todoReadByDateInboundPort.readByDate(params);
  }

  @Get('readByTodoId')
  async readByTodoId(@Req() req: Request, @Body() body: any) {
    const params: TodoReadByTodoIdInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return this.todoReadByTodoIdInboundPort.readByTodoId(params);
  }

  @Patch('update')
  async update(@Req() req: Request, @Body() body: any) {
    const params: TodoUpdateInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return this.todoUpdateInboundPort.update(params);
  }

  @Delete('delete')
  async detete(@Req() req: Request, @Body() body: any) {
    const params: TodoDeleteInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return this.todoDeleteInboundPort.delete(params);
  }
}
