import { Module } from '@nestjs/common';
import { TodoController } from './controller/todo.controller';
import { TODO_CREATE_INBOUND_PORT } from './inbound-port/todo.create.inbound-port';
import { TODO_DELETE_INBOUND_PORT } from './inbound-port/todo.delete.inbound-port';
import { TODO_READ_BY_DATE_INBOUND_PORT } from './inbound-port/todo.read-by-date.inbound-port';
import { TODO_READ_INBOUND_PORT } from './inbound-port/todo.read.inbound-port';
import { TODO_UPDATE_INBOUND_PORT } from './inbound-port/todo.update.inbound-port';
import { TODO_DELETE_OUTBOUND_PORT } from './outbound-port/todo.delete.outbound-port';
import { TODO_UPDATE_OUTBOUND_PORT } from './outbound-port/todo.update.outbound-port';
import { TODO_READ_OUTBOUND_PORT } from './outbound-port/todo.read.outbound-port';
import { TODO_READ_BY_DATE_OUTBOUND_PORT } from './outbound-port/todo.read-by-date.outbound-port';
import { TODO_CREATE_OUTBOUND_PORT } from './outbound-port/todo.create.outbound-port';
import { TodoCreateService } from './service/todo.create.service';
import { TodoDeleteService } from './service/todo.delete.service';
import { TodoReadByDateService } from './service/todo.read-by-date.service';
import { TodoReadService } from './service/todo.read.service';
import { TodoUpdateService } from './service/todo.update.service';
import { TodoCreateRepository } from './outbound-adapter/todo.create.repository';
import { TodoDeleteRepository } from './outbound-adapter/todo.delete.repository';
import { TodoReadRepository } from './outbound-adapter/todo.read.repository';
import { TodoReadByDateRepository } from './outbound-adapter/todo.read-by-date.repository';
import { TodoUpdateRepository } from './outbound-adapter/todo.update.repository';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [
    {
      provide: TODO_CREATE_INBOUND_PORT,
      useClass: TodoCreateService,
    },
    {
      provide: TODO_DELETE_INBOUND_PORT,
      useClass: TodoDeleteService,
    },
    {
      provide: TODO_READ_BY_DATE_INBOUND_PORT,
      useClass: TodoReadByDateService,
    },
    {
      provide: TODO_READ_INBOUND_PORT,
      useClass: TodoReadService,
    },
    {
      provide: TODO_UPDATE_INBOUND_PORT,
      useClass: TodoUpdateService,
    },

    // --- outbound ---
    {
      provide: TODO_CREATE_OUTBOUND_PORT,
      useClass: TodoCreateRepository,
    },
    {
      provide: TODO_DELETE_OUTBOUND_PORT,
      useClass: TodoDeleteRepository,
    },
    {
      provide: TODO_READ_BY_DATE_OUTBOUND_PORT,
      useClass: TodoReadByDateRepository,
    },
    {
      provide: TODO_READ_OUTBOUND_PORT,
      useClass: TodoReadRepository,
    },
    {
      provide: TODO_UPDATE_OUTBOUND_PORT,
      useClass: TodoUpdateRepository,
    },
  ],
})
export class TodoModule {}
