import { Inject, Injectable } from '@nestjs/common';
import {
  RoutineReadByUserAndDateOutboundPort,
  RoutineReadByUserAndDateOutboundPortInputDto,
  RoutineReadByUserAndDateOutboundPortOutputDto,
} from '../outbound-port/routine.read-by-user-and-date.outbound-port';
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
import { RoutineRecords } from 'src/database/entities/RoutineRecords';
import { knex } from 'knex';

@Injectable()
export class RoutineReadByUserAndDateRepository
  implements RoutineReadByUserAndDateOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async readByDate(
    params: RoutineReadByUserAndDateOutboundPortInputDto,
  ): Promise<RoutineReadByUserAndDateOutboundPortOutputDto> {
    const em = this.em;
    const result = (await em.getConnection().execute(
      `
      SELECT *
      FROM (
        SELECT *, 
        ROW_NUMBER() OVER (PARTITION BY routine ORDER BY updated_at DESC) AS rn
        FROM routine_histories
        WHERE CAST(updated_at AS date) <= CAST(? AS date) AND "user" = ?
      ) as sr
      JOIN routines as r on r.id = sr.routine
      WHERE sr.rn = 1
  `,
      [params.date, params.userId],
    )) as RoutineReadByUserAndDateOutboundPortOutputDto;

    return result;
  }
}
