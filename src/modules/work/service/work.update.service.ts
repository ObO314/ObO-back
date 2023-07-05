import { filter, head, map, pipe, toAsync } from '@fxts/core';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import {
  WORK_READ_OUTBOUND_PORT,
  WorkReadOutboundPort,
} from '../outbound-port/work.read.outbound-port';
import {
  WorkUpdateInboundPort,
  WorkUpdateInboundPortInputDto,
  WorkUpdateInboundPortOutputDto,
} from '../inbound-port/work.update.inbound-port';
import {
  WORK_UPDATE_OUTBOUND_PORT,
  WorkUpdateOutboundPort,
} from '../outbound-port/work.update.outbound-port';

export class WorkUpdateService implements WorkUpdateInboundPort {
  constructor(
    @Inject(WORK_READ_OUTBOUND_PORT)
    private readonly workReadInboundPort: WorkReadOutboundPort,
    @Inject(WORK_UPDATE_OUTBOUND_PORT)
    private readonly workUpdateOutboundPort: WorkUpdateOutboundPort,
  ) {}

  async execute(
    params: WorkUpdateInboundPortInputDto,
  ): Promise<WorkUpdateInboundPortOutputDto> {
    return await pipe(
      [params],
      toAsync,
      filter(async (params) => {
        if (
          (
            await this.workReadInboundPort.execute({
              workId: params.workId,
              circleId: params.circleId,
            })
          ).creator.id == params.userId
        ) {
          return true;
        } else {
          throw new HttpException(
            '수정할 수 있는 권한이 없습니다.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      map((params) => this.workUpdateOutboundPort.execute(params)),
      head,
    );
  }
}
