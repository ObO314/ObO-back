import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import {
  WorkReadCircleOutboundPort,
  WorkReadCircleOutboundPortInputDto,
} from '../outbound-port/work.read-circle.outbound-port';
import { Circles } from 'src/database/entities/Circles';

@Injectable()
export class WorkReadCircleRepository implements WorkReadCircleOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(params: WorkReadCircleOutboundPortInputDto): Promise<Circles> {
    return await this.em.findOne(Circles, { id: params.circleId });
  }
}
