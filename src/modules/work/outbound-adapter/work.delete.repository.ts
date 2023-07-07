import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import { Works } from 'src/database/entities/Works';
import {
  WorkDeleteOutboundPort,
  WorkDeleteOutboundPortInputDto,
  WorkDeleteOutboundPortOutputDto,
} from '../outbound-port/work.delete.outbound-port';

@Injectable()
export class WorkDeleteRepository implements WorkDeleteOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: WorkDeleteOutboundPortInputDto,
  ): Promise<WorkDeleteOutboundPortOutputDto> {
    const toDeleteWork = await this.em.findOne(Works, {
      id: params.workId,
      circle: params.circleId,
    });
    await this.em.removeAndFlush(toDeleteWork);
    return toDeleteWork;
  }
}
