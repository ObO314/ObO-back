import {
  TodoUpdateInboundPortOutputDto,
  TodoUpdateInboundPortInputDto,
} from './../inbound-port/todo.update.inbound-port';
import { TodoUpdateInboundPort } from '../inbound-port/todo.update.inbound-port';
import {
  TODO_UPDATE_OUTBOUND_PORT,
  TodoUpdateOutboundPort,
} from '../outbound-port/todo.update.outbound-port';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { TODO_READ_OUTBOUND_PORT } from '../outbound-port/todo.read.outbound-port';
import { TodoReadInboundPort } from '../inbound-port/todo.read.inbound-port';
import { filter, head, map, pipe, toAsync } from '@fxts/core';

export class TodoUpdateService implements TodoUpdateInboundPort {
  constructor(
    @Inject(TODO_READ_OUTBOUND_PORT)
    private readonly todoReadByDateOutboundPort: TodoReadInboundPort,
    @Inject(TODO_UPDATE_OUTBOUND_PORT)
    private readonly todoUpdateOutboundPort: TodoUpdateOutboundPort,
  ) {}
  async execute(
    params: TodoUpdateInboundPortInputDto,
  ): Promise<TodoUpdateInboundPortOutputDto> {
    return await pipe(
      [params],
      toAsync,
      filter(async (params) => {
        if (
          await this.todoReadByDateOutboundPort.execute({
            todoId: params.todoId,
            userId: params.userId,
          })
        ) {
          return true;
        } else {
          throw new HttpException(
            '수정 권한이 없습니다.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      map((params) => this.todoUpdateOutboundPort.execute(params)),
      head,
    );
  }
}
