import { Inject } from '@nestjs/common';
import {
  RoutineCreateInboundPort,
  RoutineCreateInboundPortOutputDto,
  RoutineCreateInboundPortInputDto,
} from '../inbound-port/routine.create.inbound-port';
import {
  ROUTINE_CREATE_OUTBOUND_PORT,
  RoutineCreateOutboundPort,
} from '../outbound-port/routine.create.outbound-port';
import {
  ROUTINE_CREATE_HISTORY_OUTBOUND_PORT,
  RoutineCreateHistoryOutboundPort,
} from '../outbound-port/routine.create-history.outbound-port';
import { generateDate } from 'src/utilities/generateDate';
import { head, map, pipe, tap, toAsync } from '@fxts/core';

export class RoutineCreateService implements RoutineCreateInboundPort {
  constructor(
    @Inject(ROUTINE_CREATE_OUTBOUND_PORT)
    private readonly routineCreateOutboundPort: RoutineCreateOutboundPort,
    @Inject(ROUTINE_CREATE_HISTORY_OUTBOUND_PORT)
    private readonly routineCreateHistoryOutboundPort: RoutineCreateHistoryOutboundPort,
  ) {}

  async execute(
    params: RoutineCreateInboundPortInputDto,
  ): Promise<RoutineCreateInboundPortOutputDto> {
    return await pipe(
      [params],
      toAsync,
      map(async (params) => {
        const newRoutine = await this.routineCreateOutboundPort.execute({
          user: params.userId,
          name: params.name,
          description: params.description,
        });
        return {
          ...newRoutine,
          ...params,
        };
      }),
      map(async (createdRoutine) => {
        const result = await this.routineCreateHistoryOutboundPort.execute({
          routine: createdRoutine.id,
          updatedAt: generateDate(),
          startTime: createdRoutine.startTime,
          endTime: createdRoutine.endTime,
          user: createdRoutine.userId,
          isActive: true,
        });
        return {
          userId: createdRoutine.userId,
          routineId: result.routine.id,
          name: createdRoutine.name,
          description: createdRoutine.description,
          startTime: result.startTime,
          endTime: result.endTime,
          isActive: result.isActive,
        };
      }),
      head,
    );
  }
}
