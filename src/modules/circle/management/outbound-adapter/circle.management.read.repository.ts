import { EntityManager } from '@mikro-orm/knex';
import { Circles } from 'src/database/entities/Circles';
import {
  CircleManagementReadOutboundPort,
  CircleManagementReadOutboundPortInputDto,
  CircleManagementReadOutboundPortOutputDto,
} from '../outbound-port/circle.management.read.outbound-port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CircleManagementReadRepository
  implements CircleManagementReadOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: CircleManagementReadOutboundPortInputDto,
  ): Promise<CircleManagementReadOutboundPortOutputDto> {
    return await this.em.findOne(Circles, { id: params.circleId });
  }
}
