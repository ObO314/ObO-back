import { Inject } from '@nestjs/common';
import {
  RoutineReadByDateOutboundPort,
  RoutineReadByDateOutboundPortInputDto,
  RoutineReadByDateOutboundPortOutputDto,
} from '../outbound-port/routine.read-by-date.outbound-port';
import { EntityManager } from '@mikro-orm/knex';
import { QueryOrder } from '@mikro-orm/core';
import { filter, map, pipe, toArray, toAsync } from '@fxts/core';
import { Routines } from 'database/entities/Routines';
import { RoutineHistories } from 'database/entities/RoutineHistories';

export class RoutineReadByDateRepository
  implements RoutineReadByDateOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async readByDate(
    params: RoutineReadByDateOutboundPortInputDto,
  ): Promise<RoutineReadByDateOutboundPortOutputDto> {
    const em = this.em;
    const userRoutines = await em.find(Routines, { user: params.userId });

    pipe(
      userRoutines,
      map((userRoutine) =>
        em.find(
          RoutineHistories,
          { routine: userRoutine },
          { orderBy: { updatedTime: QueryOrder.DESC }, limit: 1 },
        ),
      ), // 유저루틴들의 최신 설정들
      toAsync,
      filter(
        (routineHistory) =>
          // @ts-ignore
          routineHistory.inactiveDate > params.date || // @ts-ignore
          routineHistory.inactiveDate == null,
      ), // 날짜기준 활성화 된 설정들
      map((filteredRoutines) => {
        em.findOne(
          Routines,
          // @ts-ignore
          { id: filteredRoutines.routine },
          { populate: ['routineRecords', 'routineHistories'] },
        );
      }),
      toArray,
    );
    // 히스토리에서 최신걸로만 다 찾아와서
    // 최신데이터의 비활성화 한 날짜가 지정한 날짜 보다 빠르면 거르고, 느리면 가져온다.
    // 비활성환 날짜가 없다면 그냥 가져온다
    // 그리고 그것의 완료여부를 데이터에 같이 담아서 반환한다.
    return;
  }
}
