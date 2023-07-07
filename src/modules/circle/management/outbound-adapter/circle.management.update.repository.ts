import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import { Circles } from 'src/database/entities/Circles';
import {
  CircleManagementUpdateOutboundPort,
  CircleManagementUpdateOutboundPortInputDto,
  CircleManagementUpdateOutboundPortOutputDto,
} from '../outbound-port/circle.management.update.outbound-port';

@Injectable()
export class CircleManagementUpdateRepository
  implements CircleManagementUpdateOutboundPort
{
  constructor(private readonly em: EntityManager) {}
  async execute(
    params: CircleManagementUpdateOutboundPortInputDto,
  ): Promise<CircleManagementUpdateOutboundPortOutputDto> {
    const updatedCircle = await this.em.upsert(Circles, {
      ...params,
      id: params.circleId,
    });
    await this.em.persistAndFlush(updatedCircle);
    return updatedCircle;
  }
}
