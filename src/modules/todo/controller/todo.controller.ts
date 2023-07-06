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
  Query,
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
import { AuthJwtGuard } from 'src/modules/auth/guard/auth.jwt.guard';
import { Request, query } from 'express';
import {
  TODO_READ_INBOUND_PORT,
  TodoReadInboundPort,
  TodoReadInboundPortInputDto,
} from '../inbound-port/todo.read.inbound-port';

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
    @Inject(TODO_READ_INBOUND_PORT)
    private readonly todoReadByTodoIdInboundPort: TodoReadInboundPort,
  ) {}

  @Post('create')
  async create(@Req() req: Request, @Body() body: any) {
    const params: TodoCreateInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return this.todoCreateInboundPort.execute(params);
  }

  @Get('readByDate')
  async readBydate(@Req() req: Request, @Query() query: any) {
    const params: TodoReadByDateInboundPortInputDto = {
      userId: req.user,
      ...query,
    };
    return this.todoReadByDateInboundPort.execute(params);
  }

  @Get('read')
  async read(@Req() req: Request, @Query() query: any) {
    const params: TodoReadInboundPortInputDto = {
      userId: req.user,
      ...query,
    };
    return this.todoReadByTodoIdInboundPort.execute(params);
  }

  @Patch('update')
  async update(@Req() req: Request, @Body() body: any) {
    const params: TodoUpdateInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return this.todoUpdateInboundPort.execute(params);
  }

  @Delete('delete')
  async detete(@Req() req: Request, @Body() body: any) {
    const params: TodoDeleteInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return this.todoDeleteInboundPort.execute(params);
  }
}
