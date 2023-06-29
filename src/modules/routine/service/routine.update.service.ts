import { Inject } from '@nestjs/common';
import {
  RoutineUpdateInboundPort,
  RoutineUpdateInboundPortInputDto,
  RoutineUpdateInboundPortOutputDto,
} from '../inbound-port/routine.update.inbound-port';
import {
  ROUTINE_UPDATE_OUTBOUND_PORT,
  RoutineUpdateOutboundPort,
} from '../outbound-port/routine.update.outbound-port';
import {
  ROUTINE_READ_OUTBOUND_PORT,
  RoutineReadOutboundPort,
} from '../outbound-port/routine.read.outbound-port';
import { filter, head, map, pipe, toAsync } from '@fxts/core';

export class RoutineUpdateService implements RoutineUpdateInboundPort {
  constructor(
    @Inject(ROUTINE_READ_OUTBOUND_PORT)
    private readonly routineReadOutboundPort: RoutineReadOutboundPort,
    @Inject(ROUTINE_UPDATE_OUTBOUND_PORT)
    private readonly routineUpdateByIdOutboundPort: RoutineUpdateOutboundPort,
  ) {}

  async execute(
    params: RoutineUpdateInboundPortInputDto,
  ): Promise<RoutineUpdateInboundPortOutputDto> {
    return await pipe(
      [params],
      toAsync,
      filter((param) =>
        this.routineReadOutboundPort.execute({
          userId: param.userId,
          routineId: param.routineId,
        }),
      ),
      map((toUpdateRoutine) => {
        return this.routineUpdateByIdOutboundPort.execute(toUpdateRoutine);
      }),
      head,
    );
  }
}
