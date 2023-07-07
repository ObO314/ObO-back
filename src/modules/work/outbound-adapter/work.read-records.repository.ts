import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';

import { WorkRecords } from 'src/database/entities/WorkRecords';
import {
  WorkReadRecordsOutboundPort,
  WorkReadRecordsOutboundPortInputDto,
  WorkReadRecordsOutboundPortOutputDto,
} from '../outbound-port/work.read-records.outbound-port';

@Injectable()
export class WorkReadRecordsRepository implements WorkReadRecordsOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: WorkReadRecordsOutboundPortInputDto,
  ): Promise<WorkReadRecordsOutboundPortOutputDto> {
    return await this.em.count(WorkRecords, {
      circle: params.circleId,
      work: params.workId,
    });
  }
}
