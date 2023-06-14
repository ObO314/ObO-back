import { Entity, EntityName } from '@mikro-orm/core';
import {
  TodoUpdateOutboundPort,
  TodoUpdateOutboundPortOutputDto,
} from '../outbound-port/todo.update.outbound-port';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/knex';

import {
  TodoCreateOutboundPort,
  TodoCreateOutboundPortInputDto,
  TodoCreateOutboundPortOutputDto,
} from '../outbound-port/todo.create.outbound-port';
import { Todos } from 'src/database/entities/Todos';
import {
  TodoDeleteOutboundPort,
  TodoDeleteOutboundPortInputDto,
  TodoDeleteOutboundPortOutputDto,
} from '../outbound-port/todo.delete.outbound-port';
import { Injectable } from '@nestjs/common';
import { TodoUpdateOutboundPortInputDto } from '../outbound-port/todo.update.outbound-port';
import { Users } from 'src/database/entities/Users';
import {
  TodoReadByDateOutboundPort,
  TodoReadByDateOutboundPortInputDto,
  TodoReadByDateOutboundPortOutputDto,
} from '../outbound-port/todo.read-by-date.outbound-port';
import {
  TodoReadByTodoIdOutboundPortInputDto,
  TodoReadByTodoIdOutboundPortOutputDto,
} from '../outbound-port/todo.read-by-todo-id.outbound-port';
import { curry, pipe, tap, filter } from '@fxts/core';
import {
  receiveEntityPersistAndFlush,
  receiveParamsCreateEntity,
  receiveParamsDeleteEntity,
  receiveParamsFindEntity,
  receiveParamsFindOneEntity,
  receiveParamsFindProp,
  receiveParamsUpsertEntity,
} from 'src/utilities/useEntityManager';

@Injectable()
export class TodoRepository
  implements
    TodoCreateOutboundPort,
    TodoDeleteOutboundPort,
    TodoUpdateOutboundPort,
    TodoReadByDateOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  // 할 일 생성하기
  async create(
    params: TodoCreateOutboundPortInputDto,
  ): Promise<TodoCreateOutboundPortOutputDto> {
    const em = this.em;
    return await pipe(
      params,
      receiveParamsFindProp('userId', Users, em),
      receiveParamsCreateEntity(Todos, em),
      receiveEntityPersistAndFlush(em),
    );
  }

  async readByDate(
    params: TodoReadByDateOutboundPortInputDto,
  ): Promise<TodoReadByDateOutboundPortOutputDto> {
    // 불러올 날짜의 시작지점, 끝지점을 받아서 그 사이에 있는 투두를 모두 받아옴
    const em = this.em;

    const condition = {
      ...params,
      startTime: { $gte: params.startTime, $lte: params.endTime },
      endTime: { $gte: params.startTime, $lte: params.endTime },
    };

    return await pipe(
      condition,
      receiveParamsFindProp('userId', Users, em),
      receiveParamsFindEntity(Todos, em),
    );
  }

  async readByTodoId(
    params: TodoReadByTodoIdOutboundPortInputDto,
  ): Promise<TodoReadByTodoIdOutboundPortOutputDto> {
    const em = this.em;

    return pipe(
      params,
      receiveParamsFindProp('userId', Users, em),
      receiveParamsFindOneEntity(Todos, em),
    );
  }

  // 유저와 할 일을 특정하여, 최신 정보를 업데이트 함
  async update(
    params: TodoUpdateOutboundPortInputDto,
  ): Promise<TodoUpdateOutboundPortOutputDto> {
    const em = this.em;
    return await pipe(
      params,
      receiveParamsFindProp('userId', Users, em),
      receiveParamsFindProp('TodoId', Todos, em),
      receiveParamsUpsertEntity(Todos, em),
      receiveEntityPersistAndFlush(em),
    );
  }

  // 유저와 할일을 특정하여 삭제함
  async delete(
    params: TodoDeleteOutboundPortInputDto,
  ): Promise<TodoDeleteOutboundPortOutputDto> {
    const em = this.em;
    return pipe(
      params,
      receiveParamsFindProp('userId', Users, em),
      receiveParamsFindOneEntity(Todos, em),
      receiveParamsDeleteEntity(em),
    );
  }
}
