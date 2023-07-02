import { EntityManager } from '@mikro-orm/knex';
import { Circles } from 'src/database/entities/Circles';
import {
  CircleManagementReadOutboundPort,
  CircleManagementReadOutboundPortInputDto,
  CircleManagementReadOutboundPortOutputDto,
} from '../outbound-port/circle.management.read.outbound-port';
import { Injectable } from '@nestjs/common';
import {
  CircleManagementReadByNameOutboundPort,
  CircleManagementReadByNameOutboundPortInputDto,
  CircleManagementReadByNameOutboundPortOutputDto,
} from '../outbound-port/circle.management.read-by-name.outbound-port';

@Injectable()
export class CircleManagementReadByNameRepository
  implements CircleManagementReadByNameOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: CircleManagementReadByNameOutboundPortInputDto,
  ): Promise<CircleManagementReadByNameOutboundPortOutputDto> {
    return await this.em.find(Circles, {
      name: { $like: `${params.name}%` },
    });
  }
}
