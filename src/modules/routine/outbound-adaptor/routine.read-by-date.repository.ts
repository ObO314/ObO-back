import { Inject, Injectable } from '@nestjs/common';
import {
  RoutineReadByDateOutboundPort,
  RoutineReadByDateOutboundPortInputDto,
  RoutineReadByDateOutboundPortOutputDto,
} from '../outbound-port/routine.read-by-date.outbound-port';
import { EntityManager } from '@mikro-orm/knex';
import { QueryOrder } from '@mikro-orm/core';
import {
  concurrent,
  filter,
  map,
  pipe,
  take,
  toArray,
  toAsync,
} from '@fxts/core';
import { Routines } from 'src/database/entities/Routines';
import { RoutineHistories } from 'src/database/entities/RoutineHistories';

@Injectable()
export class RoutineReadByDateRepository
  implements RoutineReadByDateOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async readByDate(
    params: RoutineReadByDateOutboundPortInputDto,
  ): Promise<RoutineReadByDateOutboundPortOutputDto> {
    const em = this.em;
    const userRoutines = await em.find(Routines, { user: params.userId });

    const qb = await em
      .createQueryBuilder(RoutineHistories, 'rh')
      .select('*')
      .where({ user: params.userId })
      .andWhere({ updatedTime: { $lte: params.date } })
      .andWhere({
        $or: [{ inactiveDate: null }, { inactiveDate: { $lte: params.date } }],
      })
      // .groupBy('rh.routine')
      .orderBy({ updatedTime: 'DESC' });
    // .limit(1);
    // .execute();

    // `
    //   SELECT *
    //   FROM routineHistories
    //   WHERE user = ${params.userId}
    //     AND ( updatedTime < ${params.date} )
    //     AND ( updatedTime IS NULL OR ${params.date} < inactiveDate )
    //   GROUP BY routine
    //   ORDER BY updatedTime
    //   LIMIT 1
    //   `;

    console.log(qb);

    // return await pipe(
    //   userRoutines,
    //   toAsync,
    //   map((userRoutine) =>
    //     em.find(
    //       RoutineHistories,
    //       { routine: userRoutine },
    //       { orderBy: { updatedTime: QueryOrder.DESC }, limit: 1 },
    //     ),
    //   ),
    //   filter(
    //     (routineHistory) =>
    //       routineHistory[0].inactiveDate > params.date ||
    //       routineHistory[0].inactiveDate == null,
    //   ),
    //   map((filteredRoutines) =>
    //     em.findOne(
    //       Routines,
    //       { id: filteredRoutines[0].routine.id },
    //       { populate: ['routineRecords', 'routineHistories'] },
    //     ),
    //   ),
    //   concurrent(10),
    //   toArray,
    // );
    return;
  }
}
