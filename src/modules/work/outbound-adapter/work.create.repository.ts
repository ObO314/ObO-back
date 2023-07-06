import { EntityManager } from '@mikro-orm/knex';
import {
  WorkCreateOutboundPort,
  WorkCreateOutboundPortInputDto,
  WorkCreateOutboundPortOutputDto,
} from '../outbound-port/work.create.outbound-port';
import { Injectable } from '@nestjs/common';
import { Works } from 'src/database/entities/Works';

@Injectable()
export class WorkCreateRepository implements WorkCreateOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: WorkCreateOutboundPortInputDto,
  ): Promise<WorkCreateOutboundPortOutputDto> {
    console.log('create');

    const newWork = this.em.create(Works, {
      ...params,
      circle: params.circleId,
      creator: params.userId,
    });
    await this.em.persistAndFlush(newWork);
    return newWork;
  }
}
