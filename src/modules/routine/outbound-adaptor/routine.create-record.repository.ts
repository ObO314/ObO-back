import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';

import { RoutineRecords } from 'src/database/entities/RoutineRecords';
import {
  RoutineCreateRecordOutboundPort,
  RoutineCreateRecordOutboundPortInputDto,
  RoutineCreateRecordOutboundPortOutputDto,
} from '../outbound-port/routine.create-record.outbound-port';

@Injectable()
export class RoutineCreateRecordRepository
  implements RoutineCreateRecordOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: RoutineCreateRecordOutboundPortInputDto,
  ): Promise<RoutineCreateRecordOutboundPortOutputDto> {
    const em = this.em;

    const doneRoutine = em.create(RoutineRecords, {
      routine: params.routineId,
      date: params.date,
    });
    await em.persistAndFlush(doneRoutine);
    return doneRoutine;
  }
}
