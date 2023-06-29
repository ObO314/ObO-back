import { generateDate } from 'src/utilities/generateDate';
import {
  RoutineDeleteInboundPort,
  RoutineDeleteInboundPortInputDto,
  RoutineDeleteInboundPortOutputDto,
} from '../inbound-port/routine.delete.inbound-port';
import {
  ROUTINE_CREATE_HISTORY_OUTBOUND_PORT,
  RoutineCreateHistoryOutboundPort,
  RoutineCreateHistoryOutboundPortInputDto,
} from '../outbound-port/routine.create-history.outbound-port';
import {
  ROUTINE_READ_HISTORY_OUTBOUND_PORT,
  RoutineReadHistoryOutboundPort,
} from '../outbound-port/routine.read-history.outbound-port';
import { Inject } from '@nestjs/common';
import {
  ROUTINE_READ_OUTBOUND_PORT,
  RoutineReadOutboundPort,
} from '../outbound-port/routine.read.outbound-port';
import { filter, head, map, pipe, toAsync } from '@fxts/core';

export class RoutineDeleteService implements RoutineDeleteInboundPort {
  constructor(
    @Inject(ROUTINE_READ_OUTBOUND_PORT)
    private readonly routineReadOutboundPort: RoutineReadOutboundPort,
    @Inject(ROUTINE_READ_HISTORY_OUTBOUND_PORT)
    private readonly routineReadHistoryOutboundPort: RoutineReadHistoryOutboundPort,
    @Inject(ROUTINE_CREATE_HISTORY_OUTBOUND_PORT)
    private readonly routineCreateHistoryOutboundPort: RoutineCreateHistoryOutboundPort,
  ) {}

  async execute(
    params: RoutineDeleteInboundPortInputDto,
  ): Promise<RoutineDeleteInboundPortOutputDto> {
    //
    const today = generateDate();
    return await pipe(
      [{ ...params, today }],
      toAsync,
      filter((a) =>
        this.routineReadOutboundPort.execute({
          userId: a.userId,
          routineId: a.routineId,
        }),
      ),
      map((b) => {
        return this.routineReadHistoryOutboundPort.execute({
          routineId: b.routineId,
          date: b.today,
        });
      }),
      map((c) => {
        return this.routineCreateHistoryOutboundPort.execute({
          user: c.user.id,
          routine: c.routine.id,
          startTime: c.startTime,
          endTime: c.endTime,
          updatedAt: today,
          isActive: false, // 삭제 대신 비활성화
        });
      }),
      head,
    );
  }
}
