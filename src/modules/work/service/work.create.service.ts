import { Works } from 'src/database/entities/Works';
import {
  WorkCreateInboundPort,
  WorkCreateInboundPortInputDto,
  WorkCreateInboundPortOutputDto,
} from '../inbound-port/work.create.inbound-port';
import {
  WORK_CREATE_OUTBOUND_PORT,
  WorkCreateOutboundPort,
} from '../outbound-port/work.create.outbound-port';
import {
  WORK_FIND_MEMBER_OUTBOUND_PORT,
  WorkFindMemberOutboundPort,
} from '../outbound-port/work.find-member.outbound-port';
import { filter, head, map, pipe, toAsync } from '@fxts/core';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import {
  WORK_READ_CIRCLE_OUTBOUND_PORT,
  WorkReadCircleOutboundPort,
} from '../outbound-port/work.read-circle.outbound-port';

export class WorkCreateService implements WorkCreateInboundPort {
  constructor(
    @Inject(WORK_CREATE_OUTBOUND_PORT)
    private readonly workCreateOutboundPort: WorkCreateOutboundPort,
    @Inject(WORK_FIND_MEMBER_OUTBOUND_PORT)
    private readonly workFindMemberOutboundPort: WorkFindMemberOutboundPort,
    @Inject(WORK_READ_CIRCLE_OUTBOUND_PORT)
    private readonly workReadCircleOutboundPort: WorkReadCircleOutboundPort,
  ) {}

  async execute(
    params: WorkCreateInboundPortInputDto,
  ): Promise<WorkCreateInboundPortOutputDto> {
    return await pipe(
      [params],
      toAsync,
      filter(async (params) => {
        if (
          Number(
            (
              await this.workFindMemberOutboundPort.execute({
                circleId: params.circleId,
                userId: params.userId,
              })
            ).grade.id,
          ) <= 2
        ) {
          return true;
        } else {
          throw new HttpException(
            '작성할 수 있는 권한이 없습니다.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      map(async (params) => {
        return {
          ...params,
          targets: (
            await this.workReadCircleOutboundPort.execute({
              circleId: params.circleId,
            })
          ).members,
        };
      }),
      map((params) => this.workCreateOutboundPort.execute(params)),
      head,
    );
  }
}
