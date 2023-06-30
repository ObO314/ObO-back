import { EntityManager } from '@mikro-orm/knex';
import {
  CircleManagementCreateOutboundPort,
  CircleManagementCreateOutboundPortInputDto,
  CircleManagementCreateOutboundPortOutputDto,
} from '../outbound-port/circle.management.create.outbound-port';
import { Circles } from 'src/database/entities/Circles';
import { Injectable } from '@nestjs/common';

@Injectable()
export class circleManagementCreateRepository
  implements CircleManagementCreateOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: CircleManagementCreateOutboundPortInputDto,
  ): Promise<CircleManagementCreateOutboundPortOutputDto> {
    const createdCircle = this.em.create(Circles, params);
    await this.em.persistAndFlush(createdCircle);
    return createdCircle;
  }
}
