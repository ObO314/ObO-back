import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import { Circles } from 'src/database/entities/Circles';
import { CircleManagementUpdateOutboundPort } from '../outbound-port/circle.management.update.outbound-port';

@Injectable()
export class circleManagementUpdateRepository
  implements CircleManagementUpdateOutboundPort
{
  constructor(private readonly em: EntityManager) {}
  async execute(params: Circles): Promise<Circles> {
    const updatedCircle = await this.em.upsert(Circles, params);
    await this.em.persistAndFlush(updatedCircle);
    return updatedCircle;
  }
}
