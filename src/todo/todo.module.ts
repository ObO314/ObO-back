import { UserModule } from './../user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Todos } from 'src/database/entities/Todos';
import { TodoController } from './controller/todo.controller';
import { TODO_CREATE_INBOUND_PORT } from './inbound-port/todo.create.inbound-port';
import { TodoRepository } from './outbound-adaptor/todo.repository';
import { TODO_CREATE_OUTBOUND_PORT } from './outbound-port/todo.create.outbound-port';
import { TodoCreateService } from './service/todo.create.service';
import { TODO_DELETE_OUTBOUND_PORT } from './outbound-port/todo.delete.outbound-port';
import { TodoDeleteService } from './service/todo.delete.service';
import { TODO_DELETE_INBOUND_PORT } from './inbound-port/todo.delete.inbound-port';

@Module({
  imports: [MikroOrmModule.forFeature([Todos]), UserModule],
  controllers: [TodoController],
  providers: [
    UserModule,
    PassportModule,
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
  ],
})
export class TodoModule {}
