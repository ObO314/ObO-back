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
    const qb = await em
      .createQueryBuilder(RoutineHistories, 'rh')
      .select('rh.routine')
      .addSelect('MAX(rh.updated_at) as updated_at')
      .where({ user: params.userId, updatedAt: { $lte: params.date } })
      .groupBy('rh.routine')
      .execute();
    console.log(qb);
    return;
  }
}
