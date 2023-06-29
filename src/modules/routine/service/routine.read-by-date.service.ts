import { Inject } from '@nestjs/common';
import {
  RoutineReadByDateInboundPort,
  RoutineReadByDateInboundPortInputDto,
  RoutineReadByDateInboundPortOutputDto,
} from '../inbound-port/routine.read-by-date.inbound-port';
import {
  ROUTINE_READ_BY_DATE_OUTBOUND_PORT,
  RoutineReadByDateOutboundPort,
} from '../outbound-port/routine.read-by-date.outbound-port';
import {
  concurrent,
  filter,
  flat,
  flatMap,
  map,
  pipe,
  toArray,
  toAsync,
} from '@fxts/core';
import {
  ROUTINE_READ_RECORD_BY_DATE_OUTBOUND_PORT,
  RoutineReadRecordByDateOutboundPort,
} from '../outbound-port/routine.read-record-by-date.outbound-port';

export class RoutineReadByDateService implements RoutineReadByDateInboundPort {
  constructor(
    @Inject(ROUTINE_READ_BY_DATE_OUTBOUND_PORT)
    private readonly routineReadByDateOutboundPort: RoutineReadByDateOutboundPort,
    @Inject(ROUTINE_READ_RECORD_BY_DATE_OUTBOUND_PORT)
    private readonly routineReadRecordByDateOutboundPort: RoutineReadRecordByDateOutboundPort,
  ) {}
  async execute(
    params: RoutineReadByDateInboundPortInputDto,
  ): Promise<RoutineReadByDateInboundPortOutputDto> {
    //
    return await pipe(
      [params],
      toAsync,
      map((param) => {
        return this.routineReadByDateOutboundPort.readByDate(param);
      }),
      flat,
      filter((routine) => routine.is_active == true),
      map(async (userRoutine) => {
        return {
          routine: userRoutine.routine,
          name: userRoutine.name,
          startTime: userRoutine.start_time,
          endTime: userRoutine.end_time,
          description: userRoutine.description,
          done: await this.routineReadRecordByDateOutboundPort.execute({
            routineId: userRoutine.routine,
            date: params.date,
          }),
        };
      }),
      toArray,
    );
  }
}
