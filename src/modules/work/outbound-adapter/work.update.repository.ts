import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import { Works } from 'src/database/entities/Works';
import {
  WorkUpdateOutboundPort,
  WorkUpdateOutboundPortInputDto,
  WorkUpdateOutboundPortOutputDto,
} from '../outbound-port/work.update.outbound-port';

@Injectable()
export class WorkUpdateRepository implements WorkUpdateOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: WorkUpdateOutboundPortInputDto,
  ): Promise<WorkUpdateOutboundPortOutputDto> {
    const updatedWork = await this.em.upsert(Works, {
      ...params,
      id: params.workId,
    });
    await this.em.flush();
    return updatedWork;
  }
}
