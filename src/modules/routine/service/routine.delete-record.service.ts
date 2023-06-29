import { Inject } from '@nestjs/common';
import {
  RoutineDeleteRecordInboundPort,
  RoutineDeleteRecordInboundPortInputDto,
  RoutineDeleteRecordInboundPortOutputDto,
} from '../inbound-port/routine.delete-record.inbound-port';
import {
  ROUTINE_DELETE_RECORD_OUTBOUND_PORT,
  RoutineDeleteRecordOutboundPort,
} from '../outbound-port/routine.delete-record.outbound-port';
import {
  ROUTINE_READ_OUTBOUND_PORT,
  RoutineReadOutboundPort,
} from '../outbound-port/routine.read.outbound-port';
import { filter, head, map, pipe, toAsync } from '@fxts/core';

export class RoutineDeleteRecordService
  implements RoutineDeleteRecordInboundPort
{
  constructor(
    @Inject(ROUTINE_READ_OUTBOUND_PORT)
    private readonly routineReadOutboundPort: RoutineReadOutboundPort,
    @Inject(ROUTINE_DELETE_RECORD_OUTBOUND_PORT)
    private readonly routineDeleteRecordOutboundPort: RoutineDeleteRecordOutboundPort,
  ) {}

  async execute(
    params: RoutineDeleteRecordInboundPortInputDto,
  ): Promise<RoutineDeleteRecordInboundPortOutputDto> {
    return await pipe(
      [params],
      toAsync,
      filter((params) => {
        return this.routineReadOutboundPort.execute({
          userId: params.userId,
          routineId: params.routineId,
        });
      }),
      map((foundRoutine) => {
        return this.routineDeleteRecordOutboundPort.execute({
          routineId: foundRoutine.routineId,
          date: foundRoutine.date,
        });
      }),
      head,
    );
  }
}
