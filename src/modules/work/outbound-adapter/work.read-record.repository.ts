import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';

import {
  WorkReadRecordOutboundPort,
  WorkReadRecordOutboundPortInputDto,
  WorkReadRecordOutboundPortOutputDto,
} from '../outbound-port/work.read-record.outbound-port';
import { WorkRecords } from 'src/database/entities/WorkRecords';

@Injectable()
export class WorkReadRecordRepository implements WorkReadRecordOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: WorkReadRecordOutboundPortInputDto,
  ): Promise<WorkReadRecordOutboundPortOutputDto> {
    return await this.em.findOne(WorkRecords, {
      circle: params.circleId,
      work: params.workId,
      user: params.userId,
    });
  }
}
