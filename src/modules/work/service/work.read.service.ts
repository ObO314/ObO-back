import { filter, head, map, pipe, toAsync } from '@fxts/core';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import {
  WORK_READ_OUTBOUND_PORT,
  WorkReadOutboundPort,
} from '../outbound-port/work.read.outbound-port';
import {
  WorkReadInboundPort,
  WorkReadInboundPortInputDto,
  WorkReadInboundPortOutputDto,
} from '../inbound-port/work.read.inbound-port';
import {
  WORK_FIND_MEMBER_OUTBOUND_PORT,
  WorkFindMemberOutboundPort,
} from '../outbound-port/work.find-member.outbound-port';
import {
  WORK_READ_BY_DATE_OUTBOUND_PORT,
  WorkReadByDateOutboundPort,
} from '../outbound-port/work.read-by-date.outbound-port';

export class WorkReadService implements WorkReadInboundPort {
  constructor(
    @Inject(WORK_FIND_MEMBER_OUTBOUND_PORT)
    private readonly workFindMemberOutboundPort: WorkFindMemberOutboundPort,
    @Inject(WORK_READ_BY_DATE_OUTBOUND_PORT)
    private readonly workReadByDateOutboundPort: WorkReadByDateOutboundPort,
  ) {}

  async execute(
    params: WorkReadInboundPortInputDto,
  ): Promise<WorkReadInboundPortOutputDto> {
    return await pipe(
      [params],
      toAsync,
      filter(async (params) => {
        if (
          await this.workFindMemberOutboundPort.execute({
            circleId: params.circleId,
            userId: params.userId,
          })
        ) {
          return true;
        } else {
          throw new HttpException(
            '조회할 수 있는 권한이 없습니다.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      map((params) => this.workReadByDateOutboundPort.execute(params)),
      head,
    );
  }
}
