import { Inject } from '@nestjs/common';
import {
  RoutineReadByDateInboundPort,
  RoutineReadByDateInboundPortInputDto,
  RoutineReadByDateInboundPortOutputDto,
} from '../inbound-port/routine.read-by-date.inbound-port';
import {
  ROUTINE_READ_BY_USER_AND_DATE_OUTBOUND_PORT,
  RoutineReadByUserAndDateOutboundPort,
} from '../outbound-port/routine.read-by-user-and-date.outbound-port';
import {
  concurrent,
  filter,
  map,
  pipe,
  tap,
  toArray,
  toAsync,
} from '@fxts/core';
import {
  ROUTINE_READ_BY_ID_AND_DATE_OUTBOUND_PORT,
  RoutineReadByIdAndDateOutboundPort,
} from '../outbound-port/routine.read-by-id-and-date.outbound-port';
import { RoutineHistories } from 'src/database/entities/RoutineHistories';

export class RoutineReadByDateService implements RoutineReadByDateInboundPort {
  constructor(
    @Inject(ROUTINE_READ_BY_USER_AND_DATE_OUTBOUND_PORT)
    private readonly routineReadByUserAndDateOutboundPort: RoutineReadByUserAndDateOutboundPort,
    @Inject(ROUTINE_READ_BY_ID_AND_DATE_OUTBOUND_PORT)
    private readonly routineReadByIdAndDateOutboundPort: RoutineReadByIdAndDateOutboundPort,
  ) {}
  async readByDate(
    params: RoutineReadByDateInboundPortInputDto,
  ): Promise<RoutineReadByDateInboundPortOutputDto> {
    // 유저와 날짜 기준으로 추려오기
    //
    const userRoutines =
      await this.routineReadByUserAndDateOutboundPort.readByDate(params);

    return await pipe(
      userRoutines,
      toAsync,
      filter((routine) => routine.is_active == true),
      map(async (userRoutine) => {
        return {
          routine: userRoutine.routine,
          name: userRoutine.name,
          startTime: userRoutine.start_time,
          endTime: userRoutine.end_time,
          description: userRoutine.description,
          done: await this.routineReadByIdAndDateOutboundPort.execute({
            routineId: userRoutine.routine,
            date: params.date,
          }),
        };
      }),
      concurrent(10),
      toArray,
    );
  }
}
