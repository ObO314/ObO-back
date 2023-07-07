import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import { WorkRecords } from 'src/database/entities/WorkRecords';
import {
  WorkDeleteOutboundPort,
  WorkDeleteOutboundPortInputDto,
  WorkDeleteOutboundPortOutputDto,
} from '../outbound-port/work.delete.outbound-port';
import {
  WorkDeleteRecordOutboundPort,
  WorkDeleteRecordOutboundPortInputDto,
  WorkDeleteRecordOutboundPortOutputDto,
} from '../outbound-port/work.delete-record.outbound-port';

@Injectable()
export class WorkDeleteRecordRepository
  implements WorkDeleteRecordOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: WorkDeleteRecordOutboundPortInputDto,
  ): Promise<WorkDeleteRecordOutboundPortOutputDto> {
    const toDeleteRecord = await this.em.findOne(WorkRecords, {
      user: params.userId,
      circle: params.circleId,
      work: params.workId,
    });
    await this.em.removeAndFlush(toDeleteRecord);
    return toDeleteRecord;
  }
}
