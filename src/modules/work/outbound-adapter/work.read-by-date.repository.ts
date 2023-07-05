import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import { Works } from 'src/database/entities/Works';

import {
  WorkReadByDateOutboundPort,
  WorkReadByDateOutboundPortInputDto,
  WorkReadByDateOutboundPortOutputDto,
} from '../outbound-port/work.read-by-date.outbound-port';

@Injectable()
export class WorkReadByDateRepository implements WorkReadByDateOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: WorkReadByDateOutboundPortInputDto,
  ): Promise<WorkReadByDateOutboundPortOutputDto> {
    return await this.em.find(Works, {
      circle: params.circleId,
      $or: [
        { startTime: { $gte: params.startTime, $lte: params.endTime } },
        { endTime: { $gte: params.startTime, $lte: params.endTime } },
      ],
    });
  }
}
