import { EntityManager } from '@mikro-orm/knex';
import {
  RoutineReadRecordByDateOutboundPort,
  RoutineReadRecordByDateOutboundPortInputDto,
  RoutineReadRecordByDateOutboundPortOutputDto,
} from '../outbound-port/routine.read-record-by-date.outbound-port';
import { Injectable } from '@nestjs/common';
import { RoutineRecords } from 'src/database/entities/RoutineRecords';

@Injectable()
export class RoutineReadRecordByDateRepository
  implements RoutineReadRecordByDateOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: RoutineReadRecordByDateOutboundPortInputDto,
  ): Promise<RoutineReadRecordByDateOutboundPortOutputDto> {
    const em = this.em;

    return !!(await em.findOne(RoutineRecords, {
      routine: params.routineId,
      date: params.date,
    }));
  }
}
