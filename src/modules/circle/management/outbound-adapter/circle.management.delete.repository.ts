import { EntityManager } from '@mikro-orm/knex';

import { Circles } from 'src/database/entities/Circles';
import {
  CircleManagementDeleteOutboundPort,
  CircleManagementDeleteOutboundPortInputDto,
  CircleManagementDeleteOutboundPortOutputDto,
} from '../outbound-port/circle.management.delete.outbound-port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CircleManagementDeleteRepository
  implements CircleManagementDeleteOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: CircleManagementDeleteOutboundPortInputDto,
  ): Promise<CircleManagementDeleteOutboundPortOutputDto> {
    const toDeleteCircle = await this.em.findOne(Circles, {
      id: params.circleId,
    });
    await this.em.removeAndFlush(toDeleteCircle);
    return toDeleteCircle;
  }
}
