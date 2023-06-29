import { EntityManager } from '@mikro-orm/knex';
import {
  RoutineDeleteRecordOutboundPort,
  RoutineDeleteRecordOutboundPortInputDto,
  RoutineDeleteRecordOutboundPortOutputDto,
} from '../outbound-port/routine.delete-record.outbound-port';
import { RoutineRecords } from 'src/database/entities/RoutineRecords';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoutineDeleteRecordRepository
  implements RoutineDeleteRecordOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: RoutineDeleteRecordOutboundPortInputDto,
  ): Promise<RoutineDeleteRecordOutboundPortOutputDto> {
    const toDeleteRecord = await this.em.findOne(RoutineRecords, {
      routine: params.routineId,
      date: params.date,
    });
    if (toDeleteRecord) {
      await this.em.removeAndFlush(toDeleteRecord);
    }
    return toDeleteRecord;
  }
}
