import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './../user/user.module';
import { Todos } from 'src/database/entities/Todos';
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
import { Users } from 'src/database/entities/Users';
import { TODO_READ_INBOUND_PORT } from './inbound-port/todo.read.inbound-port';
import { TodoReadService } from './service/todo.read.service';
import { TODO_READ_OUTBOUND_PORT } from './outbound-port/todo.read.outbound-port';

@Module({
  imports: [
    MikroOrmModule.forFeature([Todos, Users]),
    UserModule,
    PassportModule,
  ],
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
      provide: TODO_READ_INBOUND_PORT,
      useClass: TodoReadService,
    },
    {
      provide: TODO_READ_OUTBOUND_PORT,
      useClass: TodoRepository,
    },
  ],
})
export class TodoModule {}
