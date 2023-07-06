import { filter, head, map, pipe, toArray, toAsync } from '@fxts/core';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import {
  WORK_FIND_MEMBER_OUTBOUND_PORT,
  WorkFindMemberOutboundPort,
} from '../outbound-port/work.find-member.outbound-port';
import {
  WORK_READ_BY_DATE_OUTBOUND_PORT,
  WorkReadByDateOutboundPort,
} from '../outbound-port/work.read-by-date.outbound-port';
import {
  WorkReadByDateInboundPort,
  WorkReadByDateInboundPortInputDto,
  WorkReadByDateInboundPortOutputDto,
} from '../inbound-port/work.read-by-date.inbound-port';
import {
  WORK_READ_RECORD_OUTBOUND_PORT,
  WorkReadRecordOutboundPort,
} from '../outbound-port/work.read-record.outbound-port';
import {
  WORK_READ_RECORDS_OUTBOUND_PORT,
  WorkReadRecordsOutboundPort,
} from '../outbound-port/work.read-records.outbound-port';

export class WorkReadByDateService implements WorkReadByDateInboundPort {
  constructor(
    @Inject(WORK_FIND_MEMBER_OUTBOUND_PORT)
    private readonly workFindMemberOutboundPort: WorkFindMemberOutboundPort,
    @Inject(WORK_READ_BY_DATE_OUTBOUND_PORT)
    private readonly workReadByDateOutboundPort: WorkReadByDateOutboundPort,
    @Inject(WORK_READ_RECORD_OUTBOUND_PORT)
    private readonly workReadRecordOutboundPort: WorkReadRecordOutboundPort,
    @Inject(WORK_READ_RECORDS_OUTBOUND_PORT)
    private readonly workReadRecordsOutboundPort: WorkReadRecordsOutboundPort,
  ) {}

  async execute(
    params: WorkReadByDateInboundPortInputDto,
  ): Promise<WorkReadByDateInboundPortOutputDto> {
    const works = await pipe(
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

    return await pipe(
      works,
      toAsync,
      map(async (work) => {
        console.log(
          await this.workReadRecordsOutboundPort.execute({
            workId: work.id,
            circleId: work.circle.id,
          }),
        );
        console.log(work.targets);
        return {
          ...work,
          progress: (
            Number(
              await this.workReadRecordsOutboundPort.execute({
                workId: work.id,
                circleId: work.circle.id,
              }),
            ) / Number(work.targets)
          ).toFixed(3),
          done: !!(await this.workReadRecordOutboundPort.execute({
            circleId: work.circle.id,
            workId: work.id,
            userId: params.userId,
          })),
        };
      }),
      toArray,
    );
  }
}
