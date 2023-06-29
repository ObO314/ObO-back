import { Inject } from '@nestjs/common';
import {
  RoutineCreateRecordInboundPort,
  RoutineCreateRecordInboundPortInputDto,
  RoutineCreateRecordInboundPortOutputDto,
} from '../inbound-port/routine.create-record.inbound-port';
import {
  ROUTINE_CREATE_RECORD_OUTBOUND_PORT,
  RoutineCreateRecordOutboundPort,
} from '../outbound-port/routine.create-record.outbound-port';
import { filter, head, map, pipe, toAsync } from '@fxts/core';
import {
  ROUTINE_READ_OUTBOUND_PORT,
  RoutineReadOutboundPort,
} from '../outbound-port/routine.read.outbound-port';

export class RoutineCreateRecordService
  implements RoutineCreateRecordInboundPort
{
  constructor(
    @Inject(ROUTINE_READ_OUTBOUND_PORT)
    private readonly routineReadOutboundPort: RoutineReadOutboundPort,
    @Inject(ROUTINE_CREATE_RECORD_OUTBOUND_PORT)
    private readonly routineCreateRecordOutboundPort: RoutineCreateRecordOutboundPort,
  ) {}
  async execute(
    params: RoutineCreateRecordInboundPortInputDto,
  ): Promise<RoutineCreateRecordInboundPortOutputDto> {
    // 유저와 루틴 검증 후
    // 히스토리를 생성한다
    return await pipe(
      [params],
      toAsync,
      filter((params) =>
        this.routineReadOutboundPort.execute({
          userId: params.userId,
          routineId: params.routineId,
        }),
      ),
      map((foundRoutine) =>
        this.routineCreateRecordOutboundPort.execute({
          routineId: foundRoutine.routineId,
          date: foundRoutine.date,
        }),
      ),
      head,
    );
  }
}
