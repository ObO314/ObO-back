import { filter, head, map, pipe, toAsync } from '@fxts/core';
import {
  WorkDeleteInboundPort,
  WorkDeleteInboundPortInputDto,
  WorkDeleteInboundPortOutputDto,
} from '../inbound-port/work.delete.inbound-port';
import {
  WORK_READ_OUTBOUND_PORT,
  WorkReadOutboundPort,
} from '../outbound-port/work.read.outbound-port';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import {
  WORK_DELETE_OUTBOUND_PORT,
  WorkDeleteOutboundPort,
} from '../outbound-port/work.delete.outbound-port';
import {
  WORK_FIND_MEMBER_OUTBOUND_PORT,
  WorkFindMemberOutboundPort,
} from '../outbound-port/work.find-member.outbound-port';

export class WorkDeleteService implements WorkDeleteInboundPort {
  constructor(
    @Inject(WORK_READ_OUTBOUND_PORT)
    private readonly workReadOutboundPort: WorkReadOutboundPort,
    @Inject(WORK_FIND_MEMBER_OUTBOUND_PORT)
    private readonly workFindMemberOutboundPort: WorkFindMemberOutboundPort,
    @Inject(WORK_DELETE_OUTBOUND_PORT)
    private readonly workDeleteOutboundPort: WorkDeleteOutboundPort,
  ) {}

  async execute(
    params: WorkDeleteInboundPortInputDto,
  ): Promise<WorkDeleteInboundPortOutputDto> {
    return await pipe(
      [params],
      toAsync,
      filter(async (params) => {
        const work = await this.workReadOutboundPort.execute({
          workId: params.workId,
        });
        if (
          work.creator.id == params.userId ||
          Number(
            (
              await this.workFindMemberOutboundPort.execute({
                userId: work.creator.id,
                circleId: params.circleId,
              })
            ).grade.id,
          ) <
            Number(
              (
                await this.workFindMemberOutboundPort.execute({
                  userId: params.userId,
                  circleId: params.circleId,
                })
              ).grade.id,
            )
        ) {
          return true;
        } else {
          throw new HttpException(
            '삭제할 수 있는 권한이 없습니다.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      map((params) => this.workDeleteOutboundPort.execute(params)),
      head,
    );
  }
}
