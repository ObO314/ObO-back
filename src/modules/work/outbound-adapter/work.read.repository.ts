import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import { Works } from 'src/database/entities/Works';
import {
  WorkReadOutboundPort,
  WorkReadOutboundPortInputDto,
  WorkReadOutboundPortOutputDto,
} from '../outbound-port/work.read.outbound-port';

@Injectable()
export class WorkReadRepository implements WorkReadOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: WorkReadOutboundPortInputDto,
  ): Promise<WorkReadOutboundPortOutputDto> {
    return await this.em.findOne(Works, {
      id: params.workId,
    });
  }
}
