import { Works } from 'src/database/entities/Works';
import { filter, head, map, pipe, toAsync } from '@fxts/core';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import {
  WorkCreateRecordInboundPort,
  WorkCreateRecordInboundPortInputDto,
  WorkCreateRecordInboundPortOutputDto,
} from '../inbound-port/work.create-record.inbound-port';
import { WorkRecords } from 'src/database/entities/WorkRecords';
import {
  WORK_CREATE_RECORD_OUTBOUND_PORT,
  WorkCreateRecordOutboundPort,
} from '../outbound-port/work.create-record.outbound-port';
import {
  WORK_FIND_MEMBER_OUTBOUND_PORT,
  WorkFindMemberOutboundPort,
} from '../outbound-port/work.find-member.outbound-port';

export class WorkCreateRecordService implements WorkCreateRecordInboundPort {
  constructor(
    @Inject(WORK_CREATE_RECORD_OUTBOUND_PORT)
    private readonly workCreateRecordOutboundPort: WorkCreateRecordOutboundPort,
    @Inject(WORK_FIND_MEMBER_OUTBOUND_PORT)
    private readonly workFindMemberOutboundPort: WorkFindMemberOutboundPort,
  ) {}
  async execute(
    params: WorkCreateRecordInboundPortInputDto,
  ): Promise<WorkCreateRecordInboundPortOutputDto> {
    return await pipe(
      [params],
      toAsync,
      filter(async (params) => {
        if (await this.workFindMemberOutboundPort.execute(params)) {
          return true;
        } else {
          throw new HttpException(
            '해당 서클에 소속되지 않았습니다.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      map((params) => this.workCreateRecordOutboundPort.execute(params)),
      head,
    );
  }
}
