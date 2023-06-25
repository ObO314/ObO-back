import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './../user/user.module';
import { Todos } from 'database/entities/Todos';
import { TodoController } from './controller/todo.controller';
import { TodoRepository } from './outbound-adapter/todo.repository';
import { TodoCreateService } from './service/todo.create.service';
import { TODO_CREATE_INBOUND_PORT } from './inbound-port/todo.create.inbound-port';
import { TODO_CREATE_OUTBOUND_PORT } from './outbound-port/todo.create.outbound-port';
import { TodoDeleteService } from './service/todo.delete.service';
import { TODO_DELETE_OUTBOUND_PORT } from './outbound-port/todo.delete.outbound-port';
import { TODO_DELETE_INBOUND_PORT } from './inbound-port/todo.delete.inbound-port';
import { TodoUpdateService } from './service/todo.update.service';
import { TODO_UPDATE_INBOUND_PORT } from './inbound-port/todo.update.inbound-port';
import { TODO_UPDATE_OUTBOUND_PORT } from './outbound-port/todo.update.outbound-port';
import { TODO_READ_BY_DATE_INBOUND_PORT } from './inbound-port/todo.read-by-date.inbound-port';
import { TodoReadByDateService } from './service/todo.read-by-date.service';
import { TODO_READ_BY_DATE_OUTBOUND_PORT } from './outbound-port/todo.read-by-date.outbound-port';
import { TodoReadByTodoIdService } from './service/todo.read-by-todo-id.service';
import { TODO_READ_BY_TODO_ID_INBOUND_PORT } from './inbound-port/todo.read-by-todoId.inbound-port';
import { TODO_READ_BY_TODO_ID_OUTBOUND_PORT } from './outbound-port/todo.read-by-todo-id.outbound-port';

@Module({
  imports: [PassportModule],
  controllers: [TodoController],
  providers: [
    {
      provide: TODO_CREATE_INBOUND_PORT,
      useClass: TodoCreateService,
    },
    {
      provide: TODO_CREATE_OUTBOUND_PORT,
      useClass: TodoRepository,
    },
    {
      provide: TODO_DELETE_INBOUND_PORT,
      useClass: TodoDeleteService,
    },
    {
      provide: TODO_DELETE_OUTBOUND_PORT,
      useClass: TodoRepository,
    },
    {
      provide: TODO_UPDATE_INBOUND_PORT,
      useClass: TodoUpdateService,
    },
    {
      provide: TODO_UPDATE_OUTBOUND_PORT,
      useClass: TodoRepository,
    },
    {
      provide: TODO_READ_BY_DATE_INBOUND_PORT,
      useClass: TodoReadByDateService,
    },
    {
      provide: TODO_READ_BY_DATE_OUTBOUND_PORT,
      useClass: TodoRepository,
    },
    {
      provide: TODO_READ_BY_TODO_ID_INBOUND_PORT,
      useClass: TodoReadByTodoIdService,
    },
    {
      provide: TODO_READ_BY_TODO_ID_OUTBOUND_PORT,
      useClass: TodoRepository,
    },
  ],
})
export class TodoModule {}
