import { Inject } from '@nestjs/common';
import {
  RoutineReadByUserOutboundPort,
  RoutineReadByUserOutboundPortInputDto,
  RoutineReadByUserOutboundPortOutputDto,
} from '../outbound-port/routine.read-by-user.outbound-port';
import { EntityManager } from '@mikro-orm/knex';
import { QueryOrder } from '@mikro-orm/core';
import { filter, map, pipe } from '@fxts/core';
import { Routines } from 'src/database/entities/Routines';
import { RoutineHistories } from 'src/database/entities/RoutineHistories';

export class RoutineReadByUserRepository
  implements RoutineReadByUserOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async readByUser(
    params: RoutineReadByUserOutboundPortInputDto,
  ): Promise<RoutineReadByUserOutboundPortOutputDto> {
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
      // filter(
      //   (routineHistory) =>
      //     routineHistory.inactiveDate > params.date ||
      //     routineHistory.inactiveDate == null,
      // ), // 날짜기준 활성화 된 설정들
      map((filteredRoutines) => {}),
    );
    // 히스토리에서 최신걸로만 다 찾아와서
    // 최신데이터의 비활성화 한 날짜가 지정한 날짜 보다 빠르면 거르고, 느리면 가져온다.
    // 비활성환 날짜가 없다면 그냥 가져온다
    // 그리고 그것의 완료여부를 데이터에 같이 담아서 반환한다.
    return;
  }
}
