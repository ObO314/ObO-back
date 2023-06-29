import { Injectable } from '@nestjs/common';
import {
  RoutineReadByDateOutboundPort,
  RoutineReadByDateOutboundPortInputDto,
  RoutineReadByDateOutboundPortOutputDto,
} from '../outbound-port/routine.read-by-date.outbound-port';
import { EntityManager } from '@mikro-orm/knex';

@Injectable()
export class RoutineReadByDateRepository
  implements RoutineReadByDateOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async readByDate(
    params: RoutineReadByDateOutboundPortInputDto,
  ): Promise<RoutineReadByDateOutboundPortOutputDto> {
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
    )) as RoutineReadByDateOutboundPortOutputDto;

    return result;
  }
}
