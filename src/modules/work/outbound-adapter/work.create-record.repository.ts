import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import { Works } from 'src/database/entities/Works';
import {
  WorkCreateRecordOutboundPort,
  WorkCreateRecordOutboundPortInputDto,
  WorkCreateRecordOutboundPortOutputDto,
} from '../outbound-port/work.create-record.outbound-port';
import { WorkRecords } from 'src/database/entities/WorkRecords';

@Injectable()
export class WorkCreateRecordRepository
  implements WorkCreateRecordOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: WorkCreateRecordOutboundPortInputDto,
  ): Promise<WorkCreateRecordOutboundPortOutputDto> {
    const newWorkRecord = this.em.create(WorkRecords, params);
    await this.em.persistAndFlush(newWorkRecord);
    return newWorkRecord;
  }
}
